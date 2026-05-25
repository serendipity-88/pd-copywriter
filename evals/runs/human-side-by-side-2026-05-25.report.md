# Human Side-by-Side Eval: Skill vs GPT-5.5 Baselines

Date: 2026-05-25

## Purpose

This report re-evaluates the same 10 cases by manual side-by-side judgment instead of exact string matching.

The question is not "which output matches the eval keywords", but:

> Which version is more useful for a product manager making real UI copy decisions?

## Compared Versions

| Version | Source |
|---|---|
| Skill | `manual-10-2026-05-25.outputs.jsonl` |
| GPT-5.5 prompt-only | `baseline-gpt55-promptonly-10-2026-05-25.raw.md` |
| GPT-5.5 with-context | `baseline-gpt55-10-2026-05-25.raw.md` |

Use `final-copy-comparison-2026-05-25.md` to inspect the raw outputs.

## Rubric

Each case is judged on five dimensions:

| Dimension | What It Tests |
|---|---|
| Hard-rule correctness | Avoids misoperation, false claims, unclear actions, role confusion, factual risk |
| Final copy usability | Can the suggested copy be placed into a product with minimal editing? |
| Product judgment | Does it understand user intent, scenario, carrier, and product consequence? |
| Creative ceiling | Does it add useful ideas the user did not explicitly ask for? |
| Output discipline | Is it concise, scannable, and not over-structured for the task? |

Judgment labels:

- `Skill`: PD Copywriter is better.
- `Prompt`: GPT-5.5 prompt-only is better.
- `Context`: GPT-5.5 with-context is better.
- `Tie`: no meaningful difference.
- `Mixed`: no clean winner; see note.

## Summary

| Outcome | Cases |
|---|---:|
| Skill clear win | 6 |
| Skill slight win / mixed win | 2 |
| Tie or near-tie | 1 |
| Skill exposed a meaningful weakness | 1 |

High-level conclusion:

PD Copywriter is better as a reusable product-copy judgment system. It is stronger at naming rules, keeping final recommendations aligned with product risk, mapping labels to user tasks, and suggesting adjacent copy positions.

GPT-5.5 prompt-only is already strong. It often gives natural, compact, usable wording. In several cases, it is more concise and less system-like than the Skill output.

The current Skill should not be optimized to "beat" GPT-5.5 by adding more rules. It should be optimized to keep its judgment advantage while becoming less verbose and less likely to invent concrete factual claims.

## Case-Level Judgment

### 1. Bank Card Coupon

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Best separation of benefit, threshold, scope, and CTA destination. |
| Final copy usability | Skill | Most directly usable card structure. |
| Product judgment | Skill | Distinguishes "查看可用场景" vs "去使用" by user stage. |
| Creative ceiling | Tie | Creativity is not the core dimension here. |
| Output discipline | Skill | More scannable than both baselines. |

Verdict: Skill clear win.

### 2. Starbucks Wi-Fi Password

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Explicitly catches first-person role confusion and overexcited CTA. |
| Final copy usability | Skill | Provides both "获取上网密码" and "发送密码" variants. |
| Product judgment | Skill | Keeps purpose + free SMS reassurance. |
| Creative ceiling | Tie | Low-creativity utility case. |
| Output discipline | Skill | Scannable and short enough. |

Verdict: Skill clear win.

### 3. Pendo Notes

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Stronger at decomposing empty state, voice inconsistency, and information density. |
| Final copy usability | Skill | Better chunking by UI location. |
| Product judgment | Skill | Converts features into teachable product moments. |
| Creative ceiling | Prompt | Prompt-only adds a useful principle: "短句 + 明确动作 + 直接收益". |
| Output discipline | Skill | Easier to scan than baseline paragraphs. |

Verdict: Skill slight win. Prompt-only contains one useful phrasing principle worth absorbing.

### 4. Bose Settings

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Avoids internal/system terms more consistently. |
| Final copy usability | Skill | "管理设备 / 设备更新 / 通知设置 / 数据与隐私" is the best set. |
| Product judgment | Skill | Best user-task mapping. |
| Creative ceiling | Tie | Not a creative case. |
| Output discipline | Skill | Clean table; directly usable. |

Verdict: Skill clear win.

### 5. Nieka Nickname Dialog

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Strongest on button-as-action and product-specific path. |
| Final copy usability | Context | With-context version includes helpful explanatory copy and "保存昵称". |
| Product judgment | Skill | "开始捏咔" captures the product-specific next step. |
| Creative ceiling | Skill | Gives identity-creation options, not just generic form copy. |
| Output discipline | Skill | Clean variants. |

Verdict: Skill slight win, with-context has a strong directly usable variant.

