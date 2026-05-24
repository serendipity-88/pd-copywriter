# Candidates Manual Baseline — 2026-05-25

## Scope

This is a manual baseline projection for `evals/candidates.jsonl`.

It is not an independent model run. It estimates how the current `skill/SKILL.md` and references are likely to perform against the 5 case-derived candidates, based on the rules currently present in the skill.

Use this report to prioritize skill improvements before building automated model-based evaluation.

## Summary

| ID | Case | Priority | Score | Judgment |
|---|---|---:|---:|---|
| `pdw-candidate-001` | 银行卡立减金 | P1 | 1 | Likely catches CTA/action and some amount clarity, but weak on promotion-condition hierarchy. |
| `pdw-candidate-002` | 星巴克 Wi-Fi | P1 | 2 | Current rules strongly cover first-person CTA, compression, and action naming. |
| `pdw-candidate-003` | Pendo 清单笔记 | P1 | 1 | Likely catches empty-state length, but weak on multi-fragment voice consistency and progressive disclosure. |
| `pdw-candidate-004` | Bose 设置页 | P1 | 1 | Likely catches terminology issues, but weak on user-task mapping for settings labels. |
| `pdw-candidate-005` | 捏咔昵称弹窗 | P0 | 2 | Current button-as-action rule should catch `ok` as non-action and propose concrete CTAs. |

Average projected score: **1.4 / 2.0**

P0 projected failures: **0**

## Interpretation

The current skill is already strong on classic UI microcopy rules:

- Button-as-action.
- First-person pronoun problems.
- Toast/help-text compression.
- Abstract confirmation labels.
- Basic terminology and redundancy.

The weaker areas are more product-managerial than grammatical:

- Promotion condition hierarchy.
- Settings labels as user tasks.
- Multi-fragment onboarding and progressive disclosure.
- App/product-tone consistency across several copy fragments.

This supports the earlier diagnosis: the original framework is right, but the next improvements should make product-context judgment more explicit.

## Case Notes

### `pdw-candidate-001`: 银行卡立减金

Projected score: **1**

Current skill likely catches:

- `去看看` is a weak CTA because it does not clearly name the action.
- `5.0元` can be treated as awkward numeric formatting.
- Payment/benefit copy should avoid ambiguity.

Likely misses or underweights:

- The difference between discount cap and usage threshold.
- The contradiction in `通用场景（部分场景除外）`.
- The need to distinguish `查看可用场景` from `去使用` based on user position in the payment flow.

Improvement implication:

- Add a promotion/benefit-condition rule: separate amount, threshold, eligible instrument, eligible scenario, and CTA destination.

### `pdw-candidate-002`: 星巴克 Wi-Fi

Projected score: **2**

Current skill strongly covers:

- UI should avoid first-person `我`.
- CTA should name system action.
- `通过短信的方式` is redundant.
- Form/help text should be compressed.
- Tool-like UI scenarios should avoid excessive exclamation.

Expected good rewrites:

- `输入手机号，短信接收上网密码。三大运营商用户可免费接收。`
- CTA: `获取上网密码` or `发送密码`

Improvement implication:

- This candidate is close to golden-ready after one real model run.

### `pdw-candidate-003`: Pendo 清单笔记

Projected score: **1**

Current skill likely catches:

- Empty-state copy is too long.
- Feature intro is overloaded.
- Onboarding should use low-friction framing.
- Examples are often better than abstract rules.

Likely misses or underweights:

- The case contains multiple fragments, so the skill may produce a scattered critique instead of a clear product-level diagnosis.
- `voice consistency across a flow` is present but not operational enough.
- The skill does not yet clearly separate novice onboarding copy from advanced-help copy.

Improvement implication:

- Add a progressive-disclosure rule for feature education:
  - first-run hint,
  - inline example,
  - advanced rule/help doc.
- Consider splitting this candidate into 2-3 smaller evals before promoting.

### `pdw-candidate-004`: Bose 设置页

Projected score: **1**

Current skill likely catches:

- `数据首选项` is translation-like and unclear.
- Terminology should be consistent.
- Labels should be short.

Likely misses or underweights:

- `产品列表` is an internal-object label, while users think in terms of `设备`.
- `固件更新` may be technically correct but user-facing label can be `设备更新`.
- The distinction between entry labels, subtext, and toggle labels is not explicit enough.

Improvement implication:

- Add a settings-label rule:
  - top-level entry = user task,
  - subtext = scope/what changes,
  - toggle label = concrete setting noun phrase.

### `pdw-candidate-005`: 捏咔昵称弹窗

Projected score: **2**

Current skill strongly covers:

- `ok` is not a concrete action.
- Buttons should express what happens next.
- English `OK` only fits limited English/interface contexts.
- Onboarding/identity creation can use warmer phrasing without sacrificing clarity.

Expected good rewrites:

- `给自己取个昵称` + `保存昵称`
- `先取个昵称吧` + `开始捏咔`
- `昵称怎么叫？` + `确认昵称`

Improvement implication:

- This is the best first candidate to promote after a real model run, because the expected judgment is stable and P0-worthy.

## Recommended Next Improvements

1. Add a `promotion-condition` rule reference for coupons, discounts, cards, eligibility, and CTA destination.
2. Add a `settings-labels` rule reference for user-task naming in settings pages.
3. Add a progressive-disclosure section for feature education and onboarding copy.
4. Strengthen `voice consistency` as an evaluable rule, not just a style preference.
5. Run a real model-based baseline once the eval runner exists.
