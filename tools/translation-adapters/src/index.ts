/**
 * Shared primitives for the docs and i18n translation pipelines.
 *
 * Both pipelines shell out to an AI CLI that reads a prompt via stdin and writes a response to
 * stdout. This module owns the spawn mechanism, JSON response parser, and the content-addressed
 * translation-memory core so neither pipeline has to duplicate them.
 *
 * @module
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawn } from "node:child_process";

/**
 * Pull the first `{…}` JSON object out of a model response, tolerating surrounding prose or code
 * fences. Returns `null` when no valid object is found.
 */
export function extractJsonObject(raw: string): Record<string, unknown> | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1)) as unknown;
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/**
 * Spawn an AI command, send `prompt` via stdin, and resolve with the trimmed stdout.
 *
 * The caller is responsible for building `args` — the convention is that `-p` is always the final
 * arg so the `agy-wrapper.sh` can strip it and forward the prompt via agy's own `-p` flag.
 *
 * @param command - The executable (e.g. `"claude"` or a path to `agy-wrapper.sh`).
 * @param args    - Extra flags plus the terminal `-p` sentinel (e.g. `["--model", "x", "-p"]`).
 * @param prompt  - The prompt text; written to the child's stdin then the pipe is closed.
 * @param context - Optional label for the error message (e.g. `"locale 'hu'"` or `"foo.md"`).
 */
export function spawnPrompt(
  command: string,
  args: string[],
  prompt: string,
  context?: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    let err = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      out += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      err += chunk;
    });
    // Cast to a minimal shape: ChildProcessByStdio omits .on() in @types/node ≥ 22.
    const proc = child as unknown as {
      on(event: "error", listener: (e: Error) => void): void;
      on(event: "close", listener: (code: number | null) => void): void;
    };
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code !== 0) {
        const where = context ? ` for ${context}` : "";
        reject(new Error(`AI command exited ${String(code)}${where}: ${err.trim()}`));
      } else {
        resolve(out.trimEnd());
      }
    });
    child.stdin.end(prompt);
  });
}

// ── Translation memory ────────────────────────────────────────────────────────

interface CacheFile {
  version: 1;
  entries: Record<string, string>;
}

/**
 * Content-addressed translation cache backed by a committed JSON file.
 *
 * Pipeline-specific facades (docs, i18n) wrap this with their own key-construction logic and
 * factory method — neither `get` nor `set` here computes a key; callers pass pre-computed hashes.
 *
 * Set `prune: true` (docs) to discard entries not touched this session on `save()` — keeps the
 * cache from accumulating stale keys after source content is deleted. Leave it off (i18n) to
 * preserve all entries across runs.
 */
export class TranslationMemory {
  readonly path: string;
  private readonly _entries: Map<string, string>;
  private readonly _prune: boolean;
  private readonly _used = new Set<string>();
  hits = 0;

  private constructor(path: string, entries: Map<string, string>, prune: boolean) {
    this.path = path;
    this._entries = entries;
    this._prune = prune;
  }

  /** Open (or create) a memory backed by `path`. */
  static open(path: string, options?: { prune?: boolean }): TranslationMemory {
    if (!existsSync(path)) return new TranslationMemory(path, new Map(), options?.prune ?? false);
    const parsed = JSON.parse(readFileSync(path, "utf8")) as CacheFile;
    return new TranslationMemory(
      path,
      new Map(Object.entries(parsed.entries ?? {})),
      options?.prune ?? false,
    );
  }

  /** Return a cached value and record a hit; returns `undefined` on a miss. */
  get(key: string): string | undefined {
    const val = this._entries.get(key);
    if (val !== undefined) {
      this._used.add(key);
      this.hits++;
    }
    return val;
  }

  /** Store a translated value and mark the key as used. */
  set(key: string, value: string): void {
    this._entries.set(key, value);
    this._used.add(key);
  }

  /** True when the key is present (no counter side-effects). */
  has(key: string): boolean {
    return this._entries.has(key);
  }

  /** Iterate all stored keys. */
  keys(): IterableIterator<string> {
    return this._entries.keys();
  }

  /** Write entries to disk, optionally pruning to only the keys touched this session. */
  save(): void {
    const source = this._prune ? [...this._used].sort() : [...this._entries.keys()].sort();
    const out: Record<string, string> = {};
    for (const key of source) {
      const val = this._entries.get(key);
      if (val !== undefined) out[key] = val;
    }
    mkdirSync(dirname(this.path), { recursive: true });
    writeFileSync(this.path, `${JSON.stringify({ version: 1, entries: out }, null, 2)}\n`);
  }
}

/** Compute a SHA-256 hex digest of `input`. */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