### 6. TapNow CTA

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Best hard/soft copy separation. |
| Final copy usability | Mixed | Skill is more methodologically correct; with-context gives a fuller hero composition. |
| Product judgment | Skill | Correctly treats the CTA request as under-specified. |
| Creative ceiling | Skill | Adds adjacent copy slots instead of only CTA variants. |
| Output discipline | Prompt | Prompt-only is concise if the user truly only wants CTA. |

Verdict: Skill wins the product judgment. However, the Skill should also provide one polished "recommended composition" so users can judge the final copy, not only the method.

### 7. Withdraw Message Confirmation

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Consistently avoids "撤回 / 取消" and gives "撤回 / 不撤回". |
| Final copy usability | Skill | Best button pair. |
| Product judgment | Skill | Clear rule: button should stand alone. |
| Creative ceiling | Tie | Not needed. |
| Output discipline | Skill | Clear and not overlong. |

Verdict: Skill clear win.

### 8. Three-Step Backup Onboarding

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Skill | Explicitly names negative framing and uses "就能 / 只需 / 即可". |
| Final copy usability | Skill | "3 步就能开启自动备份" is the strongest default. |
| Product judgment | Skill | Best sense of low-friction onboarding. |
| Creative ceiling | Prompt | Prompt-only's "自动保护你的数据" is a useful benefit expansion. |
| Output discipline | Skill | Compact variants. |

Verdict: Skill win, but prompt-only contributes a good benefit-oriented direction.

### 9. Promotional Push

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Mixed | Skill diagnosis is strongest, but its rewrites invent concrete coupon/date facts. |
| Final copy usability | Mixed | Skill's low-pressure option is safest; A/B require real facts. Baselines also keep unsupported urgency. |
| Product judgment | Skill | Best at naming ethics, verifiability, false scarcity, and absolute claims. |
| Creative ceiling | Tie | Creativity should be constrained by truth here. |
| Output discipline | Skill | Clear diagnosis, but final copy needs stricter factual placeholders. |

Verdict: Skill exposes a meaningful weakness. It must not invent factual claims in examples. If facts are missing, it should use placeholders or safe generic rewrites.

### 10. Privacy Protection Toast

| Dimension | Winner | Note |
|---|---|---|
| Hard-rule correctness | Tie | All versions produce "隐私保护已开启". |
| Final copy usability | Tie | Skill and with-context are both usable. |
| Product judgment | Skill | Best diagnosis of pronoun and redundant completion markers. |
| Creative ceiling | Tie | Not relevant. |
| Output discipline | Context | With-context is the most compact. |

Verdict: Near-tie. The base model already handles simple Toast compression well.

## What This Means For The Skill

The Skill is not always "better copy" in the narrow sense. GPT-5.5 sometimes writes more compact and natural responses.

The Skill is better when the task needs:

- reusable rule names,
- product-risk judgment,
- user-task mapping,
- carrier-specific structure,
- deciding whether to add adjacent copy slots.

The Skill is weakest when:

- it exposes too much reasoning for a simple task,
- it produces tables when a direct recommendation would be enough,
- it uses concrete factual examples without verified facts,
- it gives methodologically correct advice but not enough polished final copy.

## Recommended Next Optimizations

1. **Final copy first**
   - For generation and rewrite tasks, output the recommended final copy first.
   - Put diagnosis and rule explanation after the final copy.
   - This makes the Skill feel less like an audit report and more like a PM-ready writing partner.

2. **Do not invent facts**
   - In promotions, prices, dates, inventory, social proof, security claims, and performance claims, never invent concrete numbers.
   - Use placeholders like `[真实券额]`, `[截止日期]`, `[真实库存]`, or choose a generic safe version.

3. **Add one polished composition for adjacent-copy cases**
   - When adding adjacent copy slots, also provide one recommended assembled version.
   - Example for TapNow:
     - 主标题：把灵感变成视频作品
     - 副标题：输入一句想法，让 AI 生成可预览的视频
     - CTA：开始生成视频
     - 微文案：免费体验，生成前可预览

4. **Simple tasks should stay simple**
   - Toast and basic button rewrites should not over-explain.
   - If the task is low-risk and the answer is obvious, give concise variants and one-line rationale.

5. **Absorb useful baseline behavior**
   - From prompt-only baseline, absorb "短句 + 明确动作 + 直接收益".
   - Also absorb benefit expansion when it does not introduce unverified facts, such as "自动保护你的数据" for backup onboarding.

## Score Adjustment

Previous working score: 8.6 / 10.

After this human side-by-side review: 8.5 / 10.

Reason:

- The Skill's advantage is real but narrower than exact-match scoring suggested.
- It is better as a product-copy judgment system, not universally better at every final sentence.
- The promotional Push case revealed a concrete weakness that should be fixed before raising the score again.
