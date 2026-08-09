import { useState } from 'react'
import type { Lang, SkillCat } from '../content'
import { pick, skills } from '../content'
import { SectionHead } from './Tracks'

const ACC = '#5d5294'
const MONO = { fontFamily: "'JetBrains Mono', monospace" }

const filters: { key: SkillCat | 'all'; zh: string; en: string }[] = [
  { key: 'all', zh: '全部 13', en: 'All 13' },
  { key: 'flagship', zh: '旗舰', en: 'Flagship' },
  { key: 'engineering', zh: '工程', en: 'Engineering' },
  { key: 'product', zh: '产品', en: 'Product' },
  { key: 'ops', zh: '运维', en: 'Ops' },
]

export default function AllSkills({ lang }: { lang: Lang }) {
  const [f, setF] = useState<SkillCat | 'all'>('all')
  const list = skills(lang).filter((s) => f === 'all' || s.cat === f)

  return (
    <section id="skills" className="mt-14 border-t border-[#16161a]/10 pt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <SectionHead no="04" zh="全部 skill" en="ALL SKILLS" lang={lang}
          title={pick(lang, '四大旗舰之外，还有九个专业技能。', 'Thirteen skills. Pick what earns a slot.')}
          aside={pick(lang, '覆盖工程、产品、运营等领域，收纳于此，供你探索。', 'Covering engineering, product and ops — collected here for you to explore.')}
        />
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((fl) => (
          <button
            key={fl.key}
            type="button"
            onClick={() => setF(fl.key)}
            aria-pressed={f === fl.key}
            className="rounded-md border px-3 py-1.5 text-[11px] transition-all"
            style={{
              ...MONO,
              fontWeight: f === fl.key ? 500 : 400,
              borderColor: f === fl.key ? ACC : 'rgba(22,22,26,.24)',
              color: f === fl.key ? ACC : 'rgba(22,22,26,.42)',
              background: f === fl.key ? '#efedfa' : 'transparent',
            }}
          >
            {pick(lang, fl.zh, fl.en)}
          </button>
        ))}
      </div>

      <div className="border-t border-[#16161a]/10">
        {list.map((s) => (
          <div
            key={s.id}
            className="group grid grid-cols-[34px_1fr_auto] md:grid-cols-[34px_210px_1fr_200px_76px] items-center gap-3.5 border-b border-[#16161a]/10 px-1 py-3 transition-colors hover:bg-[#f4f5f9]"
          >
            <span className="text-[11px] text-[#16161a]/40" style={MONO}>{s.n}</span>
            <a
              href={`https://github.com/staruhub/ClaudeSkills/blob/main/skills/Geek-skills-${s.id}/SKILL.md`}
              className="text-[13.5px] font-medium text-[#16161a] transition-colors group-hover:text-[#5d5294]"
              style={MONO}
            >
              {s.id}
            </a>
            <span className="hidden md:block text-[12.8px] text-[#16161a]/60">{s.desc}</span>
            <span className="hidden md:block text-[10.5px] tracking-[0.04em] text-[#16161a]/40" style={MONO}>{s.caps}</span>
            <span className="text-right text-[10px] font-medium" style={{ ...MONO, color: s.cat === 'flagship' ? ACC : 'transparent' }}>
              FLAGSHIP
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
