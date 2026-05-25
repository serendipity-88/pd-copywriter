#!/usr/bin/env node

import fs from "node:fs";

function parseArgs(argv) {
  const args = {
    evalFile: null,
    outputFile: null,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--evals") {
      args.evalFile = argv[index + 1];
      index += 1;
    } else if (arg === "--outputs") {
      args.outputFile = argv[index + 1];
      index += 1;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  if (!args.evalFile || !args.outputFile) {
    throw new Error("usage: node scripts/score-eval-outputs.mjs --evals <evals.jsonl> --outputs <outputs.jsonl>");
  }

  return args;
}

function readJsonl(file) {
  const text = fs.readFileSync(file, "utf8").trim();
  if (!text) {
    return [];
  }

  return text.split(/\n/).map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`${file}:${index + 1} invalid JSON: ${error.message}`);
    }
  });
}

function normalizeText(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function includesNeedle(output, needle) {
  return normalizeText(output).includes(normalizeText(needle));
}

function rewriteRegion(output) {
  const text = String(output ?? "");
  const markers = [
    "## 改写",
    "## 文案建议",
    "## Rewrite",
    "## Rewrites",
    "### 改写",
    "### Rewrite",
    "\n改写",
    "\n建议改写",
    "\n建议文案",
    "\n建议改为",
    "\n生成建议",
    "\n推荐上线版本",
    "\n可上线",
    "\nCTA 变体",
    "\n主标题",
  ];

  const positions = markers
    .map((marker) => text.indexOf(marker))
    .filter((position) => position >= 0);

  if (positions.length === 0) {
    return text;
  }

  return text.slice(Math.min(...positions));
}

function isExplanatoryHeading(line) {
  return /^#{1,6}\s*(诊断|问题|说明|推荐说明|建议|推荐建议|注意|风险|上线前确认|确认项|口径|评估)/.test(line.trim());
}

function filterExplanatoryMarkdownSections(text) {
  const lines = String(text ?? "").split(/\n/);
  let keep = true;

  return lines
    .filter((line) => {
      if (/^#{1,6}\s+/.test(line.trim())) {
        keep = !isExplanatoryHeading(line);
      }

      return keep;
    })
    .join("\n");
}

function removeExplanatoryLines(text) {
  return String(text ?? "")
    .split(/\n/)
    .filter((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return true;
      }

      return ![
        /^诊断[:：]/,
        /^建议[:：]/,
        /^推荐说明[:：]/,
        /^说明[:：]/,
        /^由于/,
        /^当前/,
        /^如果[^：:]*[:：]$/,
        /^只有在/,
        /^否则/,
        /^避免/,
      ].some((pattern) => pattern.test(trimmed));
    })
    .join("\n");
}

function candidateCopyRegion(output) {
  return removeExplanatoryLines(filterExplanatoryMarkdownSections(rewriteRegion(output)));
}

function factualSignals(testCase, output) {
  const tags = new Set(testCase.risk_tags ?? []);
  const shouldCheck = tags.has("factual_claims") || tags.has("sample_copy");

  if (!shouldCheck) {
    return null;
  }

  return {
    launch_sample_split: includesNeedle(output, "可上线文案") && includesNeedle(output, "示例文案"),
    sample_disclaimer:
      includesNeedle(output, "示例数字仅示意") ||
      includesNeedle(output, "仅示意") ||
      includesNeedle(output, "需替换为真实数据"),
    verification_prompt:
      includesNeedle(output, "上线前确认") ||
      includesNeedle(output, "口径") ||
      includesNeedle(output, "样本量") ||
      includesNeedle(output, "赔付"),
  };
}

function scoreCase(testCase, outputItem) {
  const output = outputItem?.output ?? "";
  const rewrittenOutput = candidateCopyRegion(output);
  const missing = [];
  const forbidden = [];

  for (const item of testCase.must_include ?? []) {
    if (!includesNeedle(output, item)) {
      missing.push(item);
    }
  }

  for (const item of testCase.must_not_include ?? []) {
    if (item && includesNeedle(rewrittenOutput, item)) {
      forbidden.push(item);
    }
  }

  return {
    id: testCase.id,
    priority: testCase.priority,
    auto_pass: missing.length === 0 && forbidden.length === 0,
    missing,
    forbidden,
    factual_signals: factualSignals(testCase, output),
    human_score: outputItem?.human_score ?? null,
    review_notes: outputItem?.review_notes ?? "",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const tests = readJsonl(args.evalFile);
  const outputs = readJsonl(args.outputFile);
  const outputById = new Map(outputs.map((item) => [item.id, item]));

  const results = tests
    .filter((testCase) => outputById.has(testCase.id))
    .map((testCase) => scoreCase(testCase, outputById.get(testCase.id)));

  const missingOutputs = tests.filter((testCase) => !outputById.has(testCase.id)).map((testCase) => testCase.id);
  const unknownOutputs = outputs.filter((item) => !tests.some((testCase) => testCase.id === item.id)).map((item) => item.id);

  const passed = results.filter((result) => result.auto_pass).length;

  console.log(`Scored outputs: ${results.length}`);
  console.log(`Auto-pass: ${passed}/${results.length}`);

  if (missingOutputs.length > 0) {
    console.log(`Missing outputs: ${missingOutputs.join(", ")}`);
  }

  if (unknownOutputs.length > 0) {
    console.log(`Unknown output ids: ${unknownOutputs.join(", ")}`);
  }

  for (const result of results) {
    const status = result.auto_pass ? "PASS" : "REVIEW";
    console.log(`\n[${status}] ${result.id} (${result.priority})`);
    if (result.missing.length > 0) {
      console.log(`  missing: ${result.missing.join(" | ")}`);
    }
    if (result.forbidden.length > 0) {
      console.log(`  forbidden: ${result.forbidden.join(" | ")}`);
    }
    if (result.factual_signals) {
      const signals = Object.entries(result.factual_signals)
        .map(([key, value]) => `${key}=${value ? "yes" : "no"}`)
        .join(", ");
      console.log(`  factual_signals: ${signals}`);
    }
    if (result.human_score !== null) {
      console.log(`  human_score: ${result.human_score}`);
    }
    if (result.review_notes) {
      console.log(`  notes: ${result.review_notes}`);
    }
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
