/**
 * A content-addressed translation memory plus the batch driver both locale pipelines share.
 *
 * The pipelines used to re-translate every file on every run — one `claude -p` spawn per API
 * markdown file and per sidebar label. This module cuts that to the diff: each translatable unit is
 * keyed by a hash of its source text, so unchanged content is served from a committed cache and only
 * new or edited units reach the adapter. Small units (sidebar labels) are objectified into a single
 * batched request; large markdown is translated per file on a miss to keep fidelity.
 *
 * The flow is: diff (hash vs. cache) → objectify (batch the misses) → translate → destructure (map
 * results back by hash) → save (prune to the units seen this run, write JSON).
 *
 * @module
 */
import { join } from "node:path";
import {
  isPassthroughTranslation,
  resolveVerbatimAction,
  TranslationMemory as SharedTranslationMemory,
  sha256,
  type VerbatimPolicy,
} from "@pantoken/translation-adapters";
import type { TranslationAdapter } from "./api-translation.ts";

/**
 * A translatable unit. `markdown` is translated per file (whole-file, e.g. guides); `text` (short
 * labels) and `prose` (block-level API/cssdoc prose) units are batched together into one request.
 */
export interface TranslationUnit {
  kind: "markdown" | "text" | "prose";
  source: string;
  /** Only used to label markdown units in adapter prompts/logs. */
  filePath?: string;
}

/** The cache directory (committed — it's the reusable translation memory, not a build artifact). */
const cacheDir = join(import.meta.dirname, "..", "i18n-cache");

/** The stable content key for a unit: `sha256(kind \0 source)`, hex. */
export function keyFor(kind: string, source: string): string {
  return sha256(`${kind}\0${source}`);
}

/** Docs facade: `(kind, source)` API over the shared memory; prunes to touched keys on save. */
export class TranslationMemory {
  private readonly _mem: SharedTranslationMemory;
  get path(): string {
    return this._mem.path;
  }
  get hits(): number {
    return this._mem.hits;
  }
  misses = 0;

  private constructor(mem: SharedTranslationMemory) {
    this._mem = mem;
  }

  /** Load (or start) the memory for `<locale>.<namespace>.json`. */
  static load(locale: string, namespace: string): TranslationMemory {
    const path = join(cacheDir, `${locale}.${namespace}.json`);
    return new TranslationMemory(
      SharedTranslationMemory.open(path, { prune: namespace !== "api" }),
    );
  }

  get(kind: string, source: string): string | undefined {
    return this._mem.get(keyFor(kind, source));
  }

  set(kind: string, source: string, translation: string): void {
    this._mem.set(keyFor(kind, source), translation);
    this.misses++;
  }

  save(): void {
    this._mem.save();
  }
}

/**
 * Translate a set of units against the memory. Returns a map keyed by `keyFor(kind, source)` so
 * callers can look up each unit's translation (identical sources collapse to one entry).
 *
 * Diff: cache hits are served immediately. Objectify + translate: `text` misses are deduped and sent
 * to {@link TranslationAdapter.translateBatch} in one request; `markdown` misses are translated per
 * file. Destructure + save: results are written back into the memory keyed by content hash.
 */
export interface TranslateOptions {
  /**
   * Persist the memory after each markdown miss, so a long run (e.g. hundreds of API files) is
   * resumable: if a translation fails partway, the completed work is already saved and a re-run
   * serves it from cache. Off by default.
   */
  autosave?: boolean;
  /**
   * Bypass the cache entirely: every unit is retranslated (and its cached value overwritten) even
   * when an unchanged cache hit already exists. Use this to force a fresh pass over already-cached
   * content (e.g. after fixing an adapter bug that produced bad translations). Defaults to the
   * `DOCS_TRANSLATION_FORCE` environment variable (`"1"` → `true`), so every caller —
   * `translate-guides.ts`, `translate-chrome.ts`, `translate-demos.ts`,
   * `build-api-locales.ts` — honors it without a code change.
   */
  force?: boolean;
  /**
   * Source strings allowed to legitimately match their translation verbatim (e.g. a code sample or
   * proper noun repeated across locales). Exempt from the passthrough guard: identical output for
   * these is cached normally, never stripped or warned about.
   */
  verbatimSources?: ReadonlySet<string>;
  /** Source strings copied directly into the result/cache without invoking the translation adapter. */
  requiredVerbatimSources?: ReadonlySet<string>;
  /** Fallback policy for source-identical translations by locale. */
  defaultVerbatim?: VerbatimPolicy;
  /** Locale resolved against {@link defaultVerbatim}. */
  locale?: string;
}

