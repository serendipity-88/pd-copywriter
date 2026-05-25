# Public Repository Curation Plan

Date: 2026-05-25

This repository is the public product surface for `PD Copywriter`. It should help external users understand, install, use, evaluate, and contribute to the Skill.

It should not contain every intermediate artifact from the creation process.

## Curation Principle

Public materials should answer one of four questions:

1. What does this Skill do?
2. How do I install and use it?
3. What quality standard does it follow?
4. How can I contribute without breaking the core behavior?

If a file mainly records our private exploration, raw model output, temporary comparison, or personal preference selection, it belongs in the local `my skills` workspace first.

## Current Inventory

### Keep Public

These files are directly useful to external users or contributors.

| Path | Reason |
| --- | --- |
| `README.md` | Main public explanation and installation entry. |
| `skill/**` | The actual Skill users install. |
| `publish.sh` | Installation helper. |
| `docs/working-principles.md` | Explains stable iteration principles. |
| `docs/eval-methodology.md` | Explains how quality is evaluated. |
| `docs/content-architecture.md` | Explains why structured cases/evals exist. |
| `evals/README.md` | Eval usage instructions. |
| `evals/schema.json` | Eval case contract. |
| `evals/golden-v0.jsonl` | Stable public regression baseline. |
| `evals/outputs.example.jsonl` | Minimal output format example. |
| `scripts/validate-evals.mjs` | Useful validation tool for contributors. |
| `scripts/score-eval-outputs.mjs` | Useful scoring helper for contributors. |

### Keep Public, But Curate

These are useful, but should be reviewed for public-readiness and possible simplification.

| Path | Recommended action |
| --- | --- |
| `cases/README.md` | Keep; add clearer note that public cases are curated examples, not a complete private case library. |
| `cases/template.md` | Keep; useful for contributors. |
| `cases/ui/*.md` | Review one by one. Keep only cleaned and generalized examples; move preference-heavy or brand-sensitive drafts to local archive. |
| `evals/candidates.jsonl` | Keep only if candidates are intentionally public staging examples. Otherwise move to local archive and keep a smaller `evals/candidates.example.jsonl`. |
| `evals/baselines/candidates-manual-2026-05-25.md` | Convert into a short public summary or move to local archive. |

### Converted To Public Summary

These reports were useful as evidence, but should not remain as a growing pile of run artifacts.

| Path | Recommended public form |
| --- | --- |
| `docs/eval-reports/core-regression-10.md` | Representative report retained publicly. |
| `docs/eval-reports/factual-credibility.md` | Focused factual-credibility report retained publicly. |
| Former `evals/runs/human-side-by-side-2026-05-25.report.md` | Archived locally. |
| Former `evals/runs/gpt55-baseline-comparison-2026-05-25.report.md` | Archived locally. |
| Former `evals/runs/manual-10-2026-05-25.report.md` | Archived locally. |
| Former `evals/runs/final-copy-comparison-2026-05-25.md` | Archived locally. |

### Moved To Local Archive By Default

These files are process artifacts. They are useful for us, but not necessary for the public repository.

| Pattern | Reason |
| --- | --- |
| `evals/runs/*.raw.md` | Raw model transcripts are process evidence, not public product documentation. |
| `evals/runs/*.outputs.jsonl` | Useful for internal comparison, but noisy for external readers. |
| `evals/runs/*.cases.jsonl` | Run-specific subsets duplicate canonical eval files. Keep only if tied to a representative public report. |
| Repeated baseline run files | They make the repo look like a workbench rather than a polished Skill project. |

The 2026-05-25 run artifacts were archived locally at:

```text
my skills/archives/pd-copywriter/eval-runs/2026-05-25/
```

## Proposed Public Structure

```text
pd-copywriter/
├── README.md
├── skill/
├── docs/
│   ├── working-principles.md
│   ├── eval-methodology.md
│   ├── public-repo-curation.md
│   └── eval-reports/
│       ├── core-regression-10.md
│       └── factual-credibility.md
├── cases/
│   ├── README.md
│   ├── template.md
│   └── ui/
│       └── [curated public cases only]
├── evals/
│   ├── README.md
│   ├── schema.json
│   ├── golden-v0.jsonl
│   └── outputs.example.jsonl
└── scripts/
    ├── validate-evals.mjs
    └── score-eval-outputs.mjs
```

## Local Archive Recommendation

Use local `my skills` for materials that preserve process and taste:

```text
my skills/
├── logs/
├── ideas/
└── archives/
    └── pd-copywriter/
        ├── eval-runs/
        ├── raw-outputs/
        ├── private-cases/
        └── side-by-side-reviews/
```

Local archive can keep:

- Raw model outputs.
- Full side-by-side comparisons.
- Preference-heavy case drafts.
- User-provided negative examples before abstraction.
- Temporary runs used to make a decision.

## Cleanup Completed

The first cleanup was completed as a documentation and repository-curation change with no Skill behavior change:

1. Created local archive directories under `my skills/archives/pd-copywriter/`.
2. Archived `evals/runs/*.raw.md`, `*.outputs.jsonl`, run-specific cases, and process-heavy reports locally.
3. Kept two representative public reports under `docs/eval-reports/`.
4. Updated eval documentation so contributors understand which artifacts are public and which are local.
5. Re-ran validation scripts.

Commit:

```text
docs: curate public eval artifacts
```
