#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_FILES = ["evals/golden-v0.jsonl", "evals/candidates.jsonl"];

const REQUIRED_FIELDS = [
  "id",
  "mode",
  "priority",
  "source_type",
  "source",
  "product",
  "platform",
  "copy_type",
  "carrier",
  "scenario",
  "prompt",
  "original_copy",
  "context",
  "expected_findings",
  "must_include",
  "must_not_include",
  "acceptable_rewrite_traits",
  "risk_tags",
  "confidence",
];

const ARRAY_FIELDS = [
  "expected_findings",
  "must_include",
  "must_not_include",
  "acceptable_rewrite_traits",
  "risk_tags",
];

const ENUMS = {
  mode: new Set(["diagnosis", "rewrite", "generation", "page"]),
  priority: new Set(["P0", "P1", "P2"]),
  copy_type: new Set(["UI", "MKT", "EXP", "MIXED"]),
  confidence: new Set(["high", "medium", "low"]),
};

const SOURCE_TYPES = new Set([
  "design-system-derived",
  "article-derived",
  "cmgui-derived",
  "synthetic",
  "case-derived",
]);

function parseArgs(argv) {
  const files = [];
  let checkCasePaths = true;

  for (const arg of argv) {
    if (arg === "--no-case-path-check") {
      checkCasePaths = false;
    } else {
      files.push(arg);
    }
  }

  return {
    files: files.length > 0 ? files : DEFAULT_FILES,
    checkCasePaths,
  };
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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateCase(file, item, index, seenIds, options) {
  const location = `${file}:${index + 1}`;

  for (const field of REQUIRED_FIELDS) {
    assert(Object.prototype.hasOwnProperty.call(item, field), `${location} missing field "${field}"`);
  }

  assert(typeof item.id === "string" && item.id.length > 0, `${location} id must be a non-empty string`);
  assert(!seenIds.has(item.id), `${location} duplicate id "${item.id}"`);
  seenIds.add(item.id);

  assert(ENUMS.mode.has(item.mode), `${location} invalid mode "${item.mode}"`);
  assert(ENUMS.priority.has(item.priority), `${location} invalid priority "${item.priority}"`);
  assert(ENUMS.copy_type.has(item.copy_type), `${location} invalid copy_type "${item.copy_type}"`);
  assert(ENUMS.confidence.has(item.confidence), `${location} invalid confidence "${item.confidence}"`);
  assert(SOURCE_TYPES.has(item.source_type), `${location} invalid source_type "${item.source_type}"`);

  for (const field of ARRAY_FIELDS) {
    assert(Array.isArray(item[field]), `${location} "${field}" must be an array`);
  }

  assert(item.expected_findings.length > 0, `${location} expected_findings must not be empty`);
  assert(typeof item.prompt === "string" && item.prompt.length > 0, `${location} prompt must be non-empty`);
  assert(typeof item.context === "string" && item.context.length > 0, `${location} context must be non-empty`);

  if (item.source_type === "case-derived") {
    assert(typeof item.case_path === "string" && item.case_path.length > 0, `${location} case-derived item needs case_path`);
    assert(item.promotion_status === "candidate", `${location} candidate should use promotion_status="candidate"`);

    if (options.checkCasePaths) {
      assert(fs.existsSync(item.case_path), `${location} case_path does not exist: ${item.case_path}`);
    }
  }
}

function validateFile(file, options) {
  assert(fs.existsSync(file), `file does not exist: ${file}`);

  const items = readJsonl(file);
  const seenIds = new Set();

  items.forEach((item, index) => validateCase(file, item, index, seenIds, options));

  return items.length;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const counts = [];

  for (const file of options.files) {
    const count = validateFile(file, options);
    counts.push([file, count]);
  }

  for (const [file, count] of counts) {
    console.log(`${file}: ${count} cases OK`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
