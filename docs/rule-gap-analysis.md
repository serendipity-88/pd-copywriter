# Rule Gap Analysis

This document captures rule gaps discovered from real cases and decides where each gap belongs.

Principle: do not create a new reference for every concrete case. Promote a case insight into the skill only when it generalizes across products, carriers, or workflows.

## Abstraction Rule

Before adding a rule, answer:

1. Is this only about one product, or does it apply across many products?
2. Is this only about one phrase, or does it reveal a reusable copy decision?
3. Does the rule help PMs make better product decisions, not just prettier sentences?
4. Can the rule be evaluated with cases?
5. Does an existing reference already have the right home?

If the answer to 5 is yes, extend the existing reference instead of adding a new file.

## Current Gaps From User Cases

| Case | Surface Problem | General Rule Gap | Where It Belongs | Action |
|---|---|---|---|---|
| 银行卡立减金 | 优惠条件堆叠、CTA 模糊 | Benefit/offer copy needs clear information hierarchy | `skill/references/scene-templates.md` CTA/卖点 | Add benefit information hierarchy and CTA destination rules |
| 星巴克 Wi-Fi | 说明过长、按钮第一人称 | Covered by existing form/help text, pronoun, and button-as-action rules | Existing references | No new rule needed yet |
| Pendo 清单笔记 | 功能说明过载、语气不统一 | Feature education needs progressive disclosure by learning stage | `skill/references/flow-templates.md` | Add feature-education layering rules |
| Bose 设置页 | 标签像系统字段 | Navigation/settings labels should name user tasks, not internal modules | `skill/references/grammar-templates.md` terminology/tag section | Add entry-label and settings-label rules |
| 捏咔昵称弹窗 | CTA `ok` | Covered by button-as-action and localization rules | Existing references | No new rule needed yet |

## Gap 1: Benefit / Offer Clarity

Do not treat this as a bank-card coupon rule. The general rule applies to:

- Coupons.
- Payment discounts.
- Membership benefits.
- Free trials.
- Shipping benefits.
- Point redemption.
- New-user packs.
- Activity rewards.

The reusable judgment:

Offer copy must separate:

- Benefit amount.
- Threshold.
- Eligible user/item/card/channel.
- Eligible scenario.
- Time limit.
- Exceptions.
- CTA destination.

Bad copy often collapses these into one line, causing users to misunderstand whether a number is a discount, a threshold, or a condition.

## Gap 2: Settings / Entry Labels

Do not treat this as a Bose-specific translation issue. The general rule applies to:

- Settings pages.
- Account pages.
- Device management pages.
- Navigation entries.
- B-side configuration pages.
- Permission and preference pages.

The reusable judgment:

Top-level entries should name user tasks or user-recognizable objects, not internal modules or database-like fields.

Examples:

- `产品列表` → `管理设备`
- `固件更新` → `设备更新`
- `数据首选项` → `数据与隐私`

## Gap 3: Feature Education / Progressive Disclosure

Do not treat this as a Pendo-specific writing style problem. The general rule applies to:

- New feature intros.
- Empty-state education.
- Tooltips.
- First-run onboarding.
- Advanced command explanations.
- Help docs.

The reusable judgment:

Feature education should match the user's learning stage:

- First exposure: value + one low-friction action.
- In-context hint: one concrete action or example.
- Advanced feature: example before rule.
- Help doc: full syntax, exceptions, and edge cases.

If a product explains command grammar in first-run UI, the copy is probably carrying too much product complexity.

## Non-Gaps

Some cases do not need new rules:

- First-person CTA such as `发给我`: already covered by pronoun and button-as-action rules.
- `ok` CTA: already covered by button-as-action and localization rules.
- Overlong help text: already covered by carrier limits and form/help text rules.

These can remain eval cases without changing the rule system.

## Design Implication

The next skill changes should be additive and abstract:

1. Extend CTA/卖点 with benefit information hierarchy.
2. Extend terminology/tag rules with user-task entry labels.
3. Extend flow templates with feature education layering.

Do not add narrow files such as `bank-card-coupons.md`, `bose-settings.md`, or `pendo-rules.md`.
