# Content Architecture

`PD Copywriter` has two jobs at the same time:

1. Work reliably as an agent skill.
2. Grow into an open-source knowledge base for Chinese product microcopy.

These jobs need different file types and different writing styles. Do not put every idea into `SKILL.md`. Keep the execution layer small, the eval layer structured, and the case layer readable.

## Directory Roles

```text
pd-copywriter/
├── skill/              # Agent execution package
├── evals/              # Machine-readable quality baseline
├── cases/              # Human-readable case library
├── docs/               # Project methodology and contribution docs
├── README.md           # Public entry point
└── publish.sh          # Local publishing helper
```

## `skill/`: Agent Execution

Purpose: make another agent perform the task well.

Use `skill/` for:

- `SKILL.md`: the execution protocol, routing logic, output contract, and essential constraints.
- `references/`: detailed rules loaded only when needed.
- Future `assets/` or `scripts/` only if they directly support execution.

Do not use `skill/` for:

- Long creation logs.
- Public marketing narrative.
- Full case essays.
- Raw research material.
- Eval result reports.

Design principle: `SKILL.md` should behave like a concise operating manual, not like the whole library.

## `evals/`: Quality Baseline

Purpose: prove whether the skill still works after changes.

Use `evals/` for:

- Golden cases.
- JSON schema.
- Future eval runners.
- Baseline result reports.

Preferred format:

- `JSONL` for cases, one test case per line.
- Structured fields such as `prompt`, `expected_findings`, `must_include`, `must_not_include`, `risk_tags`.

Why not Markdown here:

- Eval cases must be easy to parse, sample, score, diff, and run repeatedly.
- Human readability matters, but regression testing matters more in this layer.

## `cases/`: Human Case Library

Purpose: help PMs and contributors understand good Chinese product copy judgment.

Use `cases/` for:

- Real or reconstructed short cases.
- Before/after analysis.
- Product tone observations.
- App-specific style notes.
- PM-facing lessons.

Preferred format:

- Markdown, optionally with YAML frontmatter.
- Keep each case readable as an article fragment.
- Link to public sources when available.

Why not JSONL here:

- Cases need context, narrative, screenshots or screenshot notes, nuance, and explanation.
- A good case should teach judgment, not just provide test data.

## `docs/`: Methodology

Purpose: explain how the project is built and how others can contribute.

Use `docs/` for:

- Content architecture.
- Contribution guidelines.
- Eval methodology.
- Rule gap analysis before adding new skill rules.
- Rule priority system.
- Source policy.
- Roadmap and release criteria.

Docs should be clear enough for external contributors, but less promotional than `README.md`.

## `README.md`: Public Entry Point

Purpose: convince the right people to understand, try, and contribute.

The README should answer:

- What problem does this solve?
- Why Chinese product microcopy needs its own rules?
- Who is it for?
- What can it do?
- How do I install and use it?
- How is quality evaluated?
- How can I contribute cases or rules?

README should not carry the full rule system. It should point to the right docs, cases, and evals.

## Information Flow

```text
Public sources / real app observations
        ↓
cases/*.md
        ↓
selected structured expectations
        ↓
evals/*.jsonl
        ↓
failed eval patterns
        ↓
docs/rule-gap-analysis.md
        ↓
skill/SKILL.md or skill/references/*.md improvements
```

Not every case becomes an eval.

A case should become an eval only when it has:

- A clear scenario.
- A short enough original copy.
- A concrete expected issue.
- A reasonably stable expected rewrite trait.
- A source or confidence label.

Before changing `skill/`, write or update a rule-gap analysis when the change comes from real cases. This prevents narrow one-off examples from becoming permanent rules.

## Source Policy

Use short excerpts only. Do not mirror full articles, large screenshot collections, or proprietary datasets into the repo.

For each case, record:

- Source URL or provenance.
- Product and platform if known.
- Collection date if from a live product.
- Confidence level.
- Whether it is directly observed, article-derived, dataset-derived, or synthetic.

## Evaluation Policy

Eval cases should check durable judgment, not exact wording.

Good eval assertions:

- Detects that “确定/取消” is weak for destructive confirmation.
- Avoids unverifiable scarcity claims.
- Uses “移除” instead of “删除” when data is retained.
- Gives a constructive next step for an error message.

Bad eval assertions:

- Requires one exact rewrite when many good rewrites exist.
- Rewards cleverness over clarity.
- Tests trivia unrelated to product copy judgment.

## Future Automation

Possible future scripts:

- Validate eval JSONL against `schema.json`.
- Run a model against all eval cases.
- Score `must_include` and `must_not_include` automatically.
- Generate draft eval cases from Markdown case frontmatter.
- Produce a baseline report per skill version.

Keep automation optional at first. The first goal is a trustworthy baseline, not a perfect benchmark.
