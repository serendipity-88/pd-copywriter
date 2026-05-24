---
title: Bose 音乐我的页：设置项标签像系统字段而不是用户任务
product: Bose 音乐
platform: mobile
copy_type: UI
carrier: 我的页/设置页标签
scenario: 设备与偏好设置
source_type: user-provided
source_url:
observed_date: 2026-05-25
confidence: medium
eval_candidate: true
---

# Bose 音乐我的页：设置项标签像系统字段而不是用户任务

## Basic Info

- Product: Bose 音乐
- Platform: mobile
- Copy type: UI
- Carrier: 我的页/设置页标签
- Scenario: 设备与偏好设置
- Source: User-provided observation
- Confidence: medium

## Context

“我的”页面和设置页的文案不需要有强创意，但需要让用户快速判断入口的用途。标签如果太像内部字段，会让用户不知道点击后是查看信息、执行操作，还是进入设置。

## Original Copy

> 产品列表 - 添加或移除

> 固件更新 - 后台升级

> 偏好设置 - 允许推送通知 / 允许应用内消息 / 数据首选项

## Diagnosis

- What works:
  - 信息分类方向基本清楚：设备、固件、通知、数据。
  - “添加或移除”覆盖了设备管理的两个常见动作。

- What is risky:
  - “产品列表”偏内部系统视角。用户通常管理的是“设备”或“耳机/音箱”，不是“产品列表”。
  - “添加或移除”像功能说明，不像入口名称。作为页面标签可以更任务化，例如“管理设备”。
  - “固件更新 - 后台升级”两个词都偏技术。“固件”对普通用户不够友好，“后台升级”也没有说明用户能做什么。
  - “允许推送通知”“允许应用内消息”作为设置项可以，但如果放在偏好设置下，可能应该呈现为可开关的具体项，而不是入口文案。
  - “数据首选项”偏机器翻译或英文直译，用户不容易理解是隐私、个性化、使用数据还是分析数据。
  - 同一页里的标签有的像入口，有的像开关，有的像技术名词，信息层级不统一。

- Why it matters:
  - 设置页是高频低耐心场景，用户往往带着明确任务进入：连设备、更新、关通知、改数据权限。
  - 标签应该映射用户任务，而不是映射系统模块。
  - 技术品牌可以专业，但专业不等于用内部术语。

## Rewrite Options

### Device Management

> 管理设备

Subtext:

> 添加或移除你的 Bose 产品

Best for: 入口层级，用户先理解“我要管理设备”。

### Firmware Update

> 设备更新

Subtext:

> 检查并安装最新版本

Best for: 面向普通用户，弱化“固件”技术感。

### Notifications

> 通知

Options:

> 推送通知  
> 应用内消息

Best for: 偏好设置里的开关项，保持名词短标签。

### Data Preferences

> 数据与隐私

Subtext:

> 管理个性化和使用数据设置

Best for: 数据相关入口，降低“数据首选项”的直译感。

## Rule Mapping

- Rule: 设置页标签应面向用户任务，而不是内部模块。
- Rule: 技术词要按目标用户理解能力降噪。
- Rule: 同一页面内入口、说明、开关要保持层级一致。
- Reference: `skill/references/grammar-templates.md`, `skill/references/diagnostic-checklist.md`
- Severity: P1

## PM Takeaway

设置页文案最容易被当成“翻译字段”处理，但这正是体验损耗的来源。PM 写设置项时要问：用户进来是想完成什么任务？如果用户说不出“数据首选项”是什么，这个词就不应该单独成为入口。

## Eval Mapping

- Eval mode: rewrite
- Expected findings:
  - 识别“产品列表”偏内部视角。
  - 识别“固件/后台升级”技术感过强。
  - 识别“数据首选项”直译感和含义模糊。
  - 建议按用户任务重命名入口。
- Must include:
  - 管理设备
  - 设备更新
  - 数据与隐私
- Must not include:
  - 产品列表
  - 后台升级
  - 数据首选项
- Acceptable rewrite traits:
  - 标签短。
  - 子说明解释范围。
  - 入口和开关层级清楚。
- Risk tags:
  - settings
  - terminology
  - user_task
  - translationese
