# GPT-5.5 Baseline Comparison

Date: 2026-05-25

## Goal

Compare the current PD Copywriter Skill run against GPT-5.5 without the Skill.

The purpose is not to prove that the base model is weak. GPT-5.5 is already a very strong general model. The question is whether PD Copywriter adds stable product-copy judgment beyond a strong model's default behavior.

## Method

Three artifacts were produced:

| Run | File | Input |
|-----|------|-------|
| Skill run | `manual-10-2026-05-25.outputs.jsonl` | Current Skill-informed outputs |
| Baseline A | `baseline-gpt55-promptonly-10-2026-05-25.outputs.jsonl` | Same 10 user prompts, no Skill mention, no eval context |
| Baseline B | `baseline-gpt55-10-2026-05-25.outputs.jsonl` | Same 10 prompts plus eval context |

Baseline A is the main comparison because it best represents a user asking GPT-5.5 directly. Baseline B is a generous baseline and is useful for checking whether extra product context narrows the gap.

Both baselines were run with a fresh non-interactive Codex execution:

- model: `gpt-5.5`
- workdir: `/tmp`
- no repository files read
- prompt explicitly said there was no dedicated Skill or project rule library

## Exact Regression Check

The current string-based scorer checks whether outputs contain expected terms and avoid forbidden terms. This is useful for regression, but it is not a full quality judge.

| Run | Auto-pass |
|-----|----------:|
| Skill run | 10/10 |
| Baseline A: prompt-only | 0/10 |
| Baseline B: with context | 0/10 |

Interpretation:

- Do not read baseline `0/10` as "the writing is unusable".
- It means the naked model often did not use the exact expected rule language or exact target phrases.
- The Skill run is much more aligned with the evaluation spec.

## Manual Comparison Summary

Prompt-only GPT-5.5 baseline is competent. It catches many obvious issues: verbosity, unclear CTA, ethical overclaim, and some terminology problems.

PD Copywriter is stronger in four areas:

1. **Rule naming and transferability**
   - Baseline says "按钮不够具体".
   - Skill says "按钮即动作", then applies it consistently.
   - This matters because PMs can reuse a named rule across future reviews.

2. **Final recommendation discipline**
   - Baseline often diagnoses correctly but leaves a weaker recommendation in the rewrite.
   - Example: destructive confirmation still includes "撤回 / 取消"; promotion rewrite still uses "优惠今天结束" or "库存不多".
   - Skill more consistently removes the risky pattern from final copy.

3. **User-task mapping**
   - Baseline improves labels but sometimes keeps technical/system framing: "产品管理", "固件更新", "自动在后台更新".
   - Skill maps to user tasks: "管理设备", "设备更新", "通知设置", "数据与隐私".

4. **Adjacent-copy judgment**
   - Prompt-only baseline for TapNow mostly answered the CTA request: "立即生成视频", "用 AI 创建视频", "开始免费生成".
   - Skill answered CTA and also separated soft/hard copy slots: main title, subtitle, CTA, CTA microcopy.
   - This is the clearest evidence for the new "unknown unknown" capability.

## Case-Level Notes

| Case | Baseline A behavior | Skill advantage |
|------|---------------------|----------------|
| `pdw-candidate-001` Payment coupon | Good diagnosis, but keeps "通用场景可用，部分场景除外" in one rewrite | Cleaner hierarchy and CTA destination |
| `pdw-candidate-002` Wi-Fi SMS | Good compression, misses first-person role-confusion framing | More precise CTA/action diagnosis |
| `pdw-candidate-003` Pendo | Good general cleanup | Skill is more structured around empty state, density, example-based teaching |
| `pdw-candidate-004` Bose settings | Partially improves labels, still technical | Better user-task labels |
| `pdw-candidate-005` Nickname | Fixes `ok`, but CTA remains generic "保存/完成" | Better identity-creation options and product-specific path |
| `pdw-candidate-006` TapNow CTA | Mostly only gives CTA variants | Adds adjacent soft copy slots |
| `pdw-v0-001` Withdraw confirm | Diagnoses issue, but still gives "撤回 / 取消" in one rewrite | Consistently applies "撤回 / 不撤回" |
| `pdw-v0-003` Framing | Understands "才能" pressure | Skill explicitly uses positive framing variants like "就能/只需" |
| `pdw-v0-006` Push ethics | Catches overclaim, but rewrite still invents urgency | Skill avoids unverifiable scarcity and absolute claims |
| `pdw-v0-008` Toast | Strong baseline | Gap is small; base model already handles this well |

## Score Update

Before comparison: 8.4 / 10.

After comparison: 8.6 / 10.

Reason:

- The Skill demonstrates meaningful lift over GPT-5.5 on the cases it is designed for.
- The largest lift appears in product-specific judgment, rule consistency, and adjacent-copy suggestions.
- Some simple cases, especially Toast compression, are already handled well by GPT-5.5, so the Skill does not create equal lift everywhere.

Why not 9:

- The Skill run is still not a fully blind installed-Skill execution.
- The comparison set is only 10 cases.
- The judge is still partly manual and partly exact-string based.
- There is no validated LLM-as-judge rubric yet.

## Product Conclusion

PD Copywriter does not merely make GPT-5.5 "write nicer copy".

It changes the behavior from:

> answer the requested copy

to:

> diagnose the product-copy problem, apply reusable rules, and suggest adjacent copy opportunities when the user under-specifies the need.

That is the core product value.
