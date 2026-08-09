import { pick, accessRows, faqs } from '../content'
import type { Lang } from '../content'
import { SectionHead } from './Tracks'

const ACC = '#5d5294'
const MONO = { fontFamily: "'JetBrains Mono', monospace" }

export function Access({ lang }: { lang: Lang }) {
  return (
    <section id="access" className="mt-14 border-t border-[#16161a]/10 pt-12">
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div>
          <div className="mb-3 text-[10.5px] font-medium tracking-[0.11em]" style={{ color: ACC, ...MONO }}>
            05 / {pick(lang, '权限', 'ACCESS')}
          </div>
          <h2 className="m-0 mb-3 text-[26px] sm:text-[34px] font-light leading-[1.12] tracking-[-0.025em] text-[#16161a]">
            {pick(lang, '装之前，先知道它能干什么。', 'Know what a skill can do before you install it.')}
          </h2>
          <p className="m-0 mb-5 text-[14px] leading-[1.65] text-[#16161a]/60">
            {pick(
              lang,
              '每个 Skill 的文件读取、网络访问、命令执行等权限，都在 SECURITY.md 中有详细说明。我们强烈建议你在安装前阅读。',
              'Skills read files and run scripts. The security guide separates bundled script behavior from permissions the host agent may request, with a capability matrix for every curated skill.'
            )}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a href="https://github.com/staruhub/ClaudeSkills/blob/main/SECURITY.md" className="rounded-full px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-white transition-transform hover:scale-[1.04]" style={{ background: ACC }}>
              {pick(lang, '看安全指南', 'SECURITY GUIDE')}
            </a>
            <a href="https://github.com/staruhub/ClaudeSkills/blob/main/CONTRIBUTING.md" className="rounded-full border border-[#16161a]/25 px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-[#16161a] transition-colors hover:border-[#16161a]">
              {pick(lang, '贡献规则 ↗', 'CONTRIBUTE ↗')}
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#16161a]/10">
          {accessRows.map((r) => (
            <div key={r.id} className="flex justify-between border-b border-[#16161a]/10 px-4 py-3.5 text-[12px]" style={MONO}>
              <span className="text-[#16161a]">{r.id}</span>
              <span className="text-[#16161a]/40">{r.caps}</span>
            </div>
          ))}
          <div className="px-4 py-3 text-[11px] leading-[1.5] text-[#16161a]/40">
            {pick(lang, '* 删除受守卫：每个破坏性动作都需要显式确认。', '* Deletion is guarded — every destructive action requires explicit confirmation.')}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Faq({ lang }: { lang: Lang }) {
  return (
    <section id="faq" className="mt-14 border-t border-[#16161a]/10 pt-12">
      <SectionHead no="06" zh="常见问题" en="FAQ" lang={lang} title="FAQ" />
      <div className="grid gap-x-10 md:grid-cols-2">
        {faqs(lang).map((f) => (
          <div key={f.q} className="border-t border-[#16161a]/10 py-4">
            <div className="mb-2 text-[14px] font-medium leading-[1.4] text-[#16161a]">{f.q}</div>
            <p className="m-0 text-[12.8px] leading-[1.65] text-[#16161a]/60">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Footer({ lang }: { lang: Lang }) {
  const links = [
    ['GitHub', 'https://github.com/staruhub/ClaudeSkills'],
    ['Contribute', 'https://github.com/staruhub/ClaudeSkills/blob/main/CONTRIBUTING.md'],
    ['Security', 'https://github.com/staruhub/ClaudeSkills/blob/main/SECURITY.md'],
    ['MIT License', 'https://github.com/staruhub/ClaudeSkills/blob/main/LICENSE'],
    ['Issues', 'https://github.com/staruhub/ClaudeSkills/issues'],
  ]

  return (
    <footer className="mt-14 flex flex-wrap items-start justify-between gap-10 rounded-2xl bg-[#f4f5f9] p-8">
      <div>
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="grid h-[20px] w-[20px] place-items-center rounded-[5px] border text-[8px] font-bold" style={{ borderColor: ACC, color: ACC, ...MONO }}>CS</span>
          <span className="text-[16px] font-semibold text-[#16161a]">ClaudeSkills</span>
        </div>
        <p className="m-0 mb-3 max-w-[440px] text-[12.5px] leading-[1.6] text-[#16161a]/60">
          {pick(
            lang,
            '开放、可移植、可审查的 Agent Skills，面向兼容 skills 的 agent。staruhub 的 ChaoGeek 项目，与 Anthropic 无关联、未获其背书。',
            'Open, portable, inspectable Agent Skills — built for skills-compatible agents. A ChaoGeek project by staruhub. Not affiliated with or endorsed by Anthropic.'
          )}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#16161a]/40">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition-colors hover:text-[#16161a]">{label}</a>
          ))}
        </div>
      </div>
      <div className="sm:text-right">
        <div className="mb-1.5 text-[12.5px] text-[#16161a]/60">
          {pick(lang, '发现 Bug、分享成果，或提出改进建议？', 'Found a bug — or built something useful?')}
        </div>
        <div className="mb-3 text-[12px] text-[#16161a]/40">
          {pick(lang, '觉得有帮助，也请点亮一个 Star。', 'A star is always appreciated.')}
        </div>
        <a href="https://github.com/staruhub/ClaudeSkills/issues/new" className="inline-flex items-center gap-1.5 rounded-full bg-[#16161a] px-5 py-3 text-[11px] font-semibold tracking-[0.1em] text-white transition-transform hover:scale-[1.04]">
          {pick(lang, '提一个 issue', 'OPEN AN ISSUE')}
          <svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}
