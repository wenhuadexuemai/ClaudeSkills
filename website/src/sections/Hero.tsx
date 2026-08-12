import { pick } from '../content'
import type { Lang } from '../content'
import CodeSea from '../components/CodeSea'
import RunTrace from './RunTrace'

const ACC = '#5d5294'

function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c.8 6.5 5.5 11.2 12 12-6.5.8-11.2 5.5-12 12-.8-6.5-5.5-11.2-12-12C6.5 11.2 11.2 6.5 12 0z" />
    </svg>
  )
}

export default function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative mt-12 sm:mt-16 mb-12 overflow-hidden rounded-3xl">
      {/* ambient shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
        <div className="animate-[hue_22s_ease-in-out_infinite] absolute -top-[18%] left-[2%] h-[96%] w-[30%] rounded-full blur-[78px] opacity-40" style={{ background: 'radial-gradient(closest-side,#b8a9f6,transparent 74%)' }} />
        <div className="animate-[hue_27s_ease-in-out_infinite_reverse] absolute -top-[10%] right-[8%] h-[82%] w-[26%] rotate-45 rounded-[14%] blur-[84px] opacity-35" style={{ background: 'linear-gradient(140deg,#f0b6cf,#9fb7f2)' }} />
        <div className="animate-[hue_31s_ease-in-out_infinite] absolute -bottom-[30%] left-[36%] h-[78%] w-[30%] blur-[80px] opacity-30" style={{ background: 'linear-gradient(180deg,#a9b9f4,transparent 82%)', clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
      </div>
      <CodeSea fs={8.5} gap={24} />

      <div className="relative px-2 pb-2 pt-6 sm:px-6 sm:pt-10 text-center">
        <Sparkle className="absolute left-[8%] top-[10%] h-4 w-4 text-[#c9c9d2]" />
        <Sparkle className="absolute right-[10%] top-[38%] h-5 w-5 text-[#c9c9d2]" />

        <div
          className="mb-6 inline-flex items-center gap-2.5 text-[10.5px] font-medium uppercase tracking-[0.13em] animate-[fade-up_0.7s_ease_both]"
          style={{ color: ACC, fontFamily: "'JetBrains Mono', monospace", animationDelay: '0.1s' }}
        >
          <span className="h-[5px] w-[5px] animate-[pulse_2s_ease-in-out_infinite] rounded-full" style={{ background: ACC }} />
          {pick(lang, '13 个精选技能 · 4 大旗舰 · 91 个路由用例 · MIT 开源', 'Open Agent Skills · 13 curated · v1.0.1')}
        </div>

        <h1
          className="mx-auto max-w-[860px] text-[34px] sm:text-[50px] lg:text-[60px] leading-[1.08] font-light tracking-[-0.03em] text-[#16161a] animate-[fade-up_0.7s_ease_both]"
          style={{ animationDelay: '0.2s', textWrap: 'balance' }}
        >
          {pick(lang, '为你的 Agent', 'Give your agent')}
          <br className="hidden sm:block" />
          {pick(lang, '注入一套', ' ')}
          <span className="font-medium">{pick(lang, '工作方法', 'a method')}</span>
          {pick(lang, '，', ', ')}
          <br className="hidden sm:block" />
          {pick(lang, '而不只是一句空泛的提示词。', 'not another prompt.')}
        </h1>

        <p
          className="mx-auto mt-5 max-w-[620px] text-[15px] sm:text-[16px] leading-[1.75] text-[#16161a]/60 animate-[fade-up_0.7s_ease_both]"
          style={{ animationDelay: '0.3s' }}
        >
          {pick(
            lang,
            '一套遵循 Agent Skills 开放规范构建的技能合集：不止步于堆砌指令，而是把成熟工作流程提炼成 Agent 可稳定执行的行动方案。Prompt 用完就散，Skill 则能持续复用、检查和迭代。',
            'Thirteen open, portable Agent Skills turn how experienced people research, decide, publish and maintain systems into workflows any compatible agent can execute — explicit steps, inspectable checkpoints and defined outputs.'
          )}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-[fade-up_0.7s_ease_both]" style={{ animationDelay: '0.4s' }}>
          <a
            href="#tracks"
            className="group inline-flex items-center gap-2 rounded-full bg-[#16161a] px-6 py-3.5 text-[11px] font-semibold tracking-[0.14em] text-white transition-transform duration-300 hover:scale-[1.04] active:scale-95"
          >
            {pick(lang, '查看四大旗舰技能', 'PICK YOUR TRACK')}
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M1 5h8M5.5 1.5L9 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#install"
            className="inline-flex items-center rounded-full border border-[#16161a]/25 px-6 py-3.5 text-[11px] font-semibold tracking-[0.14em] text-[#16161a] transition-colors hover:border-[#16161a]"
          >
            {pick(lang, '30 秒快速上手', 'INSTALL IN 30S')}
          </a>
          <span className="text-[12px] text-[#16161a]/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            MIT · no telemetry
          </span>
        </div>

        <RunTrace lang={lang} />
      </div>
    </section>
  )
}
