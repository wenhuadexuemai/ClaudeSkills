export type Lang = 'zh' | 'en'
export const pick = (lang: Lang, zh: string, en: string) => (lang === 'zh' ? zh : en)

export interface Step { label: string; t: string; state: 'done' | 'active' | 'ask' | 'todo' }

export const steps = (lang: Lang): Step[] => [
  { label: pick(lang, '界定 · 复述问题与约束', 'scope · restate the question'), t: '0.4s', state: 'done' },
  { label: pick(lang, '取证 · 3 个独立来源', 'gather · 3 independent sources'), t: '6.1s', state: 'done' },
  { label: pick(lang, '登记 · 记录 11 条论断', 'registry · 11 claims logged'), t: '1.2s', state: 'done' },
  { label: pick(lang, '核查 · 逐条引用回源', 'verify · re-open every citation'), t: '8.7s', state: 'active' },
  { label: pick(lang, '提问 · 留一个问题给你', 'ask · one open question for you'), t: '—', state: 'ask' },
  { label: pick(lang, '成文 · 结论、取舍、局限', 'write · conclusions, trade-offs, limits'), t: '—', state: 'todo' },
]

export interface Track {
  n: string; kind: string; name: string; desc: string; cmd: string; inp: string; out: string
  bg: string; c1: string; c2: string; c3: string
}

export const tracks = (lang: Lang): Track[] => [
  {
    n: '01', kind: pick(lang, '深度研究', 'Research'), name: 'Deep Research',
    desc: pick(lang, '拒绝 AI 幻觉，交付一份真正经得起推敲的深度报告。它会精准圈定问题边界、从多个独立信源交叉验证、建立可回溯的引用档案，并坦诚地告诉你它的局限性。', 'Scope the question, gather multiple sources, keep a registry, check every citation, and deliver a report with conclusions, trade-offs and stated limitations.'),
    cmd: '$ Use deep-research to compare three RAG architectures',
    inp: pick(lang, '一个待决策的复杂问题', 'A decision + constraints'), out: pick(lang, '来源清晰、附带引用的决策备忘录', 'Cited memo or report'),
    bg: '#8f81e6', c1: '#cbbdfb', c2: '#7c6fe0', c3: '#f0a9cd',
  },
  {
    n: '02', kind: pick(lang, '想法打磨器', 'Decision interview'), name: 'Product Manager',
    desc: pick(lang, '遵循「文档先行」原则。它会像一位资深产品经理一样，通过一轮轮的追问，将你模糊的想法锤炼成结构化的产品文档（PRD）。支持断点续聊，让你随时回到上次的思考节点。', 'One decision per turn: it reads the evidence first, argues its recommendation, resumes from saved state, and stops hard before approval.'),
    cmd: '$ Use product-manager in grill-me-to-doc mode',
    inp: pick(lang, '一个尚未完全想清楚的点子', 'A half-formed idea'), out: pick(lang, '产品文档 + 可回溯的决策日志', 'PRODUCT-DOC + decision log'),
    bg: '#7e88e4', c1: '#b9c6fa', c2: '#6f78dd', c3: '#c2a4ef',
  },
  {
    n: '03', kind: pick(lang, 'PPT 工作室', 'Presentation'), name: 'Deck Studio',
    desc: pick(lang, '坚持「先定故事，再做美化」的专业流程。从对齐核心大纲、敲定单页简报，到应用视觉模板、完成最终走查，帮你构筑演示文稿的坚实骨架。', 'Confirm the story before polishing slides — page briefs, registered layouts, visual drafts, and an explicit visual QA pass.'),
    cmd: '$ Use deck-studio to turn this review into a deck',
    inp: pick(lang, '核心素材、目标听众、期望目标', 'Source, audience, goal'), out: pick(lang, '内容结构稿 + 视觉交付物', 'Deck content + visuals'),
    bg: '#c084d6', c1: '#f7bcd3', c2: '#b073d6', c3: '#8b83e4',
  },
  {
    n: '04', kind: pick(lang, '公众号爆文神器', 'Content pipeline'), name: 'WeChat Article Writer',
    desc: pick(lang, '一站式解决内容创作难题。它可以生成文章正文、富有创意的 AI 配图提示词，以及适配微信的排版 HTML。既可单篇使用，也可作为内容流水线的一个环节无缝衔接。', 'Run article, image-prompts, layout or full-pipeline. Prompts are not generated images, and nothing is auto-published.'),
    cmd: '$ Use wechat-article-writer full-pipeline for these notes',
    inp: pick(lang, '一些笔记或一份大纲', 'Notes or an outline'), out: pick(lang, '结构化文章 + 图片提示词 + 内联 HTML', 'Article + prompts + HTML'),
    bg: '#9a8ae8', c1: '#d3c8fb', c2: '#8779e3', c3: '#f3c1a9',
  },
]

