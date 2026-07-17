/**
 * Detect translation drift: English content whose translation is missing or stale.
 *
 * The committed translation memory (`docs/i18n-cache/<locale>.<namespace>.json`) is content-addressed
 * — a unit's key is `sha256(kind \0 source)`. So the key for a block of *current* English is present
 * only if that exact text was translated (and the prose poison-cache guard means a prose key is only
 * ever written by a real `:claude` run, never by the glossary passthrough). Edit the English and its
 * hash changes, so the old entry no longer matches: a missing key == untranslated or drifted.
 *
 * This check derives the keys the current English needs and asserts each is in the cache. It is
 * adapter-free — it never constructs an adapter or spawns `claude` — so it is safe to run in CI
 * (`docs/conventions/build-and-docs.md`: never wire the `:claude` cold pass into CI). Fill drift
 * locally with `vp run docs:locales:translate`, then commit the updated cache.
 *
 * Guides drift is pure (the English source is committed). API drift needs the generated EN tree
 * (`docs/api/**`), so run it after `docs:api:en`; if `docs/api` is absent it is skipped with a note.
 *
 * @module
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { LOCALES } from "../.vitepress/i18n.ts";
import { collectUnits, segmentMarkdown } from "./segment-markdown.ts";
import { keyFor } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const cacheDir = join(docsRoot, "i18n-cache");
const guideDir = join(docsRoot, "guide");
const apiDir = join(docsRoot, "api");

const targets = Object.keys(LOCALES).filter((key) => key !== "root");

interface Missing {
  file: string;
  kind: string;
  sample: string;
}

const loadCacheKeys = (locale: string, namespace: string): Set<string> => {
  const path = join(cacheDir, `${locale}.${namespace}.json`);
  if (!existsSync(path)) return new Set();
  const parsed = JSON.parse(readFileSync(path, "utf8")) as { entries?: Record<string, string> };
  return new Set(Object.keys(parsed.entries ?? {}));
};

const walkMarkdown = (dir: string): string[] => {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walkMarkdown(full));
    else if (full.endsWith(".md")) out.push(full);
  }
  return out;
};

const preview = (text: string): string =>
  text.replace(/\s+/g, " ").trim().slice(0, 60) + (text.length > 60 ? "…" : "");

/** Guide drift: each `docs/guide/*.md` is one whole-file `markdown` unit. */
const guideDrift = (locale: string): Missing[] => {
  const cached = loadCacheKeys(locale, "guides");
  const missing: Missing[] = [];
  for (const file of walkMarkdown(guideDir)) {
    const source = readFileSync(file, "utf8");
    if (!cached.has(keyFor("markdown", source))) {
      missing.push({ file: relative(docsRoot, file), kind: "markdown", sample: preview(source) });
    }
  }
  return missing;
};

/** API drift: every `prose` block across the generated EN tree needs a cached `:claude` translation. */
const apiDrift = (locale: string): Missing[] => {
  const cached = loadCacheKeys(locale, "api");
  const missing: Missing[] = [];
  for (const file of walkMarkdown(apiDir)) {
    const units = collectUnits(segmentMarkdown(readFileSync(file, "utf8")));
    for (const unit of units) {
      if (unit.kind !== "prose") continue; // glossary/labels are deterministic — not :claude-authored
      if (!cached.has(keyFor("prose", unit.text))) {
        missing.push({ file: relative(docsRoot, file), kind: "prose", sample: preview(unit.text) });
      }
    }
  }
  return missing;
};

let drifted = 0;
for (const locale of targets) {
  const guides = guideDrift(locale);
  const apiGenerated = existsSync(apiDir);
  const api = apiGenerated ? apiDrift(locale) : [];

  if (!apiGenerated) {
    console.warn(
      `! ${locale}: docs/api not generated — skipping API drift (run docs:api:en first).`,
    );
  }

  const all = [...guides, ...api];
  if (all.length === 0) {
    console.log(`✓ ${locale}: no translation drift${apiGenerated ? "" : " (guides only)"}.`);
    continue;
  }

  drifted += all.length;
  console.error(`\n✗ ${locale}: ${all.length} untranslated/drifted block(s):`);
  // Group by file, cap the per-file sample list so the output stays readable.
  const byFile = new Map<string, Missing[]>();
  for (const m of all) byFile.set(m.file, [...(byFile.get(m.file) ?? []), m]);
  for (const [file, items] of byFile) {
    console.error(`  ${file} (${items.length})`);
    for (const item of items.slice(0, 3)) console.error(`    - [${item.kind}] ${item.sample}`);
    if (items.length > 3) console.error(`    … and ${items.length - 3} more`);
  }
}

if (drifted > 0) {
  console.error(
    `\nTranslation drift: ${drifted} block(s) missing from the committed cache. ` +
      `Run \`vp run docs:locales:translate\` locally, then commit docs/i18n-cache/.`,
  );
  process.exitCode = 1;
} else {
  console.log("\nNo translation drift.");
}
