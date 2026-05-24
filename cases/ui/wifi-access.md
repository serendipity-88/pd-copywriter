---
title: 星巴克上网密码：按钮用第一人称导致产品角色混乱
product: 星巴克/门店 Wi-Fi
platform: mobile
copy_type: UI
carrier: 表单说明 + CTA
scenario: 门店 Wi-Fi 获取短信密码
source_type: user-provided
source_url:
observed_date: 2026-05-25
confidence: medium
eval_candidate: true
---

# 星巴克上网密码：按钮用第一人称导致产品角色混乱

## Basic Info

- Product: 星巴克/门店 Wi-Fi
- Platform: mobile
- Copy type: UI
- Carrier: 表单说明 + CTA
- Scenario: 门店 Wi-Fi 获取短信密码
- Source: User-provided observation
- Confidence: medium

## Context

用户在门店连接 Wi-Fi，需要输入手机号并接收上网密码。这个场景的核心目标是：

- 让用户知道为什么要填手机号。
- 让用户放心短信不会产生费用。
- 让用户快速完成获取密码动作。

## Original Copy

> 请输入您的手机号码，我们将通过短信的方式向您发送上网密码，中国电信、中国移动和中国联通手机用户可以免费接收短信。

按钮：

> 请把上网密码发给我！

## Diagnosis

- What works:
  - 解释了手机号用途：用于接收上网密码。
  - 补充了短信免费接收信息，试图消除费用顾虑。

- What is risky:
  - 正文过长，把“输入手机号”“短信发送密码”“三大运营商免费接收”全塞进一句话，扫描成本高。
  - “通过短信的方式向您发送”表达冗余，可以压缩为“短信发送”。
  - “中国电信、中国移动和中国联通手机用户”列表过长，可以用“三大运营商用户”概括。
  - 按钮“请把上网密码发给我！”混入第一人称“我”，让产品角色变得奇怪：像用户在请求系统，而不是系统提供明确操作。
  - “请把...”是请求句，不像按钮动作；感叹号也让一个工具性动作显得过度用力。

- Why it matters:
  - Wi-Fi 登录是低耐心场景，用户想快速联网，不想阅读长说明。
  - CTA 应该让用户知道点击后系统会做什么，如“发送密码”或“获取上网密码”。
  - 第一人称按钮在产品界面里容易造成指代混乱，也显得不够专业。

## Rewrite Options

### Option A

> 输入手机号，短信接收上网密码。三大运营商用户可免费接收。

按钮：

> 获取上网密码

Best for: 希望完整保留“免费接收”说明，同时压缩正文。

### Option B

> 上网密码将通过短信发送，接收短信免费。

按钮：

> 发送密码

Best for: 表单上方已有“手机号”标签或占位符时，正文无需重复“输入手机号”。

### Option C

> 输入手机号，免费接收上网密码。

按钮：

> 发送短信

Best for: 页面空间极小，且运营商限制不需要展开说明时。

## Rule Mapping

- Rule: CTA 使用具体动作，避免“请把...给我”式请求句。
- Rule: UI 文案默认避免第一人称“我”。
- Rule: 表单说明优先短、直接、可扫描。
- Rule: 工具性场景慎用感叹号。
- Reference: `skill/references/grammar-templates.md`, `skill/references/function-words-table.md`, `skill/references/copy-style-gallery.md`
- Severity: P1

## PM Takeaway

在低耐心场景里，PM 要把“解释原因”和“推动动作”分开。正文负责消除顾虑，按钮负责触发动作。

“请把上网密码发给我！”有一点口语亲切，但它牺牲了产品界面的角色清晰度。更好的按钮不是替用户说话，而是命名系统即将执行的动作。

## Eval Mapping

- Eval mode: rewrite
- Expected findings:
  - 识别正文过长和冗余。
  - 识别“三大运营商”可概括。
  - 识别按钮第一人称“我”造成角色混乱。
  - 识别按钮不是动作命名。
  - 识别工具性场景感叹号过强。
- Must include:
  - 获取上网密码
  - 发送密码
  - 短信
  - 免费接收
- Must not include:
  - 请把上网密码发给我！
  - 通过短信的方式
- Acceptable rewrite traits:
  - 正文压缩为 1-2 个短句。
  - CTA 使用具体动作。
  - 保留免费接收的顾虑消除。
- Risk tags:
  - pronoun_confusion
  - cta_action
  - form_help_text
