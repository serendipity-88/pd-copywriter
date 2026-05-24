---
title: 捏咔昵称弹窗：CTA 写 OK 让操作意图缺失
product: 捏咔
platform: mobile
copy_type: UI
carrier: 弹窗 + CTA
scenario: 填写昵称
source_type: user-provided
source_url:
observed_date: 2026-05-25
confidence: medium
eval_candidate: true
---

# 捏咔昵称弹窗：CTA 写 OK 让操作意图缺失

## Basic Info

- Product: 捏咔
- Platform: mobile
- Copy type: UI
- Carrier: 弹窗 + CTA
- Scenario: 填写昵称
- Source: User-provided observation
- Confidence: medium

## Context

用户在游戏/创作产品里被要求填写昵称。这个场景通常不是严肃表单，而是身份创建的一部分。文案应该让用户知道为什么需要昵称，以及点击按钮后会提交、保存还是继续。

## Original Copy

> 请填写昵称

CTA:

> ok

## Diagnosis

- What works:
  - 标题直接说明当前任务：填写昵称。
  - 句子短，没有过度解释。

- What is risky:
  - “请填写昵称”是命令式表单语言，能用，但缺少产品温度。对游戏/创作产品来说，可以更像身份创建。
  - CTA “ok”过于抽象，不说明点击后会发生什么。
  - “ok”大小写不规范，中文界面中也显得像临时占位或未本地化文案。
  - 如果用户还没填写昵称，按钮状态或提示需要更明确，例如未填时禁用或提示“昵称不能为空”。

- Why it matters:
  - 昵称是用户身份的一部分，不只是一个字段。
  - 游戏/创作产品的第一步身份创建会影响用户代入感。
  - CTA 应该命名动作，例如“保存昵称”“开始创作”“进入捏咔”，而不是只写确认词。

## Rewrite Options

### Option A

> 给自己取个昵称

按钮：

> 保存昵称

Best for: 只完成昵称保存，不进入下一步核心玩法。

### Option B

> 先取个昵称吧

按钮：

> 开始捏咔

Best for: 昵称填写后直接进入产品主流程。

### Option C

> 昵称怎么叫？

按钮：

> 确认昵称

Best for: 更轻松的游戏/社区语气，但仍保留明确动作。

## Rule Mapping

- Rule: 按钮要表达动作，避免 OK/确定等抽象确认词。
- Rule: 中文界面避免未本地化的临时英文 CTA。
- Rule: 游戏/创作产品可适当提高 WARMTH，但不能牺牲动作清晰。
- Reference: `skill/references/verb-matrix.md`, `skill/references/scene-templates.md`, `skill/references/style-presets.md`
- Severity: P0 for CTA, P1 for tone.

## PM Takeaway

“OK”不是文案，是占位符。尤其在昵称、头像、角色这类身份创建场景里，按钮不应该只是确认用户填了字段，而要告诉用户下一步会发生什么。

如果点击后进入产品主流程，就写“开始捏咔”；如果只是保存，就写“保存昵称”。按钮文案的本质是承诺结果。

## Eval Mapping

- Eval mode: rewrite
- Expected findings:
  - 识别 OK/ok 不是动作。
  - 识别中文界面未本地化问题。
  - 建议 CTA 根据后续结果改为“保存昵称”“确认昵称”或“开始捏咔”。
- Must include:
  - 按钮即动作
  - 保存昵称
  - 开始捏咔
- Must not include:
  - ok
  - OK
- Acceptable rewrite traits:
  - 标题更贴近游戏/创作语气。
  - CTA 表达点击结果。
  - 不过度解释。
- Risk tags:
  - button_action
  - localization
  - onboarding
