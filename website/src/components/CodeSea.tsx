import { useEffect, useRef } from 'react'

// garbled glyphs are drawn only from CHAOGEEK letters
const GLYPHS = 'CHAOGEEK'.split('')
const ACC = '93,82,148'

interface Cell {
  x: number; y: number
  ch: string
  seed: number
  tw: number
  e: number // liquid energy: bumped by passing ripples, settles back
  m: number // pool membership: 1 deep inside the glyph pool, 0 outside (blank)
}

interface Ripple {
  cx: number; cy: number
  t0: number
  speed: number
  maxR: number
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

export default function CodeSea({ fs = 11, gap = 26, className = '' }: {
  fs?: number; gap?: number; className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0, cells: Cell[] = [], raf = 0
    let ripples: Ripple[] = []
    let nextEmit = 0.8
    let emitIdx = 0

    function build() {
      cells = []
      const cols = Math.max(8, Math.round(W / gap))
      const rows = Math.max(6, Math.round(H / gap))
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * (W / cols)
          const y = (r + 0.5) * (H / rows)
          const seed = Math.random()
          cells.push({
            x, y,
            ch: GLYPHS[(Math.random() * GLYPHS.length) | 0],
            seed,
            tw: Math.random() * 6.28,
            e: 0,
            m: pool(x, y) + (seed - 0.5) * 0.22, // organic ragged edge
          })
        }
    }

    // the glyph pool: a big soft blob left-of-center — everything else stays blank
    function pool(x: number, y: number) {
      const g = (cx: number, cy: number, rx: number, ry: number) =>
        Math.exp(-(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2))
      return (
        g(W * 0.36, H * 0.44, W * 0.33, H * 0.46) +
        0.7 * g(W * 0.58, H * 0.3, W * 0.2, H * 0.26) +
        0.55 * g(W * 0.28, H * 0.72, W * 0.22, H * 0.26)
      )
    }

    function resize() {
      const r = canvas!.getBoundingClientRect()
      if (!r.width || !r.height) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = r.width
      H = r.height
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    // ripples only ever start from the top edge and travel downward/outward
    function emit(T: number) {
      ripples.push({
        cx: W * (0.15 + Math.random() * 0.7),
        cy: H * (-0.06 + Math.random() * 0.1),
        t0: T,
        speed: 560 + Math.random() * 160,
        maxR: Math.hypot(W, H) * 0.9,
      })
      emitIdx++
      nextEmit = T + 3.4 + Math.random() * 1.8 // calm gaps between waves
    }

    function tri(s: number) {
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.lineTo(s * 0.9, s * 0.72)
      ctx.lineTo(-s * 0.9, s * 0.72)
      ctx.closePath()
      ctx.fill()
    }

    function step(now: number) {
      raf = requestAnimationFrame(step)
      if (!W) { resize(); return }
      const T = now / 1000
      ctx.clearRect(0, 0, W, H)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = `${fs}px "JetBrains Mono", ui-monospace, monospace`

      if (T > nextEmit) emit(T)
      ripples = ripples.filter((r) => (T - r.t0) * r.speed < r.maxR + 240)

      // waves pass over the headline more gently, so text stays dominant
      const kx = W * 0.32, ky = H * 0.3

      for (const c of cells) {
        // liquid settle — the field is blank until a wave arrives,
        // and the fast decay keeps activity a thin moving band behind the front
        c.e *= 0.84

        for (const r of ripples) {
          const ring = (T - r.t0) * r.speed
          const d = Math.hypot(c.x - r.cx, c.y - r.cy)
          const band = (d - ring) / 40 // narrow wavefront
          if (band > -3 && band < 3) {
            const fade =
              Math.min(1, (T - r.t0) * 3.5) * Math.max(0, 1 - ring / r.maxR)
            const crest = Math.exp(-band * band) * fade
            if (crest > 0.03) {
              const cd = ((c.x - W * 0.5) / kx) ** 2 + ((c.y - H * 0.4) / ky) ** 2
              const soften = 1 - 0.35 * Math.exp(-cd)
              c.e = Math.min(1, c.e + crest * 0.6 * soften)
            }
          }
        }

        const p = smoothstep(0.06, 0.8, c.e)
        if (p < 0.04) continue // calm: nothing drawn

        if (p < 0.4) {
          // — the wave reaches here: a garbled glyph surfaces —
          if (Math.random() < 0.02 + p * 0.05) c.ch = GLYPHS[(Math.random() * GLYPHS.length) | 0]
          const a = 0.12 + p * 1.3
          const t2 = smoothstep(0.05, 0.4, p)
          const rr = Math.round(34 + (93 - 34) * t2)
          const gg = Math.round(36 + (82 - 36) * t2)
          const bb = Math.round(44 + (148 - 44) * t2)
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${Math.min(0.9, a).toFixed(3)})`
          ctx.fillText(c.ch, c.x, c.y)
          continue
        }

        // — crest: glyph → triangle → solid dot, only while the ripple passes —
        const grow = smoothstep(0.4, 1, p)
        const size = 0.7 + grow * (gap * 0.07)
        const alpha = 0.5 + grow * 0.5
        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.fillStyle = `rgba(${ACC},${alpha.toFixed(3)})`
        const isDot = grow > 0.55 && c.seed > 0.12
        if (isDot) {
          ctx.beginPath()
          ctx.arc(0, 0, size, 0, 6.2832)
          ctx.fill()
        } else {
          tri(size * 1.15)
        }
        ctx.restore()
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [fs, gap])

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        maskImage: 'radial-gradient(118% 100% at 50% 46%, #000 30%, rgba(0,0,0,.6) 62%, transparent 88%)',
        WebkitMaskImage: 'radial-gradient(118% 100% at 50% 46%, #000 30%, rgba(0,0,0,.6) 62%, transparent 88%)',
      }}
    />
  )
}