/**
 * True when `translated` is just `source` echoed back (trimmed, case-insensitive) — the shape a
 * silently-failing AI adapter tends to produce: it exits 0 with syntactically valid JSON, so nothing
 * else flags the run as unhealthy.
 */
export function isPassthroughTranslation(source: string, translated: string): boolean {
  return source.trim().toLowerCase() === translated.trim().toLowerCase();
}

// ── CLI translation runner ────────────────────────────────────────────────────

/** Options for {@link runI18nTranslationCli}. */
export interface I18nTranslationOptions {
  /** Label shown in the startup banner, e.g. `"@pantoken/scaffold strings"`. */
  label: string;
  /** The English source key → string map to translate from. */
  source: Record<string, string>;
  /** Target locale codes to translate into (`"en"` is always skipped, it's the source). */
  targetLocales: string[];
  /** Resolve the on-disk cache path for a locale, e.g. `i18n-cache/\${locale}.json`. */
  cachePath: (locale: string) => string;
  /**
   * Whether `key` is already present in `cache`. Defaults to a plain `key in cache` check;
   * override to also recognize a legacy hash-keyed cache (see `sha256`).
   */
  isCached?: (key: string, cache: Record<string, string>) => boolean;
  /**
   * Read `key`'s current cached value, for the passthrough audit. Defaults to `cache[key]`;
   * override alongside a custom `isCached` when a legacy cache stores values under `sha256(key)`.
   */
  cachedValue?: (key: string, cache: Record<string, string>) => string | undefined;
}

/**
 * Drop any entry from `cache` whose value is an untranslated echo of its English source, so it's
 * retranslated this run instead of sitting there looking done forever. Returns the reset keys.
 */
function resetPassthroughEntries(
  cache: Record<string, string>,
  source: Record<string, string>,
  cachedValue: (key: string, cache: Record<string, string>) => string | undefined,
): string[] {
  const reset: string[] = [];
  for (const key of Object.keys(source)) {
    const current = cachedValue(key, cache);
    if (current !== undefined && isPassthroughTranslation(source[key], current)) {
      delete cache[key];
      delete cache[sha256(key)];
      reset.push(key);
    }
  }
  return reset;
}

/** Translate `locale`'s missing keys (per `isCached`) and merge/save the result into its cache file. */
async function translateLocale(
  locale: string,
  command: string,
  commandArgs: string[],
  options: I18nTranslationOptions,
  isCached: (key: string, cache: Record<string, string>) => boolean,
): Promise<void> {
  const cacheFile = resolve(options.cachePath(locale));
  let cache: Record<string, string>;
  try {
    cache = JSON.parse(readFileSync(cacheFile, "utf8"));
  } catch {
    console.log(`Creating new cache for locale: ${locale}`);
    cache = {};
  }

  const cachedValue = options.cachedValue ?? ((key: string, c: Record<string, string>) => c[key]);
  const resetKeys = resetPassthroughEntries(cache, options.source, cachedValue);
  if (resetKeys.length > 0) {
    console.warn(
      `⚠ ${locale}: reset ${resetKeys.length} previously-cached entr${resetKeys.length === 1 ? "y" : "ies"} that matched the English source (will retry): ${resetKeys.join(", ")}`,
    );
  }

  const missingKeys = Object.keys(options.source).filter((key) => !isCached(key, cache));
  if (missingKeys.length === 0) {
    console.log(`✓ ${locale}: all strings translated`);
    return;
  }

  console.log(`🔄 ${locale}: translating ${missingKeys.length} new string(s)...`);

  const stringsList = missingKeys.map((k) => `- "${k}": "${options.source[k]}"`).join("\n");
  const prompt = `Translate these UI strings from English into ${locale} (for a CLI):

${stringsList}

Respond with a JSON object mapping each original key to its translation, using the exact same keys. Only the translations, nothing else.`;

  try {
    const result = await spawnPrompt(command, [...commandArgs, "-p"], prompt, `locale "${locale}"`);

    const translated = extractJsonObject(result);
    if (!translated) {
      throw new Error(`AI response could not be parsed as JSON for locale "${locale}".`);
    }

    const suspectKeys: string[] = [];
    let saved = 0;
    for (const key of missingKeys) {
      const value = translated[key];
      if (typeof value !== "string" || value.trim().length === 0) {
        suspectKeys.push(`${key} (missing or empty)`);
      } else if (isPassthroughTranslation(options.source[key], value)) {
        suspectKeys.push(`${key} (identical to source)`);
      } else {
        cache[key] = value;
        saved++;
      }
    }
    if (suspectKeys.length > 0) {
      console.warn(
        `⚠ ${locale}: ${suspectKeys.length} response(s) not cached, will retry next run: ${suspectKeys.join(", ")}`,
      );
    }

    writeFileSync(cacheFile, JSON.stringify(cache, null, 2) + "\n", "utf8");
    console.log(`✓ ${locale}: saved ${saved} translation(s)\n`);
  } catch (err) {
    console.error(`❌ Failed to translate for locale ${locale}:`, err);
    process.exit(1);
  }
}

