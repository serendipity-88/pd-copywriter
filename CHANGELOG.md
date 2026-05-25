# Changelog

## v0.1.0 - 2026-05-25

First public-ready release of `PD Copywriter`, a Chinese product copywriting Skill for product managers, designers, and AI agents.

### Included

- Core Skill for diagnosing, rewriting, and generating Chinese product copy.
- Coverage for three copy types: UI interaction copy, marketing copy, and explanatory copy.
- Rule references for grammar templates, function words, verb selection, carrier limits, scene templates, style presets, and diagnostic checks.
- Factual-expression credibility rules for dates, numbers, discounts, success metrics, inventory, delivery promises, and other verifiable claims.
- Adjacent-copy guidance so the Skill can suggest high-value neighboring copy slots when a user asks for only one slot.
- Evaluation assets:
  - `evals/golden-v0.jsonl`
  - `evals/candidates.jsonl`
  - validation and scoring scripts
  - curated public reports under `docs/eval-reports/`
- Public repository curation policy: raw eval runs and process-heavy artifacts are archived locally by default; the public repo keeps curated examples, reports, and contribution-ready documentation.
- Rewritten README with quick start, usage examples, eval links, and contribution entry points.

### Validation

- `evals/golden-v0.jsonl`: 30 cases OK.
- `evals/candidates.jsonl`: 9 cases OK.
- Core regression comparison: Skill-guided GPT-5.5 scored 10/10 auto-pass and 20/20 human score on the curated 10-case set.
- Factual credibility mini eval: Skill-guided GPT-5.5 scored 3/3 auto-pass and 3/3 human pass.

### Known Next Work

- Add output density control so simple UI copy requests produce shorter answers by default.
- Add more cleaned public cases across ecommerce, finance, AI tools, local services, and B-side products.
- Improve semantic scoring so equivalent expressions are not under-scored by keyword checks.
- Add a fuller contribution guide after more external usage feedback.
