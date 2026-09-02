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
 * Whether a given miss blocks the merge or only warns is decided by `i18n-policy.json`, per surface
 * (`docs.guides`, `docs.api`, `docs.home`, `docs.chrome`, `docs.glossary`, `docs.demos`) and per
 * locale tier — so adding an English guide doesn't have to wait on ~90 translations. See
 * `tools/translation-adapters/src/drift-policy.ts`.
 *
 * @module
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { DriftReporter } from "@pantoken/translation-adapters";
import { ENGLISH_UI_STRINGS, NON_ROOT_LOCALES, flattenStrings } from "../.vitepress/i18n.ts";
import { GLOSSARY_TERMS } from "./glossary.ts";
import { listDemoNames, loadDemoI18n } from "./demo-i18n.ts";
import { collectHomeUnits } from "./home-i18n.ts";
import { collectUnits, segmentMarkdown } from "./segment-markdown.ts";
import { keyFor } from "./translation-memory.ts";

const docsRoot = join(import.meta.dirname, "..");
const cacheDir = join(docsRoot, "i18n-cache");
const guideDir = join(docsRoot, "guide");
const demoDir = join(docsRoot, "demos");
const apiDir = join(docsRoot, "api");
const homeIndex = join(docsRoot, "index.md");

const targets = NON_ROOT_LOCALES;

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

/** Recursively collect every `.md` file under `dir` (returns `[]` when `dir` doesn't exist). */
export const walkMarkdown = (dir: string): string[] => {
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
export const apiDrift = (locale: string): Missing[] => {
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

const chromeLeaves = flattenStrings(ENGLISH_UI_STRINGS);

/** Chrome drift: every UI-string leaf (nav/sidebar/CDN picker/etc.) needs a cached translation. */
const chromeDrift = (locale: string): Missing[] => {
  if (chromeLeaves.length === 0) return [];
  const cached = loadCacheKeys(locale, "chrome");
  const missing: Missing[] = [];
  for (const { path, text } of chromeLeaves) {
    if (!cached.has(keyFor("text", text))) {
      missing.push({ file: `.vitepress/i18n.ts#${path}`, kind: "text", sample: preview(text) });
    }
  }
  return missing;
};

/** Glossary drift: every structural term (headings/badges/table labels) needs a cached translation. */
const glossaryDrift = (locale: string): Missing[] => {
  if (GLOSSARY_TERMS.length === 0) return [];
  const cached = loadCacheKeys(locale, "glossary");
  const missing: Missing[] = [];
  for (const { id, term } of GLOSSARY_TERMS) {
    if (!cached.has(keyFor("text", term))) {
      missing.push({ file: `glossary.ts#${id}`, kind: "text", sample: preview(term) });
    }
  }
  return missing;
};

const homeUnits = existsSync(homeIndex) ? collectHomeUnits(readFileSync(homeIndex, "utf8")) : [];

/**
 * Home drift: every translatable `docs/index.md` frontmatter value (hero text/tagline, action labels,
 * feature titles and details) needs a cached translation, or the localized home page falls back to
 * showing English copy under a locale route.
 */
const homeDrift = (locale: string): Missing[] => {
  if (homeUnits.length === 0) return [];
  const cached = loadCacheKeys(locale, "home");
  const missing: Missing[] = [];
  for (const text of homeUnits) {
    if (!cached.has(keyFor("text", text))) {
      missing.push({ file: "index.md", kind: "text", sample: preview(text) });
    }
  }
  return missing;
};

const demoNames = existsSync(demoDir) ? listDemoNames(demoDir) : [];

/** Demos drift: every demo-local i18n string needs a cached translation. */
const demosDrift = (locale: string): Missing[] => {
  if (demoNames.length === 0) return [];
  const cached = loadCacheKeys(locale, "demos");
  const missing: Missing[] = [];
  for (const name of demoNames) {
    const { strings } = loadDemoI18n(join(demoDir, name));
    for (const text of Object.values(strings)) {
      if (!cached.has(keyFor("text", text))) {
        missing.push({ file: `demos/${name}/i18n.json`, kind: "text", sample: preview(text) });
      }
    }
  }
  return missing;
};

const reporter = new DriftReporter({
  label: "@pantoken/docs",
  fixCommand: "vp run docs:locales:translate",
});

/**
 * A `Missing.file` is either a real docs-relative path (`guide/foo.md`) or a symbolic
 * `file#anchor` locator (`glossary.ts#tokens`). Annotations need a path GitHub can resolve, so the
 * anchor moves into the detail text and the path is made repo-relative.
 */
const record = (surface: string, locale: string, items: readonly Missing[]): void => {
  for (const item of items) {
    const [path, anchor] = item.file.split("#");
    reporter.add({
      surface,
      locale,
      file: `docs/${path}`,
      detail: `[${item.kind}]${anchor ? ` ${anchor}:` : ""} ${item.sample}`,
    });
  }
};

const apiGenerated = existsSync(apiDir);
if (!apiGenerated) {
  console.warn(`! docs/api not generated — skipping API drift (run docs:api:en first).`);
}

for (const locale of targets) {
  record("docs.guides", locale, guideDrift(locale));
  record("docs.home", locale, homeDrift(locale));
  record("docs.chrome", locale, chromeDrift(locale));
  record("docs.glossary", locale, glossaryDrift(locale));
  record("docs.demos", locale, demosDrift(locale));
  if (apiGenerated) record("docs.api", locale, apiDrift(locale));
}

process.exitCode = reporter.report();
