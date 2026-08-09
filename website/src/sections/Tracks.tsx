import { pick, tracks } from '../content'
import type { Lang } from '../content'

const ACC = '#5d5294'
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`

const TRACK_IMG: Record<string, string> = {
  '01': asset('track-violet.jpg'),
  '02': asset('track-blue.jpg'),
  '03': asset('track-pink.jpg'),
  '04': asset('panel-purple.jpg'),
}

function SectionHead({ no, zh, en, title, aside, lang }: {
  no: string; zh: string; en: string; title: React.ReactNode; aside?: string; lang: Lang
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-3 text-[10.5px] font-medium tracking-[0.11em]" style={{ color: ACC, fontFamily: "'JetBrains Mono', monospace" }}>
          {no} / {pick(lang, zh, en)}
        </div>
        <h2 className="m-0 text-[26px] sm:text-[34px] font-light leading-[1.12] tracking-[-0.025em] text-[#16161a]">
          {title}
        </h2>
      </div>
      {aside && (
        <span className="max-w-[280px] text-[12px] leading-[1.6] text-[#16161a]/40 sm:text-right">{aside}</span>
      )}
    </div>
  )
}

export { SectionHead }

export default function Tracks({ lang }: { lang: Lang }) {
  return (
    <section id="tracks" className="mt-14 border-t border-[#16161a]/10 pt-12">
      <SectionHead
        no="01" zh="核心技能" en="MAIN FEATURES" lang={lang}
        title={pick(lang, '四大旗舰技能，专为复杂任务而生。', 'Bring a real task. Get a reviewable artifact.')}
        aside={pick(lang, '我们精心打磨了四个高品质技能，它们是这套方法论的核心体现。', 'Each track states what it reads, when it asks you, and where it stops.')}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {tracks(lang).map((tk) => (
          <div
            key={tk.name}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#16161a]/10 bg-[#f4f5f9] transition-shadow hover:shadow-[0_18px_44px_rgba(34,36,44,.12)]"
          >
            {/* fluted glass header */}
            <div className="relative flex h-[170px] flex-col justify-between overflow-hidden p-4" style={{ background: tk.bg }}>
              <img
                src={TRACK_IMG[tk.n]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              {/* flowing light on hover */}
              <div className="glass-sheen" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10" />
              <div className="relative z-[3] flex items-center gap-2.5">
                <span className="rounded-full border border-white/60 px-2.5 py-1.5 text-[10.5px] font-medium text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {tk.n}
                </span>
                <span className="text-[11.5px] text-white/90">{tk.kind}</span>
                <span className="ml-auto rounded-full bg-white/20 px-2 py-1.5 text-[9.5px] font-medium tracking-[0.08em] text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  FLAGSHIP
                </span>
              </div>
              <h3 className="relative z-[3] m-0 text-[26px] font-medium leading-[1.1] tracking-[-0.02em] text-white" style={{ textShadow: '0 1px 12px rgba(60,40,90,.28)' }}>
                {tk.name}
              </h3>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-[18px]">
              <p className="m-0 flex-1 text-[13.5px] leading-[1.65] text-[#16161a]/60">{tk.desc}</p>
              <div className="rounded-lg border border-[#16161a]/10 bg-[#eceef5] px-3 py-2.5 text-[11.5px] leading-[1.7] text-[#423a6a]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {tk.cmd}
              </div>
              <div className="flex items-center gap-2.5 border-t border-[#16161a]/10 pt-3 text-[11.5px] text-[#16161a]/40">
                <span>{tk.inp}</span>
                <span style={{ color: ACC }}>→</span>
                <span className="text-[#16161a]">{tk.out}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
