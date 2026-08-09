import { pick, gates } from '../content'
import type { Lang } from '../content'
import { SectionHead } from './Tracks'

const OK = '#0f8f5b'
const MONO = { fontFamily: "'JetBrains Mono', monospace" }

export default function Evidence({ lang }: { lang: Lang }) {
  return (
    <section id="evidence" className="mt-14 border-t border-[#16161a]/10 pt-12">
      <SectionHead no="03" zh="验证与证据" en="EVIDENCE" lang={lang}
        title={pick(lang, '我们不仅展示验过什么，更要亮出没验什么。', "What is checked — and what isn't.")}
        aside={pick(lang, '一个对局限性遮遮掩掩的技能不值得安装。所有检查项都已脚本化，你可以随时运行以自我验证。', 'A research skill that hid its limits would not be worth installing. So the limits ship on the page.')}
      />
      <div className="overflow-hidden rounded-xl border border-[#16161a]/10">
        <div className="evidence-grid evidence-head grid grid-cols-[1fr_1.15fr_1.15fr] gap-4 border-b border-[#16161a]/10 px-[18px] py-2.5 text-[10px] font-medium tracking-[0.1em] text-[#16161a]/40" style={MONO}>
          <span>{pick(lang, '关卡', 'GATE')}</span>
          <span style={{ color: OK }}>{pick(lang, '已验', 'CHECKED')}</span>
          <span>{pick(lang, '未验', 'NOT CHECKED')}</span>
        </div>
        {gates(lang).map((g) => (
          <div
            key={g.gate}
            className="evidence-grid evidence-row grid grid-cols-[1fr_1.15fr_1.15fr] gap-4 border-b border-[#16161a]/10 px-[18px] py-4 text-[12.5px] leading-[1.55] text-[#16161a]/60 transition-colors last:border-b-0 hover:bg-[#f4f5f9]"
          >
            <span className="text-[12px] text-[#16161a]" style={MONO}>{g.gate}</span>
            <span>{g.ok}</span>
            <span className="text-[#16161a]/40">{g.no}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