/** True when an identical source value is explicitly allowed by the translation options. */
function allowsVerbatim(source: string, options: TranslateOptions): boolean {
  return (
    options.requiredVerbatimSources?.has(source) === true ||
    options.verbatimSources?.has(source) === true ||
    (options.locale !== undefined &&
      resolveVerbatimAction(options.defaultVerbatim, options.locale) === "allow")
  );
}

/** Format optional locale and source provenance for a translation diagnostic. */
function translationContext(unit: TranslationUnit, options: TranslateOptions): string {
  const context = [options.locale, unit.filePath].filter((value) => value !== undefined).join(" ");
  return context === "" ? "" : ` [${context}]`;
}

/**
 * Serve cache hits straight into `result` and return the deduped misses — one unit per unseen content
 * key, so an identical string (e.g. a repeated sidebar label) translates once. With `force`, every
 * cache lookup is skipped so every unit comes back as a miss instead.
 */
function diffAgainstCache(
  memory: TranslationMemory,
  units: readonly TranslationUnit[],
  result: Map<string, string>,
  force: boolean,
  options: TranslateOptions,
): TranslationUnit[] {
  const unique = new Map<string, TranslationUnit>();
  for (const unit of units) {
    const key = keyFor(unit.kind, unit.source);
    if (options.requiredVerbatimSources?.has(unit.source) === true) {
      const cached = memory.get(unit.kind, unit.source);
      if (cached !== unit.source) memory.set(unit.kind, unit.source, unit.source);
      result.set(key, unit.source);
      continue;
    }
    if (!force) {
      const cached = memory.get(unit.kind, unit.source);
      const isVerbatim = allowsVerbatim(unit.source, options);
      if (cached !== undefined && (isVerbatim || !isPassthroughTranslation(unit.source, cached))) {
        result.set(key, cached);
        continue;
      }
      if (cached !== undefined) {
        console.warn(
          `  !${translationContext(unit, options)} cached ${unit.kind} translation for ${JSON.stringify(unit.source.slice(0, 40))} looks untranslated; retranslating`,
        );
      }
    }
    if (!unique.has(key)) unique.set(key, unit);
  }
  return [...unique.values()];
}

