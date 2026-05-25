# Working Principles

This document captures the iteration principles behind PD Copywriter. It exists to keep future changes aligned with the product goal: build a strong open-source Skill for Chinese product UI copy, not a pile of case-specific prompt patches.

## Core Purpose

PD Copywriter should help product managers and designers produce better Chinese product copy across UI, marketing, and explanatory scenarios.

It should improve a strong LLM's product judgment, not merely constrain the model into safe but mediocre copy.

## Principles

### 1. Abstract From Cases

Concrete examples are evidence, not the rule itself.

When a case reveals a pattern, turn it into a general rule that can transfer across products, carriers, and industries.

Bad direction:

> Add a special rule for "success rate copy".

Better direction:

> Add a general rule for factual expression credibility: truth, semantic direction, numeric form, precision, scope, and claim strength.

### 2. Avoid Patchwork Rules

Before adding a rule, ask:

- Does it solve a recurring product-copy problem?
- Does it apply beyond one app, phrase, or component?
- Does it improve judgment without suppressing useful creativity?
- Can it be evaluated with realistic cases?

If the answer is no, keep it as a case note, not a core Skill rule.

### 3. Rules Are Guardrails, Not The Ceiling

The Skill should prevent obvious product-copy failures, but it should also preserve room for strong creative output.

Good output should be clear, usable, scenario-aware, and sometimes surprising in a useful way.

### 4. Context Improves Quality, But Is Not Required

When product docs, PRDs, brand guides, or knowledge bases are available, use them to improve specificity.

When context is limited, still provide a useful first pass and state the key assumptions.

### 5. Solve Unknown Unknowns

If the user asks for one copy slot, think about the underlying product goal.

When appropriate, suggest adjacent high-value copy slots such as title, subtitle, CTA microcopy, empty state, loading text, share card, or watermark.

This should be optional and restrained, not a forced full-page expansion.

### 6. Separate Launch Copy From Sample Copy

Launch-ready copy must not invent factual claims.

Sample copy may use concrete numbers, dates, amounts, and percentages to demonstrate rhythm, visual density, and credibility, but it must be labeled as sample content and should not be presented as real business truth.

### 7. Evaluate Factual Expression Credibility

When copy contains facts, numbers, time, quantity, scope, or promises, evaluate:

- Whether the fact is supported.
- Whether the semantic direction is correct: "increase by" vs "increase to", "up to" vs "guaranteed", "estimated" vs "guaranteed".
- Whether numeric precision fits the scenario.
- Whether the claim needs a time range, sample size, eligibility condition, or source.
- Whether strong words like "best", "only", "guaranteed", "lowest", or "always" are justified.

### 8. Evaluate Against Strong Baselines

The Skill should be compared against strong model outputs, not weak baselines.

Use side-by-side review to judge:

- hard-rule correctness,
- final copy usability,
- product judgment,
- creative ceiling,
- output discipline.

Do not claim victory from exact string matching alone.

### 9. Prefer PM-Ready Output

For generation and rewrite tasks, lead with usable copy. Then explain the reason, tradeoff, or rule.

For simple tasks, stay concise. For complex tasks, structure the response.

### 10. Keep Iterations Usable

Each committed change should leave the project in a coherent, usable state.

Small, tested, explainable commits are preferred over large architectural rewrites.