export interface Gate { gate: string; ok: string; no: string }

export const gates = (lang: Lang): Gate[] => [
  { gate: 'validate.py', ok: pick(lang, '检查全部 13 个技能的结构与契约', 'Directory and structure contracts, 13 skills'), no: pick(lang, '未做真实业务任务的端到端', 'Not live end-to-end on business tasks') },
  { gate: 'run_routing_evals.py', ok: pick(lang, '运行 91 条路由用例，测试技能识别的准确性', '91 schema and conflict cases, 10 skills'), no: pick(lang, '未测模型实跑的路由准确率', 'Not model-executed routing accuracy') },
  { gate: 'run_contract_tests.py', ok: pick(lang, '运行四大旗舰技能的 17 个核心契约用例', '17 core contract cases across the four flagships'), no: pick(lang, '非第三方独立认证', 'Not independent external certification') },
  { gate: 'deck-studio artifacts', ok: pick(lang, '生成脚本、渲染结果、评分标准全部开源，构成主义样例自测 7.1/10', 'Generators, renders, rubrics open; constructivist sample self-scored 7.1/10'), no: pick(lang, '主观质量仍需人工复核', 'Subjective quality still needs human review') },
  { gate: 'SECURITY.md', ok: pick(lang, '逐 skill 的读/写/网络/shell/凭据/删除', 'Per-skill reads, writes, network, shell, credentials, deletion'), no: pick(lang, '不能替代你自己的合规评审', 'Not a substitute for your own policy review') },
]

export type SkillCat = 'flagship' | 'engineering' | 'product' | 'ops'
export interface Skill { n: string; id: string; desc: string; caps: string; cat: SkillCat }

const SK: [string, string, [string, string], string, SkillCat][] = [
  ['01', 'deck-studio', ['页面规划与视觉交付', 'Deck planning and visual delivery'], 'READ · WRITE · SHELL', 'flagship'],
  ['02', 'deep-research', ['带证据的研究报告', 'Evidence-backed research reports'], 'READ · WRITE · NET · SHELL', 'flagship'],
  ['03', 'product-manager', ['决策拷问与产品文档', 'Decision interviews and PRODUCT-DOC'], 'READ · WRITE', 'flagship'],
  ['04', 'wechat-article-writer', ['文章、图提示词、内联 HTML', 'Article, image prompts, inline HTML'], 'READ · WRITE · NET', 'flagship'],
  ['05', 'pair-programming', ['带结构化自审的实现', 'Implementation with structured self-review'], 'READ · WRITE', 'engineering'],
  ['06', 'security-audit', ['代码与依赖安全审查', 'Code and dependency security review'], 'READ · WRITE · SHELL', 'engineering'],
  ['07', 'solution-architect', ['架构与技术选型', 'Architecture and technology decisions'], 'READ · WRITE', 'engineering'],
  ['08', 'threejs-performance', ['Three.js 性能诊断', 'Three.js performance diagnosis'], 'READ · WRITE', 'engineering'],
  ['09', 'mineru-pdf-parser', ['PDF 转 Markdown / JSON', 'PDF to Markdown or JSON'], 'READ · WRITE · NET', 'engineering'],
  ['10', 'ai-sales-champion', ['技术到业务的销售对话', 'Technical-to-business sales dialogue'], 'READ', 'product'],
  ['11', 'keqian-method', ['单 agent 的 SDD 产品流程', 'Single-agent, SDD product workflow'], 'READ · WRITE', 'product'],
  ['12', 'xuefeng-method', ['模型驱动的产品方法论', 'Model-driven product methodology'], 'READ · WRITE', 'product'],
  ['13', 'c-drive-cleaner', ['受守卫的 Windows 磁盘清理', 'Guarded Windows disk cleanup'], 'READ · DELETE*', 'ops'],
]

