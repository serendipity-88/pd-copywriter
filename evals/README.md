# PD Copywriter Evals

This directory contains golden evaluation cases for `PD Copywriter`.

The goal is not to judge whether a rewrite is the only correct answer. The goal is to verify whether the skill consistently detects important product-copy issues and produces rewrites with the expected properties.

## Files

- `golden-v0.jsonl`: 30 baseline cases covering diagnosis, rewrite, generation, page mode, ethics, UI/MKT/EXP, mobile and web/B-side scenarios.
- `candidates.jsonl`: case-derived eval candidates that are not release gates yet.
- `schema.json`: JSON schema for each eval case.

## Validate Files

Run:

```bash
node scripts/validate-evals.mjs
```

Validate specific files:

```bash
node scripts/validate-evals.mjs evals/golden-v0.jsonl
node scripts/validate-evals.mjs evals/candidates.jsonl
```

The validator checks JSONL parsing, required fields, enum values, duplicate IDs, non-empty expected findings, and candidate `case_path` links.

## Score Outputs

Prepare an output file with one model result per line:

```json
{"id":"pdw-candidate-005","output":"...model output...","human_score":2,"review_notes":"optional"}
```

Then run:

```bash
node scripts/score-eval-outputs.mjs --evals evals/candidates.jsonl --outputs evals/outputs.example.jsonl
```

This script checks `must_include` and `must_not_include` automatically.

- `must_include` is checked against the full output.
- `must_not_include` is checked against the candidate-copy region, not diagnosis/explanation sections, so the model can quote the original bad copy while explaining the issue.
- Chinese spacing is normalized, so `30 分钟` and `30分钟` are treated as the same phrase.
- Cases tagged with `factual_claims` or `sample_copy` also print lightweight signals for launch/sample separation, sample disclaimers, and verification prompts.

The script does not replace human review for `expected_findings` or `acceptable_rewrite_traits`.

## How To Run Manually

For each line in `golden-v0.jsonl`:

1. Use `prompt` as the user request.
2. Run it with `PD Copywriter`.
3. Check the output against:
   - `expected_findings`
   - `must_include`
   - `must_not_include`
   - `acceptable_rewrite_traits`

## Scoring

Use a 0-2 score for each case:

- `2`: Finds all critical issues and provides usable rewrites matching the expected traits.
- `1`: Finds the main issue but misses secondary constraints or gives weak rewrites.
- `0`: Misses the main issue, violates constraints, or produces unsafe/misleading copy.

Baseline pass target for v0: average score >= 1.6 and no P0 case scored 0.

## Case Types

- `diagnosis`: diagnose existing copy.
- `rewrite`: diagnose then rewrite.
- `generation`: generate copy from scenario.
- `page`: generate or review a full page copy set.

## Source Types

- `design-system-derived`: derived from public design-system principles.
- `article-derived`: derived from public Chinese product/UX writing articles.
- `cmgui-derived`: derived from public CMGUI app/task metadata, not OCR text.
- `synthetic`: constructed to test a specific rule.

Do not bulk-copy proprietary screenshots or long article excerpts into eval cases. Keep cases short, source-aware, and rule-focused.
