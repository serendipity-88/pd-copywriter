# Core Regression 10 - Skill vs GPT-5.5 Prompt-only

Date: 2026-05-25

## Objective

This run compares `PD Copywriter` against GPT-5.5 prompt-only on 10 representative product-copy tasks.

The goal is not to prove that the Skill always writes prettier copy. The goal is to test whether the Skill makes product-copy judgment more stable, explicit, and reusable across common PM scenarios.

## Case Set

The 10-case set mixes v0 golden cases and user/discussion-derived candidate cases:

| ID | Focus |
| --- | --- |
| `pdw-v0-001` | Button-as-action in destructive confirmation |
| `pdw-v0-002` | Toast length and redundancy |
| `pdw-v0-006` | False scarcity and unverifiable promotion claims |
| `pdw-v0-009` | Empty state with brand tone |
| `pdw-v0-010` | B-side URL error message |
| `pdw-v0-023` | Full Web hero/page mode |
| `pdw-candidate-001` | Payment coupon hierarchy and CTA |
| `pdw-candidate-004` | Settings labels and user-task mapping |
| `pdw-candidate-006` | TapNow CTA plus adjacent soft copy |
| `pdw-candidate-007` | Launch-ready vs sample copy for unsupported promotion facts |

## Method

Two GPT-5.5 runs were compared:

- Skill-guided: GPT-5.5 was asked to read `skill/SKILL.md` and run the cases with PD Copywriter.
- Prompt-only baseline: GPT-5.5 received the same case prompts and contexts, but no Skill files or repository context.

Artifacts:

- Cases: `core-regression-10-2026-05-25.cases.jsonl`
- Skill raw: `core-regression-10-2026-05-25.skill.raw.md`
- Skill JSONL: `core-regression-10-2026-05-25.skill.outputs.jsonl`
- GPT-5.5 raw: `core-regression-10-2026-05-25.gpt55-promptonly.raw.md`
- GPT-5.5 JSONL: `core-regression-10-2026-05-25.gpt55-promptonly.outputs.jsonl`

## Score Summary

| Run | Auto-pass | Human score |
| --- | ---: | ---: |
| PD Copywriter Skill | 10/10 | 20/20 |
| GPT-5.5 prompt-only | 3/10 | 19/20 |

Important caveat: automatic scoring is keyword and region based. It is useful for regression checks, but it under-scores strong baseline answers when they use semantically valid wording that differs from exact expected phrases. Human assessment is the more meaningful comparison in this run.

## Case-Level Comparison

| ID | Human result | What changed with Skill |
| --- | --- | --- |
| `pdw-v0-001` | Both strong | Skill names the principle as button-as-action and gives `撤回 / 不撤回` directly. Baseline adds a useful product caveat about possible撤回提示, which is worth remembering. |
| `pdw-v0-002` | Tie | Both compress the Toast well and move next-step guidance out of the Toast. |
| `pdw-v0-006` | Tie | Both avoid unsupported scarcity and price claims. Skill frames it as ethics/verification more explicitly. |
| `pdw-v0-009` | Tie, slight baseline creativity edge | Both improve tone and add action. Baseline adds illustration guidance; Skill provides clearer variant selection. |
| `pdw-v0-010` | Tie | Both provide clear B-side error guidance. Skill gives more structured variants and button suggestions. |
| `pdw-v0-023` | Tie, slight Skill structure edge | Both complete all page sections. Skill's CTA `开始写一份初稿` is more action-specific than baseline `开始写作`. |
| `pdw-candidate-001` | Tie | Both clarify amount, threshold, scope, and CTA. Skill is more systematic about hierarchy. |
| `pdw-candidate-004` | Tie | Both map settings labels to user tasks. Skill gives two density levels: concise labels and expanded descriptions. |
| `pdw-candidate-006` | Skill slight edge | Both go beyond the CTA. Skill explicitly separates hard CTA from soft adjacent copy and preserves `把灵感变成视频作品`, closer to the project's expert behavior target. |
| `pdw-candidate-007` | Skill clear edge | Baseline avoids unsupported facts but does not explicitly separate launch-ready copy from illustrative sample copy. Skill provides `可上线文案`, sample copy, and data replacement disclaimer. |

## Main Finding

GPT-5.5 prompt-only is already very strong. On many isolated UI copy tasks, it gives usable answers without the Skill.

The Skill's value is not "making a weak model smart." Its value is turning good product-copy instincts into a stable operating protocol:

- It names the product-copy principle instead of only rewriting.
- It separates hard UI copy from soft adjacent copy.
- It makes factual boundaries explicit.
- It produces reusable structures PMs can apply across cases.
- It reduces the chance that a good answer depends on lucky model behavior.

## Where Skill Is Clearly Better

1. **Factual copy boundary**

Skill separates launch-ready copy from illustrative sample copy and marks sample facts as replace-before-launch. This is a real differentiator.

2. **Adjacent-copy thinking**

In the TapNow case, Skill does what we want an expert agent to do: user asks for CTA, but the output also proposes headline and microcopy because the underlying product goal needs them.

3. **Reusable product reasoning**

Skill outputs principles like button-as-action, user-task mapping, ethics boundary, and carrier constraint. This helps PMs learn, not just copy text.

## Where Baseline Is Competitive Or Better

1. **Natural creativity on light UI tasks**

Baseline sometimes writes more natural, less procedural variants, especially in empty state and brand-tone tasks.

2. **Incidental product caveats**

In the撤回 case, baseline noticed that some products show a撤回提示. The Skill output did not mention this. This suggests the Skill should allow product-system caveats when they materially affect copy truth.

3. **Conciseness**

Skill can be verbose. Repeated "推断为...请确认" is helpful for audit, but may feel heavy for simple one-off tasks.

## Next Optimization

The next high-leverage Skill improvement is **output density control**:

- For small UI tasks, default to a compact answer: `诊断要点 + 推荐文案 + 1 个备选`.
- For higher-risk or ambiguous tasks, keep the full structured protocol.
- Keep adjacent-copy suggestions, but label them as optional and avoid expanding into a mini page unless the scenario truly needs it.

This preserves the Skill's expert behavior without making every answer feel like a long audit report.

## Secondary Eval Follow-up

The scorer should eventually support semantic equivalents, such as:

- `无法访问` ~= `不可用`
- `暂不撤回` ~= `不撤回`
- "误导性稀缺" ~= "虚假稀缺"

For now, human review remains necessary for side-by-side model comparison.
