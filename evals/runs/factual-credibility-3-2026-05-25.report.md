# Factual Credibility Mini Eval - 2026-05-25

## Objective

This run checks whether the new factual-expression rules improve PD Copywriter's behavior on a narrow but important boundary:

- Do not invent factual claims for launch-ready copy.
- Allow concrete sample copy when it helps PMs feel visual rhythm and credibility.
- Clearly mark sample numbers/dates/amounts as illustrative and replace-before-launch.
- Distinguish estimated statements from hard promises.

The comparison uses three new candidate cases:

- `pdw-candidate-007`: promotion Push without real discount/date/inventory data.
- `pdw-candidate-008`: ambiguous metric copy, "成功率提升99%".
- `pdw-candidate-009`: delivery ETA copy, "30分钟必达".

## Method

Two outputs were compared:

- Skill-guided run: `factual-credibility-3-2026-05-25.skill.outputs.jsonl`
- GPT-5.5 prompt-only baseline: `factual-credibility-3-2026-05-25.gpt55-promptonly.outputs.jsonl`

The automatic scorer is conservative and pattern-based. It is useful for catching missing required phrases and forbidden phrases in rewrite regions, but it can over-flag diagnostic quotations or spacing differences. Human notes are therefore included for this mini run.

## Score Summary

| Run | Auto-pass | Human assessment |
| --- | ---: | --- |
| PD Copywriter Skill | 2/3 | 3/3 pass |
| GPT-5.5 prompt-only | 0/3 | 1 strong pass, 2 partial passes |

Important caveat: GPT-5.5 prompt-only scored `0/3` automatically partly because it does not follow the Skill's output sections and quotes original risky phrases in diagnosis. The more meaningful comparison is the human assessment below.

## Case Findings

### pdw-candidate-007 - Promotion Push Without Real Facts

PD Copywriter:

- Correctly separates `可上线文案` from `示例文案`.
- Uses concrete examples only under "示例数字仅示意，需替换为真实数据".
- Reminds the PM to verify coupon amount, threshold, deadline, applicable scope, and inventory/price proof.

GPT-5.5 prompt-only:

- Correctly avoids invented discount amount, deadline, inventory, and "全网最低".
- Produces usable safe Push copy.
- Does not provide a concrete sample version, so the PM gets less help judging number shape, visual rhythm, and final UI feel.

Conclusion: Skill wins on product-delivery structure, while GPT-5.5 is already competent on basic factual caution.

### pdw-candidate-008 - Metric Semantics

PD Copywriter:

- Identifies "提升99%" as semantically ambiguous.
- Distinguishes "提升至" and "由 A 提升至 B".
- Provides a safe launch-ready version without invented metrics.
- Provides sample numeric forms marked as illustrative and replace-before-launch.
- Asks for metric口径.

GPT-5.5 prompt-only:

- Also identifies the "提升99%" vs "提升至99%" issue.
- Gives good口径 advice.
- Uses sample numbers and placeholders, but does not explicitly label them as illustrative/replace-before-launch.

Conclusion: This is close. GPT-5.5 has strong native judgment here, but the Skill is more explicit about sample-vs-launch boundary.

### pdw-candidate-009 - ETA vs Promise

PD Copywriter:

- Correctly treats "必达" as a hard commitment.
- Uses "预计 30 分钟送达" and "约 30 分钟送达".
- Allows stronger commitment only when赔付 or履约机制 exists.

GPT-5.5 prompt-only:

- Also correctly identifies "必达" as a strong promise.
- Recommends "预计/约/左右".
- Mentions that hard commitment requires scope and超时规则.

Conclusion: Tie. GPT-5.5 already handles this case well.

## Overall Conclusion

The new factual-expression rules are working, but their advantage is not "the base model cannot reason." GPT-5.5 can reason well on these examples.

The Skill's real improvement is making the expert behavior stable:

- It consistently separates launch-ready copy from sample copy.
- It gives PMs concrete examples without silently converting examples into facts.
- It makes verification requirements visible.
- It preserves useful specificity while preventing unsupported promises.

This is the right direction for PD Copywriter: the Skill should not lower the model's creative ceiling. It should make strong product-copy judgment repeatable, auditable, and safer to apply in real UI work.

## Next Optimization

The next high-leverage improvement is to make the eval scorer less format-sensitive:

- Treat diagnosis quotations differently from final rewrite content.
- Normalize spacing such as `30分钟` and `30 分钟`.
- Add explicit scoring dimensions for "sample-vs-launch separation" instead of relying only on required phrases.

This will make future comparisons against strong baseline models fairer and more useful.
