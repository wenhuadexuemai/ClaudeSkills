import { pick } from '../content'
import type { Lang } from '../content'

const ACC = '#5d5294'

export default function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const navA = [
    { href: '#tracks', zh: '核心技能', en: 'Four tracks' },
    { href: '#install', zh: '快速上手', en: 'Install' },
    { href: '#evidence', zh: '验证证据', en: 'Evidence' },
  ]
  const navB = [
    { href: '#skills', zh: '全部 skill', en: 'All skills' },
    { href: '#access', zh: '权限', en: 'Access' },
    { href: '#faq', zh: 'FAQ', en: 'FAQ' },
  ]
  return (
    <header className="flex items-start justify-between gap-2 sm:gap-8 animate-[fade-up_0.7s_ease_both]">
      <div className="flex items-center gap-2.5 pt-0.5">
        <a href="https://github.com/staruhub/ClaudeSkills" className="flex items-center gap-2.5" aria-label="ClaudeSkills on GitHub">
          <span
            className="grid h-[22px] w-[22px] place-items-center rounded-[6px] border text-[9px] font-bold"
            style={{ borderColor: ACC, color: ACC, fontFamily: "'JetBrains Mono', monospace" }}
          >
            CS
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#16161a]">ClaudeSkills</span>
        </a>
        <a
          href="https://github.com/staruhub/ClaudeSkills/releases/tag/1.0.0"
          aria-label="ClaudeSkills 1.0.0 release"
          className="rounded px-1.5 py-1 text-[10px] font-medium"
          style={{ background: '#efedfa', color: '#4c4381', fontFamily: "'JetBrains Mono', monospace" }}
        >
          v1.0.0
        </a>
      </div>

      <nav aria-label={pick(lang, '主要导航', 'Primary navigation')} className="hidden lg:flex items-start gap-14">
        {[navA, navB].map((col, i) => (
          <ul key={i} className="space-y-[7px]">
            {col.map((item, j) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-[11px] leading-none transition-colors hover:text-[#16161a] ${
                    i === 0 && j === 0 ? 'text-[#16161a] font-medium' : 'text-[#8a8a93]'
                  }`}
                >
                  {pick(lang, item.zh, item.en)}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </nav>

      <div className="flex items-center gap-2.5">
        <div className="flex overflow-hidden rounded-full border border-[#d9d9de]">
          {(['zh', 'en'] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              aria-label={l === 'zh' ? '切换为中文' : 'Switch to English'}
              className={`px-3 py-2 text-[10px] font-semibold transition-colors ${
                lang === l ? 'bg-[#16161a] text-white' : 'text-[#8a8a93] hover:text-[#16161a]'
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {l === 'zh' ? '中' : 'EN'}
            </button>
          ))}
        </div>
        <a
          href="#install"
          className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#16161a] px-4 py-2 text-[11px] font-medium text-white transition-transform hover:scale-[1.04] active:scale-95"
        >
          {pick(lang, '装一个', 'Install one')}
          <svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  )
}
