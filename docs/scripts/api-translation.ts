/**
 * Locale translation adapter primitives for generated API docs.
 *
 * The default adapter is deterministic and keyless (safe for CI), while the adapter contract keeps
 * room for higher-quality engines later.
 */
import { extractJsonObject, spawnPrompt } from "@pantoken/translation-adapters";
import { CANVAS_LOCALES } from "@pantoken/i18n";
import { GLOSSARY_TERMS, type GlossaryKind } from "./glossary.ts";
import { TranslationMemory } from "./translation-memory.ts";

// English display name per locale (e.g. "Hungarian (Magyar)" \u2192 the adapter prompt only needs the
// leading English name, not the native parenthetical), used to phrase the `AiTranslationAdapter`
// prompt for any target locale instead of a hardcoded "Hungarian". The three English regional variants
// are named explicitly instead — stripping their parenthetical would collapse all three (and root) to
// the bare word "English", losing the spelling/phrasing distinction (colour vs. color, etc.) the prompt
// needs to actually produce a localized (not identical) translation.
const ENGLISH_VARIANT_LABELS: Record<string, string> = {
  "en-AU": "Australian English",
  "en-CA": "Canadian English",
  "en-GB": "British English",
};

const LOCALE_LABELS: Record<string, string> = Object.fromEntries(
  Object.entries(CANVAS_LOCALES).map(([locale, meta]) => [
    locale,
    ENGLISH_VARIANT_LABELS[locale] ?? meta.label.replace(/\s*\(.*\)$/, ""),
  ]),
);

/** A pluggable translation engine: named, with markdown/text/batch translate methods. */
export interface TranslationAdapter {
  readonly name: string;
  /**
   * Whether this adapter produces real prose translations. The glossary sets this `false`: it only
   * knows structural terms, so the pipeline must not treat its passthrough of a prose block as a
   * translation (see the poison-cache guard in `translation-memory.ts`). Defaults to `true`.
   */
  readonly translatesProse?: boolean;
  translateMarkdown(input: string, filePath: string): Promise<string>;
  translateText(input: string): Promise<string>;
  /**
   * Translate many short strings in one request. Returns a map keyed by each item's `id`. Optional:
   * callers fall back to per-item {@link TranslationAdapter.translateText} when it's absent.
   *
   * `onChunk` (if given) is called with each chunk's partial results as it completes, so a caller can
   * persist and report progress mid-run rather than only after the whole batch returns. Chunks may
   * run concurrently, so `onChunk` can fire out of order.
   */
  translateBatch?(
    items: readonly { id: string; text: string }[],
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>>;
}

/** Escape regex metacharacters so a glossary term can be dropped into a `RegExp` literally. */
const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Build the match pattern for a glossary term, based on how it's shaped in generated markdown. */
const patternFor = (kind: GlossaryKind, term: string): RegExp => {
  const escaped = escapeRegExp(term);
  switch (kind) {
    case "heading":
      return new RegExp(`^(#{1,6} )${escaped}$`, "gm");
    case "line":
      return new RegExp(`^${escaped}$`, "g");
    case "badge":
      return new RegExp(`(pantoken-doc-tag">)${escaped}(<)`, "g");
    default:
      return new RegExp(`\\b${escaped}\\b`, "g");
  }
};

/** Build the replacement string for a translated term, preserving any capture groups `patternFor` used. */
const replacementFor = (kind: GlossaryKind, translated: string): string => {
  switch (kind) {
    case "heading":
      return `$1${translated}`;
    case "badge":
      return `$1${translated}$2`;
    default:
      return translated;
  }
};

/**
 * Deterministic adapter: substitutes known structural terms only (headings, badges, table labels),
 * looked up from the `<locale>.glossary.json` translation-memory cache (see `glossary.ts` for the term
 * list and `translate-glossary.ts` for how the cache is filled). It can't translate prose, so
 * `translatesProse` is `false`. Safe to run in CI — it never spawns an adapter or hits the network.
 */
export class GlossaryTranslationAdapter implements TranslationAdapter {
  readonly name = "glossary";
  // Deterministic term substitution only — it cannot translate prose, so the memory must never cache
  // its output under a prose key.
  readonly translatesProse = false;
  private readonly replacements: Array<[RegExp, string]>;

