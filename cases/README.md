# Case Library

This directory collects human-readable cases for Chinese product microcopy.

Cases are not prompts. They are small pieces of product judgment: what appeared in the interface, why it worked or failed, what could be changed, and what a PM should learn from it.

## Directory Plan

```text
cases/
├── README.md
├── template.md
├── ui/
│   ├── buttons.md
│   ├── error-messages.md
│   ├── empty-states.md
│   ├── dialogs.md
│   └── permissions.md
├── mkt/
│   ├── push.md
│   ├── membership.md
│   └── promotions.md
├── exp/
│   ├── rules.md
│   ├── help-docs.md
│   └── compliance.md
└── apps/
    ├── wechat.md
    ├── alipay.md
    ├── taobao.md
    ├── pinduoduo.md
    ├── douyin.md
    ├── xiaohongshu.md
    ├── meituan.md
    ├── jd.md
    ├── ctrip.md
    ├── amap.md
    ├── dingtalk.md
    └── doubao.md
```

Create subdirectories only when they contain real cases. The list above is a roadmap, not a requirement to create empty files.

## Case Types

- `UI`: buttons, dialogs, Toast, forms, empty states, permissions, success/error feedback.
- `MKT`: Push, SMS, banners, membership upsell, promotions, retention prompts.
- `EXP`: help docs, rules, agreements, legal copy, compliance explanations.
- `MIXED`: full pages or flows that include multiple copy types.

## Seed Cases

- [银行卡立减金卡片：优惠信息堆叠但行动不清](ui/payment-coupons.md)
- [星巴克上网密码：按钮用第一人称导致产品角色混乱](ui/wifi-access.md)
- [Pendo 清单笔记：功能介绍文案过载且语气不统一](ui/pendo-notes.md)
- [Bose 音乐我的页：设置项标签像系统字段而不是用户任务](ui/bose-settings.md)
- [捏咔昵称弹窗：CTA 写 OK 让操作意图缺失](ui/nieka-nickname-dialog.md)
- [TapNow CTA：单个按钮请求也应补全高价值相邻文案位](ui/tapnow-adjacent-copy.md)

## What Makes A Good Case

A good case is:

- Short enough to understand quickly.
- Specific about product, scenario, carrier, and user intent.
- Explicit about what is good or risky.
- Connected to a reusable rule.
- Honest about confidence and source limitations.

## Case To Eval

Not every case should become an eval. Convert a case into `evals/golden-*.jsonl` only when it has a stable expected judgment.

Good eval candidates:

- The original copy has a clear issue.
- The expected finding is not subjective taste only.
- The rewrite requirements can be checked by traits.
- The case covers an important rule or regression risk.

Weak eval candidates:

- Purely inspirational copy.
- Highly brand-specific jokes.
- Cases where multiple contradictory interpretations are equally valid.

## Source Rules

- Keep quotes short.
- Link public sources.
- Do not mirror full articles.
- Do not bulk-copy screenshot libraries.
- For live app observations, record app version/date when possible.
- For reconstructed examples, mark them as synthetic or reconstructed.

## Template

Use [template.md](template.md) when adding a new case.
