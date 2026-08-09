import { pick, beforeAfter } from '../content'
import type { Lang } from '../content'
import { SectionHead } from './Tracks'

const ACC = '#5d5294'
const OK = '#0f8f5b'

const MONO = { fontFamily: "'JetBrains Mono', monospace" }

export default function Install({ lang }: { lang: Lang }) {
  return (
    <section id="install" className="mt-14 border-t border-[#16161a]/10 pt-12">
      <SectionHead no="02" zh="快速上手" en="QUICK START" lang={lang}
        title={pick(lang, '30 秒快速上手，从安装到产出。', 'Install one. Use it on real work this week.')}
        aside={pick(lang, '忘掉繁琐的配置。我们建议一次只装一个，并立刻用到真实任务里。', 'Do not load all 13 by default. The installer copies only the skill you name into the cross-client .agents/skills directory.')}
      />

      <div className="grid min-w-0 gap-4 md:grid-cols-3">
        {/* step 1 */}
        <div className="min-w-0 rounded-xl border border-[#16161a]/10 p-[18px] transition-shadow hover:shadow-[0_14px_34px_rgba(34,36,44,.1)]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="grid h-[22px] w-[22px] place-items-center rounded-full border text-[11px] font-medium" style={{ borderColor: ACC, color: ACC, ...MONO }}>1</span>
            <span className="text-[13px] font-medium text-[#16161a]">{pick(lang, '克隆仓库', 'Clone')}</span>
          </div>
          <div className="break-all rounded-lg bg-[#eceef5] px-3 py-2.5 text-[11.5px] leading-[1.8]" style={MONO}>
            git clone --depth 1 \<br />&nbsp;&nbsp;github.com/staruhub/ClaudeSkills.git
          </div>
        </div>

        {/* step 2 */}
        <div className="min-w-0 rounded-xl border border-[#16161a]/10 p-[18px] transition-shadow hover:shadow-[0_14px_34px_rgba(34,36,44,.1)]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="grid h-[22px] w-[22px] place-items-center rounded-full border text-[11px] font-medium" style={{ borderColor: ACC, color: ACC, ...MONO }}>2</span>
            <span className="text-[13px] font-medium text-[#16161a]">{pick(lang, '安装你需要的技能', 'Install the one you need')}</span>
          </div>
          <div className="break-all rounded-lg bg-[#eceef5] px-3 py-2.5 text-[11.5px] leading-[1.8]" style={MONO}>
            python3 scripts/install_skill.py \<br />&nbsp;&nbsp;<span style={{ color: ACC }}>deck-studio</span>
          </div>
          <div className="mt-2.5 text-[11px] leading-[1.7] text-[#16161a]/45">
            {pick(lang, '或直接告诉你的 Agent：「帮我安装 ClaudeSkills 里的 ppt 技能。」', 'Or just tell your agent: "install the ppt skill from ClaudeSkills."')}
          </div>
        </div>

        {/* step 3 */}
        <div className="min-w-0 rounded-xl border border-[#16161a]/10 p-[18px] transition-shadow hover:shadow-[0_14px_34px_rgba(34,36,44,.1)]">
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="grid h-[22px] w-[22px] place-items-center rounded-full border text-[11px] font-medium" style={{ borderColor: ACC, color: ACC, ...MONO }}>3</span>
            <span className="text-[13px] font-medium text-[#16161a]">{pick(lang, '开始使用', 'Give it a real instruction')}</span>
          </div>
          <div className="rounded-lg bg-[#eceef5] px-3 py-2.5 text-[11.5px] leading-[1.8] text-[#423a6a]">
            {pick(lang, '「使用 deck-studio，把这份季度复盘做成一套 8 页的咨询风汇报。」', 'Use deck-studio to turn this quarterly review into an 8-page consulting-style deck.')}
          </div>
          <div className="mt-2.5 text-[11px] leading-[1.6]" style={{ color: OK, ...MONO }}>
            ✓ {pick(lang, '默认安装到 ~/.agents/skills/，主流客户端自动扫描', 'Installs to ~/.agents/skills/ — auto-scanned by major clients')}
          </div>
        </div>
      </div>

      {/* before / after */}
      <div className="mt-6 overflow-hidden rounded-xl border border-[#16161a]/10">
        <div className="border-b border-[#16161a]/10 px-[18px] py-3 text-[10.5px] font-medium tracking-[0.1em] text-[#16161a]/40" style={MONO}>
          {pick(lang, '同一个人、同一件活 —— 之前 / 之后', 'SAME OPERATOR, SAME TASK — BEFORE / AFTER')}
        </div>
        <div className="grid md:grid-cols-3">
          {beforeAfter(lang).map((b, i) => (
            <div key={b.label} className={`p-[18px] ${i < 2 ? 'md:border-r border-b md:border-b-0 border-[#16161a]/10' : ''}`}>
              <div className="mb-3 text-[11.5px] text-[#16161a]/40">{b.label}</div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[15px] text-[#16161a]/40 line-through" style={MONO}>{b.before}</span>
                <span style={{ color: ACC }}>→</span>
                <span className="text-[28px] leading-none" style={MONO}>{b.after}</span>
              </div>
              <div className="mt-3.5 h-1 overflow-hidden rounded-full bg-[#16161a]/10">
                <span className="fill-bar block h-full rounded-full" style={{ width: b.pct, background: ACC }} />
              </div>
              <div className="mt-2 text-[11px] leading-[1.5] text-[#16161a]/40" style={MONO}>{b.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