  constructor(locale = "hu") {
    const memory = TranslationMemory.load(locale, "glossary");
    // Untranslated terms are skipped (identity passthrough) rather than matched against an empty
    // string, so an in-progress locale still renders every OTHER already-translated term correctly.
    this.replacements = GLOSSARY_TERMS.flatMap(({ kind, term }) => {
      const translated = memory.get("text", term);
      if (translated === undefined) return [];
      return [[patternFor(kind, term), replacementFor(kind, translated)] as [RegExp, string]];
    });
  }

  translateMarkdown(input: string): Promise<string> {
    return Promise.resolve(translateWithoutFencedCode(input, (text) => this.translateSync(text)));
  }

  translateText(input: string): Promise<string> {
    return Promise.resolve(this.translateSync(input));
  }

  /** The deterministic core — synchronous; the async methods just wrap it to satisfy the contract. */
  private translateSync(input: string): string {
    const preserved = preservePackageNames(input);
    let out = preserved.text;
    for (const [pattern, value] of this.replacements) {
      out = out.replace(pattern, value);
    }
    return restorePackageNames(out, preserved.packageNames);
  }

  translateBatch(
    items: readonly { id: string; text: string }[],
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>> {
    const out = Object.fromEntries(items.map((item) => [item.id, this.translateSync(item.text)]));
    onChunk?.(out);
    return Promise.resolve(out);
  }
}

const replaceBlocks = (
  input: string,
  pattern: RegExp,
  markerPrefix: string,
): { text: string; blocks: string[] } => {
  const blocks: string[] = [];
  const text = input.replace(pattern, (match) => {
    const marker = `__${markerPrefix}_${blocks.length}__`;
    blocks.push(match);
    return marker;
  });
  return { text, blocks };
};

const restoreBlocks = (input: string, blocks: string[], markerPrefix: string): string => {
  let out = input;
  for (const [index, block] of blocks.entries()) {
    out = out.replaceAll(`__${markerPrefix}_${index}__`, block);
  }
  return out;
};

const preserveMarkdownSensitiveBlocks = (
  input: string,
): {
  text: string;
  codeBlocks: string[];
  inlineCodeBlocks: string[];
} => {
  const fenced = replaceBlocks(input, /```[\s\S]*?```/g, "PTK_CODE_BLOCK");
  const inline = replaceBlocks(fenced.text, /`[^`\n]+`/g, "PTK_INLINE_CODE");
  return {
    text: inline.text,
    codeBlocks: fenced.blocks,
    inlineCodeBlocks: inline.blocks,
  };
};

const restoreMarkdownSensitiveBlocks = (
  input: string,
  codeBlocks: string[],
  inlineCodeBlocks: string[],
): string => {
  const withCode = restoreBlocks(input, codeBlocks, "PTK_CODE_BLOCK");
  return restoreBlocks(withCode, inlineCodeBlocks, "PTK_INLINE_CODE");
};

const preservePackageNames = (input: string): { text: string; packageNames: string[] } => {
  const packagePattern = /@[a-z0-9][a-z0-9.-]*\/[a-z0-9][a-z0-9.-]*/gi;
  const packageNames: string[] = [];

  const text = input.replace(packagePattern, (match) => {
    const marker = `__PTK_PACKAGE_${packageNames.length}__`;
    packageNames.push(match);
    return marker;
  });

  return { text, packageNames };
};

const restorePackageNames = (input: string, packageNames: string[]): string => {
  let out = input;
  for (const [index, packageName] of packageNames.entries()) {
    out = out.replaceAll(`__PTK_PACKAGE_${index}__`, packageName);
  }
  return out;
};

const translateWithoutFencedCode = (input: string, translate: (line: string) => string): string => {
  const lines = input.split("\n");
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      continue;
    }

    out.push(translate(line));
  }

  return out.join("\n");
};

/** Group items into chunks that each stay within `budget` characters, never splitting an item. */
const chunkByBudget = (
  items: readonly { id: string; text: string }[],
  budget: number,
): { id: string; text: string }[][] => {
  const chunks: { id: string; text: string }[][] = [];
  let chunk: { id: string; text: string }[] = [];
  let size = 0;
  for (const item of items) {
    if (size + item.text.length > budget && chunk.length > 0) {
      chunks.push(chunk);
      chunk = [];
      size = 0;
    }
    chunk.push(item);
    size += item.text.length;
  }
  if (chunk.length > 0) chunks.push(chunk);
  return chunks;
};

/** Run `tasks` with at most `limit` in flight at once, preserving result order. */
const mapPool = async <T, R>(
  tasks: readonly T[],
  limit: number,
  fn: (task: T, index: number) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = Array.from({ length: tasks.length });
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < tasks.length) {
      const index = next++;
      results[index] = await fn(tasks[index], index);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
};

/**
 * Adapter that shells out to the Claude Code CLI (configurable via `DOCS_TRANSLATION_COMMAND` and
 * `DOCS_TRANSLATION_COMMAND_ARGS`) to produce real prose translations.
 */
export class AiTranslationAdapter implements TranslationAdapter {
  readonly name = "ai";

  private readonly command: string;
  private readonly args: string[];
  private readonly targetLanguage: string;

  constructor(locale = "hu") {
    this.command = process.env.DOCS_TRANSLATION_COMMAND ?? "claude";
    this.args = (process.env.DOCS_TRANSLATION_COMMAND_ARGS ?? "")
      .split(" ")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
    this.targetLanguage = LOCALE_LABELS[locale] ?? locale;
  }

  async translateMarkdown(input: string, filePath: string): Promise<string> {
    const preservedMarkdown = preserveMarkdownSensitiveBlocks(input);
    const preservedPackages = preservePackageNames(preservedMarkdown.text);
    const prompt = [
      `Translate this technical markdown from English to ${this.targetLanguage}.`,
      "Return only the translated markdown.",
      "Rules:",
      "- Keep markdown structure unchanged.",
      "- Do not alter placeholder tokens like __PTK_CODE_BLOCK_#__ or __PTK_INLINE_CODE_#__.",
      "- Do not alter placeholder tokens like __PTK_PACKAGE_#__.",
      "- Preserve whitespace and line breaks.",
      "- Keep import paths, package names, URLs, and identifiers intact.",
      `File: ${filePath}`,
      "--- BEGIN MARKDOWN ---",
      preservedPackages.text,
      "--- END MARKDOWN ---",
    ].join("\n");

    const translated = await this.runClaude(prompt, `markdown file ${filePath}`);
    const restoredPackages = restorePackageNames(translated, preservedPackages.packageNames);
    return restoreMarkdownSensitiveBlocks(
      restoredPackages,
      preservedMarkdown.codeBlocks,
      preservedMarkdown.inlineCodeBlocks,
    );
  }

  async translateText(input: string): Promise<string> {
    const preserved = preservePackageNames(input);
    const prompt = [
      `Translate this technical UI text from English to ${this.targetLanguage}.`,
      "Return only the translation.",
      "Keep identifiers and package names unchanged.",
      "Do not alter placeholder tokens like __PTK_PACKAGE_#__.",
      "Text:",
      preserved.text,
    ].join("\n");

    const translated = (await this.runClaude(prompt, "single text line")).trim();
    return restorePackageNames(translated, preserved.packageNames);
  }

  async translateBatch(
    items: readonly { id: string; text: string }[],
    onChunk?: (partial: Record<string, string>) => void,
  ): Promise<Record<string, string>> {
    // Split into character-budgeted chunks. Each chunk is one `claude -p` call; because the run is
    // generation-bound (the model streaming ~a chunk's worth of translations dominates the fixed
    // startup), running several chunks concurrently is the real wall-clock lever. Smaller chunks keep
    // each JSON response reliable and give finer progress; the pool hides their startup cost.
    const BUDGET = Number(process.env.DOCS_TRANSLATION_BATCH_BUDGET) || 4000;
    const CONCURRENCY = Number(process.env.DOCS_TRANSLATION_CONCURRENCY) || 5;
    const chunks = chunkByBudget(items, BUDGET);

    const out: Record<string, string> = {};
    await mapPool(chunks, CONCURRENCY, async (group) => {
      // A failed chunk must not sink the whole run or poison the cache: log it and skip. Its items go
      // uncached (the caller leaves them as source), so they're retried on the next run.
      try {
        const partial = await this.runBatch(group);
        Object.assign(out, partial);
        // Surface each chunk as it lands so the caller can persist + report progress.
        onChunk?.(partial);
      } catch (error) {
        console.warn(
          `  ! skipped a batch of ${group.length} strings: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    });
    return out;
  }

  /** Translate one chunk of short strings as a single JSON object; fall back per item on failure. */
  private async runBatch(
    items: readonly { id: string; text: string }[],
  ): Promise<Record<string, string>> {
    // Protect code and package names in every value before it reaches the model — prose cells and
    // captions carry inline code and `@scope/pkg` names that must survive verbatim — then restore per
    // id. Without this the batch path (unlike translateMarkdown) would let the model rewrite them.
    const masked = items.map((item) => {
      const markdown = preserveMarkdownSensitiveBlocks(item.text);
      const packages = preservePackageNames(markdown.text);
      return { id: item.id, masked: packages.text, markdown, packages };
    });
    const restore = (entry: (typeof masked)[number], value: string): string =>
      restoreMarkdownSensitiveBlocks(
        restorePackageNames(value, entry.packages.packageNames),
        entry.markdown.codeBlocks,
        entry.markdown.inlineCodeBlocks,
      );

    const payload = Object.fromEntries(masked.map((entry) => [entry.id, entry.masked]));
    const prompt = [
      `Translate the VALUES of this JSON object from English to ${this.targetLanguage}.`,
      "Return ONLY a JSON object with the same keys and translated values.",
      "Do not translate, add, or remove keys. Keep identifiers, package names, and URLs unchanged.",
      "Do not alter placeholder tokens like __PTK_CODE_BLOCK_#__, __PTK_INLINE_CODE_#__, or __PTK_PACKAGE_#__.",
      JSON.stringify(payload, null, 2),
    ].join("\n");

    const raw = await this.runClaude(prompt, `batch of ${items.length} strings`);
    const parsed = extractJsonObject(raw);
    if (parsed) {
      const out: Record<string, string> = {};
      for (const entry of masked) {
        const value = parsed[entry.id];
        // A missing/non-string value restores to the (masked → original) source rather than dropping it.
        out[entry.id] = restore(entry, typeof value === "string" ? value : entry.masked);
      }
      return out;
    }
    // The model didn't return usable JSON; degrade to per-item translation rather than lose content.
    const out: Record<string, string> = {};
    for (const item of items) out[item.id] = await this.translateText(item.text);
    return out;
  }

  private runClaude(prompt: string, scope: string): Promise<string> {
    return spawnPrompt(this.command, [...this.args, "-p"], prompt, scope);
  }
}

/**
 * Build the adapter named by `DOCS_TRANSLATION_ADAPTER` (default `glossary`), targeting `locale`
 * (default `hu`, kept as the default for backward-compatible callers). Throws on an unknown name.
 * Supported values are `glossary` and `ai`.
 */
export const createTranslationAdapter = (locale = "hu"): TranslationAdapter => {
  // A pluggable selector means we can drop in a richer provider later without changing callers.
  const selected = (process.env.DOCS_TRANSLATION_ADAPTER ?? "glossary").toLowerCase();

  if (selected === "glossary") {
    return new GlossaryTranslationAdapter(locale);
  }

  if (selected === "ai") {
    return new AiTranslationAdapter(locale);
  }

  throw new Error(
    `Unsupported DOCS_TRANSLATION_ADAPTER: ${selected}. Supported adapters: glossary, ai`,
  );
};
