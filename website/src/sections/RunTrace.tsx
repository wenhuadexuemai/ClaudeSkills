import { useEffect, useState } from 'react'
import { pick, steps } from '../content'
import type { Lang } from '../content'

const ACC = '#5d5294'
const OK = '#0f8f5b'
const MONO = { fontFamily: "'JetBrains Mono', monospace" }

// tick timeline: 0..5 步骤逐个点亮 → 6 产物行生成 → 7 引用芯片 → 8 核查勾 → 9 停留 → 回到 0
const TICK_DELAY = [900, 950, 950, 950, 950, 950, 750, 650, 650, 2400]

export default function RunTrace({ lang }: { lang: Lang }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setTick((v) => (v + 1) % 10), TICK_DELAY[tick])
    return () => clearTimeout(t)
  }, [tick])

  const stepList = steps(lang)
  const progress = Math.min(tick, 6) / 6

  return (
    <div
      className="relative mx-auto mt-12 w-full max-w-[960px] overflow-hidden rounded-2xl border border-white/70 bg-white/60 text-left shadow-[0_24px_60px_rgba(34,36,44,.14),inset_0_1px_0_rgba(255,255,255,.5)] backdrop-blur-xl animate-[fade-up_0.7s_ease_both]"
      style={{ animationDelay: '0.45s' }}
    >
      {/* title bar */}
      <div className="flex items-center gap-2.5 border-b border-[#16161a]/10 px-4 py-3">
        <span className="relative flex h-[7px] w-[7px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: OK }} />
          <span className="relative inline-flex h-[7px] w-[7px] rounded-full" style={{ background: OK }} />
        </span>
        <span className="text-[11px] font-medium text-[#16161a]/70" style={MONO}>
          run · deep-research
        </span>
        <span className="hidden sm:block text-[11px] text-[#16161a]/40" style={MONO}>
          — 3 sources · 11 citations · 0 unverified
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-[#16161a]/40" style={MONO}>
          {pick(lang, '实时轨迹', 'live trace')}
          <span className="trace-dots inline-flex gap-[3px]">
            <i /><i /><i />
          </span>
        </span>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr]">
        {/* steps */}
        <div className="relative border-b md:border-b-0 md:border-r border-[#16161a]/10 px-6 py-5">
          {/* growing progress line */}
          <div className="absolute bottom-7 left-[34px] top-8 w-px bg-[#16161a]/15">
            <div
              className="absolute left-0 top-0 w-px transition-[height] duration-700 ease-out"
              style={{ height: `${progress * 100}%`, background: ACC }}
            />
            <span
              className="absolute -left-[3px] h-[7px] w-[7px] rounded-full transition-[top] duration-700 ease-out"
              style={{
                top: `calc(${progress * 100}% - 3px)`,
                background: ACC,
                boxShadow: `0 0 0 4px rgba(93,82,148,.18)`,
                opacity: tick < 6 ? 1 : 0,
              }}
            />
          </div>
          {stepList.map((st, i) => {
            const done = tick > i
            const active = tick === i
            return (
              <div key={st.label} className="grid grid-cols-[18px_1fr_auto] items-baseline gap-3.5 py-[7px]">
                <span className="relative grid h-[9px] w-[9px] place-items-center justify-self-center">
                  {active && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: ACC, opacity: 0.5 }} />
                  )}
                  <span
                    className="relative h-[9px] w-[9px] rounded-full transition-all duration-500"
                    style={{
                      border: `1.5px solid ${done ? OK : active ? ACC : 'rgba(22,22,26,.24)'}`,
                      background: done ? OK : active ? ACC : 'transparent',
                    }}
                  />
                </span>
                <span
                  className="text-[12.5px] leading-normal transition-colors duration-500"
                  style={{ ...MONO, color: done || active ? '#16161a' : 'rgba(22,22,26,.42)' }}
                >
                  {st.label}
                </span>
                <span className="text-[11px] text-[#16161a]/40" style={MONO}>
                  {done ? st.t : active ? '···' : '—'}
                </span>
              </div>
            )
          })}
        </div>

        {/* artifact preview — builds up as the run completes */}
        <div className="bg-[#eceef5]/70 p-5">
          <div className="mb-3.5 flex items-center justify-between text-[10px] font-medium tracking-[0.1em] text-[#16161a]/40" style={MONO}>
            {pick(lang, '产物预览', 'ARTIFACT PREVIEW')}
            <span
              className="rounded px-1.5 py-[3px] transition-all duration-500"
              style={{
                background: tick >= 8 ? 'rgba(15,143,91,.12)' : 'rgba(22,22,26,.06)',
                color: tick >= 8 ? OK : 'rgba(22,22,26,.4)',
              }}
            >
              {tick >= 8 ? pick(lang, '✓ 已生成', '✓ done') : pick(lang, '生成中', 'writing')}
            </span>
          </div>
          <div className="rounded-lg border border-[#16161a]/10 bg-white p-4">
            <div className="mb-2.5 text-[14px] font-medium leading-snug text-[#16161a]">
              {pick(lang, 'RAG 架构 —— 决策备忘', 'RAG architecture — decision brief')}
            </div>
            <div className="mb-2.5 h-px bg-[#16161a]/10" />
            <div className="flex flex-col gap-[7px]">
              {['100%', '88%', '94%'].map((w, i) => (
                <div key={w} className="h-[6px] w-full overflow-hidden rounded-[3px] bg-[#16161a]/[.06]">
                  <div
                    className="h-full rounded-[3px] bg-[#16161a]/[.14] transition-all duration-700 ease-out"
                    style={{
                      width: tick >= 6 ? w : '0%',
                      transitionDelay: `${i * 180}ms`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {['[1] arxiv', '[2] vendor-docs', '[3] bench'].map((c, i) => (
                <span
                  key={c}
                  className="rounded px-1.5 py-1 text-[10px] transition-all duration-500"
                  style={{
                    background: '#efedfa',
                    color: '#4c4381',
                    ...MONO,
                    opacity: tick >= 7 ? 1 : 0,
                    transform: tick >= 7 ? 'translateY(0)' : 'translateY(6px)',
                    transitionDelay: `${i * 160}ms`,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div
              className="mt-3.5 border-t border-[#16161a]/10 pt-2.5 text-[11px] leading-relaxed text-[#16161a]/60 transition-opacity duration-500"
              style={{ ...MONO, opacity: tick >= 8 ? 1 : 0 }}
            >
              <span style={{ color: OK }}>✓</span> {pick(lang, '已写明取舍', 'trade-offs stated')}
              <br />
              <span style={{ color: OK }}>✓</span> {pick(lang, '已写明局限', 'limitations stated')}
            </div>
          </div>
        </div>
      </div>

      {/* flagship tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#16161a]/10">
        {['deep-research', 'product-manager', 'deck-studio', 'wechat-article-writer'].map((s, i) => (
          <div
            key={s}
            className="px-3.5 py-2.5 text-[11px] truncate"
            style={{
              ...MONO,
              color: i === 0 ? ACC : 'rgba(22,22,26,.42)',
              fontWeight: i === 0 ? 500 : 400,
              boxShadow: i === 0 ? `inset 0 -2px 0 ${ACC}` : 'none',
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}