export const skills = (lang: Lang): Skill[] =>
  SK.map(([n, id, [zh, en], caps, cat]) => ({ n, id, desc: pick(lang, zh, en), caps, cat }))

export interface Faq { q: string; a: string }

export const faqs = (lang: Lang): Faq[] => [
  { q: pick(lang, '这和提示词合集有什么区别？', 'How is this different from a prompt collection?'), a: pick(lang, '提示词说完就没了。skill 是带版本的文件夹：SKILL.md，以及需要时的引用、脚本、素材、schema 和反例。', 'A prompt disappears into a conversation. A skill is a versioned folder with a SKILL.md and, when needed, references, scripts, assets, schemas and negative cases.') },
  { q: pick(lang, '契约测试通过就等于生产可用吗？', 'Do passing contract tests equal production performance?'), a: pick(lang, '不等于。未来模型上的主观质量、真实图像服务、公众号发布，仍需单独验证。', 'No. Subjective quality on future models, live image providers and WeChat publishing still need separate verification.') },
  { q: pick(lang, '为什么我的 skill 没被发现？', 'Why was my skill not discovered?'), a: pick(lang, '确认客户端会扫 .agents/skills，或改用它的原生目录。安装脚本会去掉仓库前缀，保持稳定标识。', 'Confirm the client scans .agents/skills, or use its native directory. The installer strips the repo prefix so the identity stays stable.') },
  { q: pick(lang, '怎么贡献？', 'How do I contribute?'), a: pick(lang, '先开 issue。新 skill 在 lab/ 孵化，达到质量门槛与披露要求后毕业。', 'Start with an issue. New skills incubate in lab/ and graduate once they meet the quality gates and disclosure rules.') },
]

export interface BeforeAfter { label: string; before: string; after: string; pct: string; note: string }

export const beforeAfter = (lang: Lang): BeforeAfter[] => [
  { label: pick(lang, '选型对比备忘', 'Vendor comparison brief'), before: '2 days', after: '40 min', pct: '14%', note: pick(lang, '+ 每条结论都带出处', '+ every claim carries a source') },
  { label: pick(lang, '从一个点子到产品文档', 'Product doc from a raw idea'), before: '3 meetings', after: '1 session', pct: '33%', note: pick(lang, '+ 一份能回溯的决策日志', '+ a decision log you can re-open') },
  { label: pick(lang, '季度汇报 deck', 'Quarterly review deck'), before: '1 week', after: '1 day', pct: '20%', note: pick(lang, '+ 美化之前先把故事定下来', '+ story agreed before any polish') },
]

export const heroStats = (lang: Lang) => [
  { v: '13', l: pick(lang, '精选技能', 'curated skills') },
  { v: '91', l: pick(lang, '路由用例', 'routing cases') },
  { v: '4', l: pick(lang, '旗舰技能', 'flagships') },
  { v: '0', l: pick(lang, '自动发布动作', 'auto-publish steps') },
]

export const accessRows = [
  { id: 'deep-research', caps: 'READ · WRITE · NET · SHELL' },
  { id: 'security-audit', caps: 'READ · WRITE · SHELL' },
  { id: 'c-drive-cleaner', caps: 'READ · DELETE*' },
]
