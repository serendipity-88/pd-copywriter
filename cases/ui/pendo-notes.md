---
title: Pendo 清单笔记：功能介绍文案过载且语气不统一
product: Pendo 清单笔记
platform: mobile
copy_type: UI
carrier: 空状态 + 功能介绍 + 使用提示
scenario: 笔记/日程功能引导
source_type: user-provided
source_url:
observed_date: 2026-05-25
confidence: medium
eval_candidate: true
---

# Pendo 清单笔记：功能介绍文案过载且语气不统一

## Basic Info

- Product: Pendo 清单笔记
- Platform: mobile
- Copy type: UI
- Carrier: 空状态 + 功能介绍 + 使用提示
- Scenario: 笔记/日程功能引导
- Source: User-provided observation
- Confidence: medium

## Context

清单/笔记/日程类产品的文案重点是降低记录成本，让用户知道“我可以怎么快速写下来”。但如果说明文案本身很长、语气跳跃、操作术语不稳定，反而会让一个本该轻量的工具显得复杂。

## Original Copy

> 这个类型的内容空空如也，请再按底部的分类按钮回到综合时间轴

> 专属的日记模式 - 日记及内容不会被意外更改

> 注意到下面的标签吗？工作、学习、旅游、笔记可以轻松区分～

> 两指夹滑调整字号大小；

> 写日程，点图标 - 搞定！

> 复杂的描述也成，比如‘每周二晚八点游泳直到十二月底’

> 独特的快捷命令 - 写日程后新起一行打‘日程’或‘C’再换行就会自动识别

## Diagnosis

- What works:
  - 文案试图解释功能价值：日记保护、标签分类、字号调整、自然语言识别、快捷命令。
  - 有些句子有轻工具产品的口语感，例如“搞定！”。

- What is risky:
  - 空状态句子过长。“这个类型的内容空空如也”与“回到综合时间轴”都偏抽象，用户要先理解“类型”“综合时间轴”两个系统概念。
  - “请再按底部的分类按钮”像说明书，不像移动端空状态。空状态更应该给轻行动，而不是描述界面位置。
  - “专属的日记模式 - 日记及内容不会被意外更改”里的“日记及内容”重复，“意外更改”不够口语，也没有说明保护机制。
  - “注意到下面的标签吗？”是反问式引导，增加阅读成本。用户未必注意到，也未必需要被这样提醒。
  - “两指夹滑调整字号大小；”用了分号，像说明文档残片，不像 App 内提示。
  - “写日程，点图标 - 搞定！”操作顺序不够明确：是先写日程再点图标，还是点图标进入写日程？
  - “复杂的描述也成”口语过强，“也成”在产品说明里显得随意。
  - “新起一行打‘日程’或‘C’再换行”信息密度高，说明了一个复杂规则，但缺少示例格式。
  - 同一组文案里同时出现说明书语气、亲切反问、口语俏皮、技术规则，整体 voice 不统一。

- Why it matters:
  - 笔记类产品卖的是“轻”和“快”，介绍文案越复杂，越会削弱产品心智。
  - 功能引导不应一次性解释所有高级能力。用户需要的是“先能用起来”，而不是理解完整语法。
  - 如果快捷命令确实强大，应该用示例驱动，而不是规则描述驱动。

## Rewrite Options

### Empty State

> 这里还没有内容  
> 去综合时间轴看看全部记录

按钮：

> 查看综合时间轴

Best for: 需要从分类空状态引导用户回到全量视图。

### Feature Intro

> 日记模式会锁定内容，避免误改。

Best for: 解释日记模式的保护价值。

### Tags

> 用标签区分工作、学习、旅游和笔记。

Best for: 简洁说明标签用途，不用反问。

### Gesture

> 双指缩放，调整字号。

Best for: 手势提示，短、直接、可扫描。

### Schedule

> 写下日程，点一下图标就能识别。

Best for: 低门槛解释自然语言日程识别。

### Natural Language Example

> 例如：每周二晚 8 点游泳，直到 12 月底。

Best for: 用示例替代规则讲解。

### Quick Command

> 新起一行输入“日程”或“C”，即可识别为日程。

Best for: 解释高级快捷命令，适合帮助页而非新手引导首屏。

## Rule Mapping

- Rule: 空状态应说明当前状态 + 给下一步，不堆系统概念。
- Rule: 功能引导优先示例，不优先规则。
- Rule: 同一产品内 voice/tone 要统一。
- Rule: 移动端提示避免说明书式长句。
- Reference: `skill/references/scene-templates.md`, `skill/references/flow-templates.md`, `skill/references/style-presets.md`
- Severity: P1

## PM Takeaway

笔记产品的高级能力越多，越要克制说明。PM 要把功能介绍拆成层级：新手只看一句价值 + 一个动作，高级用户再看规则和快捷命令。

当文案开始解释“按钮在哪里”“输入什么命令”“再换行会怎样”时，应该警惕：这可能不是文案问题，而是功能学习成本已经过高。

## Eval Mapping

- Eval mode: diagnosis
- Expected findings:
  - 识别空状态过长且系统概念多。
  - 识别功能介绍语气不统一。
  - 识别快捷命令说明信息密度过高。
  - 建议用示例替代复杂规则描述。
- Must include:
  - 空状态
  - 信息密度
  - 语气不统一
  - 示例
- Must not include:
  - 这个类型的内容空空如也，请再按底部的分类按钮回到综合时间轴
- Acceptable rewrite traits:
  - 空状态更短。
  - 功能说明拆层。
  - 保留工具产品轻快感但不跳脱。
- Risk tags:
  - empty_state
  - onboarding
  - voice_consistency
  - information_density