/** Translate each markdown miss per-file into `memory`/`result`; log and skip individual failures. */
async function translateMarkdownMisses(
  adapter: TranslationAdapter,
  memory: TranslationMemory,
  result: Map<string, string>,
  markdownMisses: readonly TranslationUnit[],
  options: TranslateOptions,
): Promise<void> {
  // Markdown: per-file (keeps fidelity; batching large bodies risks the model dropping structure).
  // A single file's failure is logged and skipped rather than aborting the whole run.
  for (const [index, unit] of markdownMisses.entries()) {
    try {
      const translated = await adapter.translateMarkdown(unit.source, unit.filePath ?? "");
      if (
        !allowsVerbatim(unit.source, options) &&
        isPassthroughTranslation(unit.source, translated)
      ) {
        console.warn(
          `  ! skipped ${unit.filePath ?? "a markdown unit"}: looks untranslated (identical to source), will retry next run`,
        );
        continue;
      }
      memory.set("markdown", unit.source, translated);
      result.set(keyFor("markdown", unit.source), translated);
      if (options.autosave) memory.save();
      // Markdown misses are per-file network round-trips (slow); log each one so long
      // runs don't sit silently — unlike the batched text/prose path, there's no other
      // progress signal until the whole file set for a locale finishes.
      console.log(
        `  … ${index + 1}/${markdownMisses.length} ${unit.filePath ?? "markdown unit"} translated`,
      );
    } catch (error) {
      console.warn(
        `  ! skipped ${unit.filePath ?? "a markdown unit"}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

/**
 * Translate the batchable (text + prose) misses in one objectified request (fewer round-trips),
 * streaming persistence + progress into `memory`/`result`. With `autosave`, a long cold run stays
 * resumable (a kill keeps completed chunks) and logs progress, instead of writing nothing until the
 * whole batch returns.
 */
async function translateBatchableMisses(
  adapter: TranslationAdapter,
  memory: TranslationMemory,
  result: Map<string, string>,
  batchable: readonly TranslationUnit[],
  options: TranslateOptions,
): Promise<void> {
  if (batchable.length === 0) return;
  const items = batchable.map((u) => ({ id: keyFor(u.kind, u.source), text: u.source }));
  const byId = new Map(items.map((item, index) => [item.id, batchable[index]]));
  const consumed = new Set<string>();
  const persist = (partial: Record<string, string>): void => {
    let added = 0;
    for (const [id, value] of Object.entries(partial)) {
      const unit = byId.get(id);
      if (unit === undefined || consumed.has(id)) continue;
      consumed.add(id);
      if (!allowsVerbatim(unit.source, options) && isPassthroughTranslation(unit.source, value)) {
        console.warn(
          `  !${translationContext(unit, options)} ${unit.kind} unit looks untranslated (identical to source), not cached: ${JSON.stringify(unit.source.slice(0, 40))}`,
        );
        result.set(id, unit.source);
        continue; // not cached — stays a miss, retried next run
      }
      memory.set(unit.kind, unit.source, value);
      result.set(id, value);
      added += 1;
    }
    if (added === 0) return; // e.g. the final sweep re-seeing an already-persisted chunk
    if (options.autosave) memory.save();
    if (items.length > 1) {
      console.log(`  … ${consumed.size}/${items.length} labels + prose blocks translated`);
    }
  };

  const batched = adapter.translateBatch
    ? await adapter.translateBatch(items, persist)
    : Object.fromEntries(
        await Promise.all(
          items.map(async (i) => [i.id, await adapter.translateText(i.text)] as const),
        ),
      );
  // Cover adapters that didn't stream through the callback (the per-item fallback above).
  persist(batched);
  // Anything still missing — a chunk that errored out, or a key the model dropped — renders as its
  // source text this run but is NOT cached, so it stays a miss and is retried next run rather than
  // being frozen as English in the committed memory.
  for (const unit of batchable) {
    const key = keyFor(unit.kind, unit.source);
    if (consumed.has(key)) continue;
    consumed.add(key);
    result.set(key, unit.source);
  }
}

/**
 * Translate a set of units, serving cache hits from `memory` and translating the misses through
 * `adapter`. Returns a map from each unit's key to its translated (or passthrough) text.
 *
 * @param adapter - The translation engine for cache misses.
 * @param memory - The persisted translation cache.
 * @param units - The units to translate.
 * @param options - Optional translation settings.
 * @returns A map keyed by each unit's cache key.
 */
export async function translateUnits(
  adapter: TranslationAdapter,
  memory: TranslationMemory,
  units: readonly TranslationUnit[],
  options: TranslateOptions = {},
): Promise<Map<string, string>> {
  const result = new Map<string, string>();
  const force = options.force ?? process.env.DOCS_TRANSLATION_FORCE === "1";

  const misses = diffAgainstCache(memory, units, result, force, options);
  const markdownMisses = misses.filter((u) => u.kind === "markdown");
  const textMisses = misses.filter((u) => u.kind === "text");
  const proseMisses = misses.filter((u) => u.kind === "prose");

  await translateMarkdownMisses(adapter, memory, result, markdownMisses, options);

  // Poison-cache guard: an adapter that can't translate prose (the glossary) would only pass a prose
  // block through near-unchanged. Serve that passthrough into the rendered file, but DON'T cache it —
  // caching it under the prose key would permanently mask the block from a later claude run, since the
  // content hash wouldn't change. It must stay a miss.
  const batchable = [...textMisses];
  if (adapter.translatesProse === false) {
    for (const unit of proseMisses) result.set(keyFor("prose", unit.source), unit.source);
  } else {
    batchable.push(...proseMisses);
  }

  await translateBatchableMisses(adapter, memory, result, batchable, options);

  return result;
}
