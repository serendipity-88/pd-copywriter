# Eval Methodology

`PD Copywriter` needs evals because copy quality can otherwise drift silently. A rewrite may look smoother while losing a critical rule such as button-as-action, verified scarcity, or constructive error guidance.

The eval system has three layers:

```text
cases/*.md
  ↓
evals/candidates.jsonl
  ↓
evals/golden-v*.jsonl
```

## Layer 1: Cases

`cases/` stores human-readable examples. Cases teach judgment and preserve context.

A case may come from:

- User-provided product observations.
- Public articles.
- Public design systems.
- Public datasets.
- Synthetic examples created to isolate one rule.

Cases are allowed to be nuanced, messy, and narrative. They do not need to be directly runnable.

## Layer 2: Candidates

`evals/candidates.jsonl` stores structured eval candidates extracted from cases.

Candidates are not stable regression tests yet. They are a staging area for examples that look useful but still need validation.

Use candidates when:

- The case has a clear expected judgment.
- The original copy is short enough to fit into a prompt.
- The expected findings can be checked without requiring one exact rewrite.
- The case tests a rule we care about.

Do not use candidates for:

- Purely inspirational copy.
- Highly subjective brand taste.
- Long multi-screen flows without a clear target.
- Cases that require screenshots to understand but do not include enough text context.

## Layer 3: Golden Evals

`evals/golden-v*.jsonl` stores stable regression baselines.

A candidate can be promoted to golden only when:

1. The expected issue is stable across reviewers.
2. The prompt is clear without hidden context.
3. The `must_include` and `must_not_include` checks are meaningful.
4. The case covers a high-value rule or known regression risk.
5. The current skill has been run against it at least once and the result has been reviewed.

Golden evals should change slowly. If a golden case needs large edits, consider replacing it with a new case ID instead of mutating history.

## Priority Levels

### P0

Failures that can cause user harm, trust damage, serious misunderstanding, or direct violation of core product-copy rules.

Examples:

- CTA does not express a destructive action.
- Fake scarcity or unverifiable claim.
- Compliance or financial copy becomes misleading.
- Error copy blocks recovery.

### P1

Important quality issues that increase cognitive load, reduce trust, or make the product feel less professional.

Examples:

- Settings labels use internal terminology.
- Help text is too long for the carrier.
- Product voice is inconsistent in one flow.
- Marketing CTA is unclear.

### P2

Polish, voice, rhythm, and nuanced brand fit.

Examples:

- Could be warmer.
- Rhythm is clunky but understandable.
- Stronger product personality is possible.

## Scoring

Use 0-2 scoring for each case:

- `2`: Finds all critical issues and produces usable rewrites matching expected traits.
- `1`: Finds the main issue but misses secondary constraints or gives weak rewrites.
- `0`: Misses the main issue, violates constraints, or produces unsafe/misleading copy.

For golden evals:

- P0 cases should never score 0.
- Baseline target: average score >= 1.6.
- A release should not proceed if P0 regressions appear.

For candidates:

- Score them to decide whether they are good tests.
- Do not use them as release gates until promoted.

## Assertion Style

Use trait-based assertions, not exact-answer assertions.

Good:

- Must identify that `ok` is not an action.
- Must propose a concrete CTA such as `保存昵称` or `开始捏咔`.
- Must avoid keeping unverifiable scarcity claims.

Bad:

- Must output exactly one prescribed sentence.
- Must use a clever phrase.
- Must match the maintainer's personal style preference.

## Candidate Promotion Workflow

1. Add or update a Markdown case in `cases/`.
2. Add a structured line in `evals/candidates.jsonl`.
3. Run the skill manually against the candidate.
4. Score the output and note failure patterns.
5. If the case is stable and valuable, promote it into the next `golden-v*.jsonl`.
6. Keep the original `case_path` field so the human-readable context remains linked.

## Current Files

- `evals/golden-v0.jsonl`: first stable baseline, 30 cases.
- `evals/candidates.jsonl`: case-derived staging set.
- `evals/schema.json`: schema for golden cases. Candidates intentionally add `case_path` and `promotion_status`; future schema can support both.
- `scripts/validate-evals.mjs`: local validator for golden and candidate JSONL files.

## Local Validation

Run validation before submitting eval changes:

```bash
node scripts/validate-evals.mjs
```

The validator checks:

- JSONL parseability.
- Required fields.
- Duplicate IDs within each file.
- Allowed enum values.
- Non-empty `expected_findings`.
- Candidate `case_path` existence.

## Future Automation

Recommended scripts:

- `scripts/run-evals`: run cases against the current skill with a selected model.
- `scripts/score-eval-outputs.mjs`: check `must_include` and `must_not_include`, then ask for human review on nuanced traits.
- `scripts/promote-candidate`: copy a candidate into a target golden file with a new stable ID.

Automation should support human judgment, not replace it. The hardest part of product copy quality is still the product judgment.

## Semi-Automated Scoring

Use:

```bash
node scripts/score-eval-outputs.mjs --evals evals/candidates.jsonl --outputs evals/outputs.example.jsonl
```

Output files should contain:

- `id`: eval case ID.
- `output`: model output text.
- `human_score`: optional 0-2 score.
- `review_notes`: optional reviewer note.

The script only checks literal include/exclude terms. `must_not_include` is checked against the rewrite/suggestion section when the script can detect one, because a good diagnosis often needs to quote the original bad copy. A case can auto-pass but still require human review if the reasoning is weak, unsafe, or misses a nuanced product judgment.
