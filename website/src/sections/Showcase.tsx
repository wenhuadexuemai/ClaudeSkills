import { pick, heroStats } from '../content'
import type { Lang } from '../content'

function Badge({ n }: { n: string }) {
  return (
    <span className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/50 text-[10px] font-medium text-white/90 backdrop-blur-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {n}
    </span>
  )
}

function ArrowNE({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 10 10" fill="none" className={className}>
      <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const flagships = ['deep-research', 'product-manager', 'deck-studio', 'wechat-article-writer']
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`

export default function Showcase({ lang }: { lang: Lang }) {
  return (
    <section className="grid grid-cols-1 gap-2.5 md:grid-cols-[1.15fr_0.95fr_2.1fr] md:h-[330px]">
      {/* 01 — stats */}
      <div className="group relative h-[280px] overflow-hidden rounded-2xl md:h-full animate-[fade-up_0.7s_ease_both]" style={{ animationDelay: '0.5s' }}>
        <img
          src={asset('panel-gray.jpg')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <Badge n="01" />
        <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-x-4 gap-y-3">
          {heroStats(lang).map((s) => (
            <div key={s.l}>
              <div className="text-[26px] font-light leading-none text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {s.v}
              </div>
              <div className="mt-1.5 text-[11px] text-white/75">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 02 — flagship list */}
      <div className="group relative h-[280px] overflow-hidden rounded-2xl md:h-full animate-[fade-up_0.7s_ease_both]" style={{ animationDelay: '0.6s' }}>
        <img
          src={asset('panel-red.jpg')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <Badge n="02" />
        <ul className="absolute bottom-4 left-4 right-4">
          {flagships.map((f) => (
            <li key={f}>
              <a
                href="#skills"
                className="group/item flex items-center justify-between border-t border-white/30 py-[9px] text-[12px] font-medium text-white transition-all first:border-t-0 hover:bg-white/10 hover:px-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {f}
                <ArrowNE className="opacity-70 transition-transform duration-300 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 group-hover/item:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 03 — routing cases stat */}
      <div className="group relative h-[280px] overflow-hidden rounded-2xl md:h-full animate-[fade-up_0.7s_ease_both]" style={{ animationDelay: '0.7s' }}>
        <img
          src={asset('panel-purple.jpg')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <Badge n="03" />
        <div className="absolute bottom-5 left-6 right-5 flex items-end justify-between gap-4">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="text-[44px] sm:text-[52px] font-light leading-none tracking-[-0.03em] text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              91
            </span>
            <p className="max-w-[240px] pb-1 text-[12.5px] leading-snug text-white/90">
              {pick(lang, '条 schema 与冲突用例全部通过：10 个 skill，0 路由冲突。', 'schema & conflict cases passed — 10 skills, 0 routing conflicts.')}
            </p>
          </div>
          <a href="#evidence" className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#16161a]">
            <ArrowNE />
          </a>
        </div>
      </div>
    </section>
  )
}
