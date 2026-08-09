[![en](https://img.shields.io/badge/lang-English-blue.svg)](README.md) [![zh-CN](https://img.shields.io/badge/语言-简体中文-red.svg)](README.zh-CN.md)

# ClaudeSkills

ClaudeSkills 是一个 Agent Skills 合集：13 个按开放 `SKILL.md` 格式写的技能包。每个 Skill 把一件事的完整做法装进仓库——步骤、模板、脚本、样例、验收标准都是文件，支持 Agent Skills 的客户端都能装、都能用。

一段 prompt 只能让模型把事做一次，聊完就丢；Skill 把方法沉淀下来，能复用、能检查、能接着改进。

[![validate](https://github.com/staruhub/ClaudeSkills/actions/workflows/validate.yml/badge.svg)](https://github.com/staruhub/ClaudeSkills/actions/workflows/validate.yml)
[![release](https://img.shields.io/badge/release-1.0.0-2746d8)](https://github.com/staruhub/ClaudeSkills/releases/tag/1.0.0)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**目录**：[快速开始](#快速开始) · [Skill 列表](#skill-列表) · [验证](#验证) · [安装选项](#安装选项) · [贡献](#贡献)

[官网](https://staruhub.github.io/ClaudeSkills/) · [1.0.0 发布说明](https://github.com/staruhub/ClaudeSkills/releases/tag/1.0.0) · [安全说明](SECURITY.md)

## 快速开始

装一个试试，比如 deck-studio：

```bash
git clone --depth 1 https://github.com/staruhub/ClaudeSkills.git && cd ClaudeSkills
python3 scripts/install_skill.py deck-studio
```

装完直接跟你的 Agent 说：

```text
使用 deck-studio，把这份季度复盘做成一套 8 页的咨询风汇报
```

默认装到 `~/.agents/skills/`，多数客户端都扫描这个目录。其他安装方式见[安装选项](#安装选项)。

## Skill 列表

四个旗舰：

| Skill | 干什么 |
|---|---|
| [`deep-research`](skills/Geek-skills-deep-research/SKILL.md) | 调研：圈范围、分头找资料、逐条登记来源、核对引用，产出带出处和局限的报告 |
| [`product-manager`](skills/Geek-skills-product-manager/SKILL.md) | grill-me-to-doc：先读仓库现状，一轮一个问题，把模糊想法问成产品文档；文档没定稿不动代码，中断能续 |
| [`deck-studio`](skills/Geek-skills-deck-studio/SKILL.md) | 做 PPT：对大纲、逐页 brief、套版式、复核画面，交内容稿或逐页视觉稿 |
| [`wechat-article-writer`](skills/Geek-skills-wechat-article-writer/SKILL.md) | 公众号：正文、配图提示词、排版 HTML，可单出可串流水线，不会替你发布 |

九个专业技能：

<details>
<summary><b>展开</b></summary>

| Skill | 干什么 |
|---|---|
| [`pair-programming`](skills/Geek-skills-pair-programming/SKILL.md) | 写代码 + 结构化自审，专盯 AI 代码的常见毛病 |
| [`security-audit`](skills/Geek-skills-security-audit/SKILL.md) | 审代码和依赖的安全问题 |
| [`solution-architect`](skills/Geek-skills-solution-architect/SKILL.md) | 系统设计、选型、架构评审 |
| [`threejs-performance`](skills/Geek-skills-threejs-performance/SKILL.md) | Three.js 性能排查和优化 |
| [`mineru-pdf-parser`](skills/Geek-skills-mineru-pdf-parser/SKILL.md) | 用本机 MinerU 把 PDF 转 Markdown 或 JSON |
| [`ai-sales-champion`](skills/Geek-skills-ai-sales-champion/SKILL.md) | 把技术能力讲成客户听得懂的价值 |
| [`keqian-method`](skills/Geek-skills-keqian-method/SKILL.md) | 单 Agent + SDD + 质量门禁的产品开发方法 |
| [`xuefeng-method`](skills/Geek-skills-xuefeng-method/SKILL.md) | 行为开放、模型驱动的 AI Native 产品方法 |
| [`c-drive-cleaner`](skills/Geek-skills-c-drive-cleaner/SKILL.md) | Windows C 盘清理，默认只演习不动手 |

</details>

实验性的（备考、天气报告、播客生成等）在 [`lab/`](lab/)，不计入精选，也不走同一套检查。

## 验证

能自动查的都写成了脚本，随时自己跑：

```bash
python3 scripts/validate.py                  # 13 个精选 Skill 的结构检查
python3 scripts/run_routing_evals.py         # 91 条路由用例
python3 tests/task_b/run_contract_tests.py   # 四个旗舰的 17 个契约用例
```

成品也可以直接检查。deck-studio 的生成脚本、渲染结果、评分标准、评审意见都在仓库里，17 套风格先看 4 套：

<p align="center">
<img src="skills/Geek-skills-deck-studio/style-library/creative/bauhaus-preview.png" alt="包豪斯演示文稿风格预览" width="24%"> <img src="skills/Geek-skills-deck-studio/style-library/creative/constructivist-preview.png" alt="构成主义演示文稿风格预览" width="24%"> <img src="skills/Geek-skills-deck-studio/style-library/media/neubrutalism-preview.png" alt="新粗野主义演示文稿风格预览" width="24%"> <img src="skills/Geek-skills-deck-studio/style-library/business/aicher-preview.png" alt="Aicher 演示文稿风格预览" width="24%">
</p>

样例：[构成主义](skills/Geek-skills-deck-studio/examples/constructivist-design-constitution/) · [墨白咨询报告](skills/Geek-skills-deck-studio/examples/moshiro-consulting-report/) · [英黄训练营提案](skills/Geek-skills-deck-studio/examples/yinghuang-bootcamp-proposal/) · [极夜 AI Native](skills/Geek-skills-deck-studio/examples/polar-night-ai-native/)

自测分数：构成主义样例按仓库的评分标准拿 **7.1/10**；三评委对调位置对比，**42.3** 对 **29.7**。过程和数据都在仓库里，可以自己复现。

<details>
<summary><b>每项检查能证明什么、证明不了什么</b></summary>

| 检查 | 能证明 | 证明不了 |
|---|---|---|
| `run_contract_tests.py` | 17 个固定用例，覆盖四个旗舰的正常、恢复、失败路径；Deck 另跑真实 Chrome 渲染和 PPTX 组装 | 换模型后的输出质量、真实出图、微信实际发布 |
| `validate.py` | 13 个精选 Skill 的目录结构符合仓库约定 | 每个 Skill 都跑过真实业务 E2E |
| `run_routing_evals.py` | 10 个 Skill、91 条路由用例的 schema、目标、唯一性、冲突检查通过 | 大模型真实执行时的路由准确率 |
| Python / Node 编译检查 | 仓库的 13 个 Python、7 个 JavaScript 文件都能解析 | 网络、外部工具、生产环境可用性 |

完整记录在 [`verification/2026-07-31/README.md`](verification/2026-07-31/README.md)。

</details>

## 安装选项

<details>
<summary><b>展开</b></summary>

```bash
python3 scripts/install_skill.py --list                  # 查看全部短名
python3 scripts/install_skill.py deep-research           # 装任意一个
python3 scripts/install_skill.py deep-research --project # 只装到当前项目
python3 scripts/install_skill.py deep-research --client claude-code # Claude Code 目录
cp -r skills/Geek-skills-deep-research ~/.agents/skills/deep-research # 手动复制，目录名即 Skill 名
```

```bash
git pull && python3 scripts/install_skill.py deck-studio --force   # 更新
rm -rf ~/.agents/skills/deck-studio                                # 卸载
```

常见问题：

- 装了没被发现：确认客户端扫描的是不是 `.agents/skills/`，不是就用它的原生目录。
- 不自动触发：在请求里点名 Skill。触发方式各客户端不同，有的听自然语言，有的要斜杠命令。
- `git pull` 后要重装，装的是副本。

</details>

## 贡献

有 bug、有做出来的东西，欢迎[提 issue](https://github.com/staruhub/ClaudeSkills/issues)，带上脱敏的输入、产物和复现步骤。想加新 Skill 先看 [CONTRIBUTING.md](CONTRIBUTING.md)：先进 [`lab/`](lab/)，过了检查再进精选。

觉得有用就点个 star。微信群宣传图和文案在 [`assets/social/`](assets/social/)，拿去用。

## 安全

每个 Skill 读什么文件、联不联网、跑不跑命令、碰不碰凭证，逐个写在 [`SECURITY.md`](SECURITY.md)。

## License

[MIT](LICENSE)
