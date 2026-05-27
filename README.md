# PD Copywriter

中文产品文案 Skill。帮助产品经理、设计师和 AI Agent 诊断、改写、生成更可靠的中文产品文案，覆盖 UI 交互、营销转化和说明型文案。

它不是一个“让文案更顺”的 prompt，而是一套面向产品界面的文案判断系统：按钮要表达动作，Toast 要匹配停留时间，优惠和数据承诺要可验证，软文案和硬文案要各在自己的位置上发挥作用。

## 快速导航

- [30 秒开始](#30-秒开始)
- [你可以怎么用](#你可以怎么用)
- [它比普通 prompt 多做了什么](#它比普通-prompt-多做了什么)
- [规则体系](#规则体系)
- [评估方法](#评估方法)
- [贡献方式](#贡献方式)

## 为什么做这个

产品文案常被当成最后一步润色，但很多文案问题本质上是产品判断问题。

- 按钮写“确定 / 取消”，用户不看标题就不知道点了会发生什么。
- Toast 写“你的修改已经成功保存了，请继续进行下一步操作”，用户还没读完就消失了。
- 优惠卡片写“全网最低价，仅剩 3 件”，但没有真实库存和比价证明。
- AI 产品只让模型写 CTA，却忽略了主标题、CTA 下方微文案和试用顾虑。
- “成功率提升 99%”和“成功率提升至 99.75%”看起来只差几个字，事实含义却完全不同。

PD Copywriter 把这些高频问题拆成可复用的规则、模板、检查项和评估案例，让强模型不只是“凭感觉写”，而是像产品文案专家一样判断。

## 适合谁

- 产品经理：写弹窗、按钮、空状态、Push、活动规则、帮助说明。
- 设计师：检查界面文案是否清楚、短、符合组件承载能力。
- 增长和运营同学：写优惠、召回、会员、活动文案，同时避免虚假稀缺和过度承诺。
- AI Agent / Skill 作者：把中文产品文案能力作为可安装、可评估、可迭代的 Skill 使用。

不适合：品牌故事、公关稿件、SEO 文章、英文长文案、完整营销 campaign 策划。这些场景需要另一套规则。

## 30 秒开始

```bash
git clone https://github.com/serendipity-88/pd-copywriter.git
cd pd-copywriter
bash publish.sh
```

安装脚本会把 Skill 复制到常见 Skill 目录：

- `~/.claude/skills/pd-copywriter`
- `~/.codefuse/engine/cc/skills/pd-copywriter`
- `~/.codefuse/fuse/skills/pd-copywriter`

手动安装：

```bash
mkdir -p ~/.claude/skills/pd-copywriter
cp -r skill/* ~/.claude/skills/pd-copywriter/
```

安装后，在支持 Skill 的 Agent 里直接描述你的文案任务：

```text
请用 PD Copywriter 诊断这个弹窗：
标题：确定撤回吗？
正文：撤回后对方将无法看到这条消息。
按钮：确定 / 取消
```

## 你可以怎么用

### 1. 诊断已有文案

```text
请用 PD Copywriter 诊断这个 Toast：
你的修改已经成功保存了，请继续进行下一步操作。
```

它会指出：

- Toast 承载时间短，当前文案过长。
- “已经 / 成功 / 了”语义重复。
- 下一步引导不应塞进 Toast。

推荐文案：

```text
已保存
修改已保存
```

### 2. 改写界面文案

```text
请用 PD Copywriter 改写这个优惠卡片：
银行卡立减金
最多减5.0元 工商银行储蓄卡 满5.0元可享 通用场景（部分场景除外）
按钮：去看看
```

它会把信息拆清楚：

```text
标题：银行卡立减金
主信息：工商银行储蓄卡最高减 5 元
条件：满 5 元可用，部分场景除外
按钮：查看可用场景
```

### 3. 生成新文案

```text
CC 是一个 AI 视频生成工具。
请用 PD Copywriter 帮我写首页 CTA。
```

它不会只回答一个按钮，而会判断这个请求背后的产品目标：

```text
主标题：把灵感变成视频作品
主 CTA：开始生成视频
CTA 下方微文案：输入想法，先生成一版看看。
```

按钮承担动作，标题承担想象空间，微文案降低试用顾虑。

### 4. 处理事实和数据表达

```text
请用 PD Copywriter 改写：
本次升级后，视频生成成功率提升99%。
```

它会区分：

- “提升 99%”：相对增幅，容易夸张且语义不清。
- “提升至 99.75%”：结果值，需要真实统计口径。
- “由 96.20% 提升至 99.75%”：变化过程，需要基线、周期和样本量。

如果没有真实数据，它会给可上线文案：

```text
本次升级后，视频生成稳定性已提升
```

也可以给示例文案，但必须标注：

```text
示例数字仅示意，需替换为真实数据。
```

## 它比普通 prompt 多做了什么

| 能力 | 普通 prompt 常见问题 | PD Copywriter 的做法 |
| --- | --- | --- |
| 按钮 | 写“确定 / 取消”，需要用户回看上下文 | 按钮即动作：`撤回 / 不撤回` |
| Toast | 句子过长，短暂停留读不完 | 按载体限制压缩到可扫读长度 |
| 优惠 | 编造库存、最低价、截止时间 | 事实承诺必须可验证 |
| 数据 | “提升 99%”和“提升至 99%”混用 | 检查语义方向、口径、数字可信度 |
| 设置页 | 标签像系统字段 | 改成用户任务：`管理设备`、`设备更新` |
| CTA | 只给一个按钮 | 判断是否需要相邻文案位 |
| 说明文案 | 口语化、无标点、边界不清 | 按 EXP 规则输出完整、精确、可解释的文案 |

## 核心理念

### 规则是护栏，不是天花板

这个 Skill 不是为了把模型限制成“不会犯错但只有 80 分”的文案机器。它的目标是帮助强模型稳定做出更好的产品判断，同时保留创意上限。

好的文案不是单句漂亮，而是匹配场景、用户状态、组件载体、事实边界和产品目标。

### 上下文越多越好，但不是门槛

如果你有 PRD、设计稿、品牌语气、知识库，PD Copywriter 应该利用这些上下文提升质量。

如果你只给一句自然语言，它也应该先给一个可用初版，并标注关键假设，而不是把你拦在一堆表单问题前。

### 专家要补 Unknown Unknown

很多时候用户问的是“按钮写什么”，但真正的问题是：

- 首屏主标题有没有承接产品想象？
- CTA 下方有没有消除顾虑？
- 空状态有没有下一步？
- 优惠文案有没有事实依据？
- 指标文案有没有口径？

PD Copywriter 会在必要时补充高价值相邻文案位，但不会把每个单句请求都扩写成完整页面方案。

## 规则体系

PD Copywriter 覆盖三类产品文案：

| 类型 | 典型载体 | 核心要求 |
| --- | --- | --- |
| UI 交互文案 | 按钮、Toast、弹窗、表单、空状态、导航标签 | 短、清楚、操作导向 |
| MKT 营销文案 | Push、短信、Banner、会员召回、优惠卡片 | 利益清楚、转化导向、事实可验证 |
| EXP 说明文案 | 活动规则、帮助中心、协议、合规说明 | 完整、精确、无歧义 |

三层引擎：

1. 查表引擎：语法模板、动词矩阵、载体字数、主语规则。
2. 推理引擎：虚词选择、叠词开关、英中适配、心理学策略。
3. 韵律引擎：冗余、节奏、数字形态、读起来是否像人话。

核心模块：

- [语法模板库](skill/references/grammar-templates.md)：正向框架、主语规则、事实可信度。
- [虚词选择引擎](skill/references/function-words-table.md)：可以、可、需、只需、就、才等语气差异。
- [动词选择矩阵](skill/references/verb-matrix.md)：删除、移除、取消、清理、撤回等动作边界。
- [载体约束](skill/references/carrier-limits.md)：按钮、Toast、弹窗、Push、规则等字数和结构限制。
- [场景模板](skill/references/scene-templates.md)：错误、空状态、权限、优惠、设置、失败重试等。
- [诊断清单](skill/references/diagnostic-checklist.md)：每次诊断的 P0/P1 检查项。

## 评估方法

PD Copywriter 不只靠 README 自证。仓库里保留了可复跑的 eval：

- [评估方法](docs/eval-methodology.md)
- [30 条 golden eval](evals/golden-v0.jsonl)
- [事实可信度专项报告](docs/eval-reports/factual-credibility.md)
- [核心 10 case 对照报告](docs/eval-reports/core-regression-10.md)

我们会对比：

- Skill 输出
- GPT-5.5 裸跑
- 自动评分
- 人工 side-by-side 评估

一个重要结论是：强模型裸跑已经很会写单点文案。PD Copywriter 的价值不是“让弱模型变聪明”，而是把好的产品文案判断稳定成协议：可解释、可复用、可评估、可迭代。

本地验证：

```bash
node scripts/validate-evals.mjs
```

评分输出：

```bash
node scripts/score-eval-outputs.mjs --evals evals/golden-v0.jsonl --outputs evals/outputs.example.jsonl
```

## 目录结构

```text
pd-copywriter/
├── README.md
├── publish.sh
├── skill/
│   ├── SKILL.md
│   └── references/
├── cases/
│   ├── README.md
│   ├── template.md
│   └── ui/
├── evals/
│   ├── README.md
│   ├── golden-v0.jsonl
│   ├── candidates.jsonl
│   └── schema.json
├── docs/
│   ├── working-principles.md
│   ├── eval-methodology.md
│   ├── public-repo-curation.md
│   └── eval-reports/
└── scripts/
    ├── validate-evals.mjs
    └── score-eval-outputs.mjs
```

## 贡献方式

欢迎贡献三类内容：

1. 贡献案例：使用 [cases/template.md](cases/template.md)，把真实产品文案问题整理成可学习的 case。
2. 贡献 eval：先阅读 [docs/eval-methodology.md](docs/eval-methodology.md)，不要把个人偏好直接写成 golden 标准。
3. 改进 Skill：修改 `skill/SKILL.md` 或 `skill/references/` 后，先运行验证脚本。

```bash
node scripts/validate-evals.mjs
```

公开仓库只保留清洗后的代表性案例和报告。过程性的 raw 输出、临时对比、个人偏好强的素材，应先放在本地或 issue/PR 讨论中，抽象成可迁移规则后再进入主仓库。

## 项目原则

- 从案例抽象规则，不做 case-by-case prompt 补丁。
- 可上线文案不能编造事实，示例文案必须标注示意。
- 简单任务给短答案，复杂任务才展开完整诊断。
- 评估要对比强模型裸跑，不能只靠关键词命中自证。
- 每次迭代都应该保持 Skill 可用、可安装、可回滚。

更多原则见 [docs/working-principles.md](docs/working-principles.md)。

## License

MIT