/**
 * Shell out to an AI CLI to translate every source string missing from each target locale's
 * on-disk cache, merging the results back in. Shared by `ai/pantoken-ai/scripts/translate.ts` and
 * `packages/scaffold/scripts/translate.ts`, whose i18n CLIs both translate a flat key → string map
 * the same way, differing only in where the source strings and cache files come from.
 *
 * Reads `I18N_TRANSLATION_ADAPTER`/`I18N_TRANSLATION_COMMAND`/`I18N_TRANSLATION_COMMAND_ARGS` env
 * vars to choose the model/command, matching both callers' existing conventions.
 * `I18N_TRANSLATION_FORCE=1` bypasses `isCached` entirely — every key is retranslated and its
 * cached value overwritten, even if already present — for a forced refresh after fixing an adapter
 * bug or a bad translation. Exits the process with code 1 if a locale's translation request fails.
 */
export async function runI18nTranslationCli(options: I18nTranslationOptions): Promise<void> {
  const adapter = process.env.I18N_TRANSLATION_ADAPTER || "ai";
  const command = process.env.I18N_TRANSLATION_COMMAND ?? "claude";
  const commandArgs = (process.env.I18N_TRANSLATION_COMMAND_ARGS ?? "")
    .split(" ")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const force = process.env.I18N_TRANSLATION_FORCE === "1";
  const isCached = force ? () => false : (options.isCached ?? ((key, cache) => key in cache));

  console.log(`📋 Translating ${options.label} (${adapter})\n`);

  for (const locale of options.targetLocales) {
    if (locale === "en") continue; // Skip English, it's the source
    await translateLocale(locale, command, commandArgs, options, isCached);
  }

  console.log(`✨ All translations complete!`);
}

// ── Locale bundle codegen ──────────────────────────────────────────────────────

/**
 * Generate one `LOCALE_<CODE>.ts` module per `<code>.json` file in `<root>/i18n-cache`, plus an
 * `index.ts` importing and re-exporting them all as `LOCALES`, into `<outDir>/locales`. Logs a
 * one-line summary of the locales it produced (nothing when the cache directory doesn't exist yet).
 *
 * Shared by `ai/pantoken-ai/scripts/generate.ts` and `packages/scaffold/scripts/generate.ts`, whose
 * CLI i18n setups both bake a translated `i18n-cache/` into a generated locale bundle the same way.
 *
 * @param root - Package root containing `i18n-cache/`.
 * @param outDir - The package's `generated/` directory; bundles are written under its `locales/`.
 */
export function generateLocaleBundles(root: string, outDir: string): void {
  const i18nCacheDir = join(root, "i18n-cache");
  const localesDir = join(outDir, "locales");
  mkdirSync(localesDir, { recursive: true });

  const localeMap: Record<string, string> = {};
  try {
    const cacheFiles = readdirSync(i18nCacheDir);
    for (const file of cacheFiles) {
      if (!file.endsWith(".json")) continue;
      const locale = file.slice(0, -".json".length);
      const cachePath = join(i18nCacheDir, file);
      const bundle = JSON.parse(readFileSync(cachePath, "utf8"));

      // Hyphenated locale tags (e.g. "en-AU") aren't valid JS identifier suffixes.
      const varName = `LOCALE_${locale.toUpperCase().replaceAll("-", "_")}`;
      const tsContent = `// GENERATED by scripts/generate.ts — do not edit by hand.\nexport const ${varName} = ${JSON.stringify(
        bundle,
        null,
        2,
      )} as const;\n`;
      writeFileSync(join(localesDir, `${locale}.ts`), tsContent);
      localeMap[locale] = varName;
    }
  } catch {
    // i18n-cache directory doesn't exist yet, that's okay
  }

  const indexContent = `// GENERATED by scripts/generate.ts — do not edit by hand.
${Object.entries(localeMap)
  .map(([locale, varName]) => `import { ${varName} } from "./${locale}.js";`)
  .join("\n")}

export const LOCALES: Record<string, Record<string, string>> = {
${Object.entries(localeMap)
  .map(([locale, varName]) => `  ${JSON.stringify(locale)}: ${varName},`)
  .join("\n")}
};
`;
  writeFileSync(join(localesDir, "index.ts"), indexContent);

  const locales = Object.keys(localeMap);
  if (locales.length > 0) {
    console.log(`✓ generated locale bundles for: ${locales.join(", ")}`);
  }
}
