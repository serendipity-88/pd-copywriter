---
title: TapNow CTA：单个按钮请求也应补全高价值相邻文案位
product: TapNow
platform: web
copy_type: MIXED
carrier: 首页 CTA + 主标题 + 辅助微文案
scenario: AI 视频生成工具首页转化
source_type: synthetic
source_url:
observed_date: 2026-05-25
confidence: medium
eval_candidate: true
---

# TapNow CTA：单个按钮请求也应补全高价值相邻文案位

## Basic Info

- Product: TapNow
- Platform: web
- Copy type: MIXED
- Carrier: 首页 CTA + 主标题 + 辅助微文案
- Scenario: AI 视频生成工具首页转化
- Source: Synthetic case from product discussion
- Confidence: medium

## Context

用户要求为 AI 视频生成工具写首页 CTA。普通回答容易只给按钮，例如“开始体验”“立即生成”。但创意工具的首页通常不是只有按钮：主标题需要表达产品想象空间，副标题解释生成方式和结果，CTA 下方微文案消除收费、门槛或结果不确定顾虑。

这个案例测试 Skill 是否具备专家补全能力：用户问一个文案位时，能否识别它背后的产品目标，并主动建议 1-3 个相邻高价值文案位。

## Original Copy

> 免费体验 AI 视频商场

CTA:

> 开始体验

## Diagnosis

- What works:
  - “免费体验”能降低试用门槛。
  - “AI 视频”说出了产品大类。

- What is risky:
  - “AI 视频商场”语义不清，可能让用户误解为视频素材商城，而不是 AI 视频生成工具。
  - “开始体验”动作太泛，不说明点击后是生成、上传、浏览模板还是进入编辑器。
  - 如果只把所有表达压进 CTA，会牺牲创意工具应有的想象空间。

- Why it matters:
  - AI 视频生成工具需要同时解决两个问题：让用户想象结果，以及让用户知道下一步怎么开始。
  - “把灵感变成视频作品”这类软文案不适合作为按钮，但适合作为主标题、辅助微文案、水印或分享卡片。

## Rewrite Options

### Option A

主标题：

> 把灵感变成视频作品

副标题：

> 输入一句想法，让 AI 生成可预览的视频

按钮：

> 开始生成视频

微文案：

> 免费体验，生成前可预览

Best for: 首屏转化，希望清楚说明产品能力和下一步动作。

### Option B

主标题：

> 让灵感自己动起来

按钮：

> 试着生成一个视频

微文案：

> 不会剪辑也能开始

Best for: 更偏创意和轻松语气，适合降低新用户心理门槛。

### Option C

主标题：

> 从想法，到成片

副标题：

> 用一句描述生成你的第一支 AI 视频

按钮：

> 创建第一支视频

Best for: 强调结果和第一步行动，适合新手引导。

## Rule Mapping

- Rule: 按钮是硬文案位，必须表达动作和点击结果。
- Rule: 主标题、CTA 下方微文案、水印和分享卡片是软文案位，可以承担品牌感和想象空间。
- Rule: 用户只问单个文案位时，应判断相邻文案位是否能创造额外价值。
- Reference: `skill/SKILL.md`, `skill/references/scene-templates.md`
- Severity: P1

## PM Takeaway

专家不是把按钮写得更花，而是知道哪句话应该放在哪里。CTA 应该让用户知道点击后会发生什么；品牌感和想象空间应该交给主标题、副标题、CTA 下方微文案、水印或分享卡片。

当用户只问“按钮写什么”，Skill 也要思考：用户真正要解决的是按钮，还是整个首屏转化表达。

## Eval Mapping

- Eval mode: generation
- Expected findings:
  - 区分按钮等硬文案位与主标题/微文案等软文案位。
  - 不把 slogan 式文案强塞进 CTA。
  - 在给 CTA 变体之外，主动补充相邻文案位建议。
- Must include:
  - 开始生成视频
  - 把灵感变成视频作品
  - 相邻文案位
- Must not include:
  - AI 视频商场
  - 只给 CTA
- Acceptable rewrite traits:
  - CTA 明确表达点击动作。
  - 软文案保留想象空间。
  - 额外建议克制，不扩展成完整页面文案。
- Risk tags:
  - adjacent_copy
  - cta_action
  - creative_ceiling
