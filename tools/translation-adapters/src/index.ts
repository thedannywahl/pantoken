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

// The configurable drift-severity policy every `check-drift` script reports through. Re-exported here
// so a checker needs one import for both the translation primitives and the gate.
export {
  DEFAULT_DRIFT_POLICY,
  DriftReporter,
  loadDriftPolicy,
  parseDriftPolicy,
  repoRelative,
  resetDriftPolicyCache,
  resolveDriftSeverity,
  resolveTier,
  type DriftFinding,
  type DriftPolicy,
  type DriftReporterOptions,
  type DriftSeverity,
  type SurfacePolicy,
} from "./drift-policy.ts";

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
 * @param options - `timeoutMs` kills the child and rejects if it hasn't closed in time (no timeout
 *   by default, preserving existing callers' behavior).
 */
export function spawnPrompt(
  command: string,
  args: string[],
  prompt: string,
  context?: string,
  options?: { timeoutMs?: number },
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] });
    let out = "";
    let err = "";
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (options?.timeoutMs !== undefined) {
      timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        child.kill("SIGKILL");
        const where = context ? ` for ${context}` : "";
        reject(new Error(`AI command timed out after ${String(options.timeoutMs)}ms${where}`));
      }, options.timeoutMs);
    }
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
    proc.on("error", (e) => {
      clearTimeout(timer);
      if (settled) return;
      settled = true;
      reject(e);
    });
    proc.on("close", (code) => {
      clearTimeout(timer);
      if (settled) return;
      settled = true;
      const where = context ? ` for ${context}` : "";
      if (code !== 0) {
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

/**
 * A key's verbatim policy: `"required"` copies the English source without invoking the translator,
 * while `"allow"` permits every locale to legitimately match the English source after translation;
 * otherwise a per-tier list of locale patterns (an exact code like `"en-GB"`, a `"prefix*"` glob, or
 * `"*"` for every locale) decides the outcome for a locale whose response is identical to the
 * source — `required` skips translation and copies it, `allow` caches it silently, `warn` caches it
 * but logs a note, and an explicit `error` tier match forces retranslation even over a
 * caller-supplied default policy. A locale matched by none of the tiers falls through to that default
 * policy (see {@link resolveVerbatimAction}); still unmatched is the strict default: not cached,
 * retried next run. Omitting `verbatim` entirely is equivalent to no tiers at all.
 */
export type VerbatimPolicy =
  | "required"
  | "allow"
  | {
      required?: readonly string[];
      allow?: readonly string[];
      warn?: readonly string[];
      error?: readonly string[];
    };

/** True when `locale` matches a verbatim-policy pattern: an exact code, a `"prefix*"` glob, or `"*"`. */
function localeMatchesPattern(pattern: string, locale: string): boolean {
  if (pattern === "*") return true;
  return pattern.endsWith("*") ? locale.startsWith(pattern.slice(0, -1)) : pattern === locale;
}

/**
 * Derive one `"<lang>*"` glob per unique base language present in `locales` (e.g. the ~47 keys of
 * `LOCALES` from `@pantoken/i18n`), for building a {@link VerbatimPolicy}'s `allow`/`warn`/`error`
 * lists without hand-typing every regional variant. `"en-GB"` and `"en-AU"` both collapse to
 * `"en*"`; a locale with no region subtag (e.g. `"hu"`) becomes `"hu*"` too. Returned sorted and
 * deduped — callers pick which families go in which tier, e.g.
 * `{ allow: localeFamilyGlobs(["en-GB", "en-AU"]) }`.
 */
export function localeFamilyGlobs(locales: readonly string[]): string[] {
  const families = new Set(locales.map((locale) => locale.split("-")[0]));
  return [...families].sort().map((lang) => `${lang}*`);
}

/** Render `keys` as an indented bullet list (one per line) for legible multi-key console warnings. */
function formatKeyList(keys: readonly string[]): string {
  return keys.map((key) => `  - ${key}`).join("\n");
}

/** Check a single non-shorthand policy's tiers for `locale`, with explicit errors taking precedence. */
function matchPolicyTiers(
  policy: Exclude<VerbatimPolicy, "required" | "allow">,
  locale: string,
): "required" | "allow" | "warn" | "error" | undefined {
  if (policy.error?.some((p) => localeMatchesPattern(p, locale))) return "error";
  if (policy.required?.some((p) => localeMatchesPattern(p, locale))) return "required";
  if (policy.allow?.some((p) => localeMatchesPattern(p, locale))) return "allow";
  if (policy.warn?.some((p) => localeMatchesPattern(p, locale))) return "warn";
  return undefined;
}

/**
 * Resolve what a passthrough (identical-to-source) value should do for `locale`, given a key's
 * declared `policy` and an optional `defaultPolicy` fallback. `policy`'s own tiers are checked
 * first (its `error` tier always wins, even over a permissive default); if none of its tiers match
 * `locale`, `defaultPolicy`'s tiers are checked the same way. Still no match (or both are
 * `undefined`) is the strict default: `"error"`.
 */
export function resolveVerbatimAction(
  policy: VerbatimPolicy | undefined,
  locale: string,
  defaultPolicy?: VerbatimPolicy,
): "required" | "allow" | "warn" | "error" {
  if (policy === "required") return "required";
  if (policy === "allow") return "allow";
  const matched = policy && matchPolicyTiers(policy, locale);
  if (matched !== undefined) return matched;
  if (defaultPolicy === "required") return "required";
  if (defaultPolicy === "allow") return "allow";
  return (defaultPolicy && matchPolicyTiers(defaultPolicy, locale)) ?? "error";
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
  /**
   * Per-key verbatim policies (see {@link VerbatimPolicy}), typically produced by
   * the source message map came from. For a locale not
   * covered by a key's own tiers, resolution falls through to `defaultVerbatim` (if set), then the
   * strict default: identical output is treated as a likely AI failure for every locale.
   */
  verbatim?: Record<string, VerbatimPolicy>;
  /**
   * A fallback {@link VerbatimPolicy} applied to every locale not covered by a key's own `verbatim`
   * tiers — e.g. a blanket "these language families are close enough to English that an identical
   * response isn't necessarily a translator failure" rule, built with {@link localeFamilyGlobs}. A
   * key's own `error` tier still wins over this default for a matching locale.
   */
  defaultVerbatim?: VerbatimPolicy;
}

/**
 * Drop any entry from `cache` whose value is an untranslated echo of its English source and whose
 * key resolves to the `"error"` tier for `locale`, so it's retranslated this run instead of sitting
 * there looking done forever. A `"warn"`-tier match is left cached but reported. Returns the reset
 * and warned keys.
 */
function resetPassthroughEntries(
  cache: Record<string, string>,
  source: Record<string, string>,
  cachedValue: (key: string, cache: Record<string, string>) => string | undefined,
  verbatim: Record<string, VerbatimPolicy>,
  defaultVerbatim: VerbatimPolicy | undefined,
  locale: string,
): { reset: string[]; warned: string[] } {
  const reset: string[] = [];
  const warned: string[] = [];
  for (const key of Object.keys(source)) {
    const current = cachedValue(key, cache);
    if (current === undefined || !isPassthroughTranslation(source[key], current)) continue;
    const action = resolveVerbatimAction(verbatim[key], locale, defaultVerbatim);
    if (action === "required" || action === "allow") continue;
    if (action === "warn") {
      warned.push(key);
      continue;
    }
    delete cache[key];
    delete cache[sha256(key)];
    reset.push(key);
  }
  return { reset, warned };
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
  const verbatim = options.verbatim ?? {};
  const { reset: resetKeys, warned: warnedResetKeys } = resetPassthroughEntries(
    cache,
    options.source,
    cachedValue,
    verbatim,
    options.defaultVerbatim,
    locale,
  );
  if (resetKeys.length > 0) {
    console.warn(
      `⚠ ${locale}: reset ${resetKeys.length} previously-cached entr${resetKeys.length === 1 ? "y" : "ies"} that matched the English source (will retry):\n${formatKeyList(resetKeys)}`,
    );
  }
  if (warnedResetKeys.length > 0) {
    console.warn(
      `⚠ ${locale}: ${warnedResetKeys.length} cached entr${warnedResetKeys.length === 1 ? "y matches" : "ies match"} the English source (verbatim policy: warn):\n${formatKeyList(warnedResetKeys)}`,
    );
  }

  const requiredKeys = new Set(
    Object.keys(options.source).filter(
      (key) => resolveVerbatimAction(verbatim[key], locale, options.defaultVerbatim) === "required",
    ),
  );
  let copiedRequired = false;
  for (const key of requiredKeys) {
    const legacyKey = sha256(key);
    if (cache[key] !== options.source[key] || legacyKey in cache) copiedRequired = true;
    delete cache[legacyKey];
    cache[key] = options.source[key];
  }

  const missingKeys = Object.keys(options.source).filter(
    (key) => !requiredKeys.has(key) && !isCached(key, cache),
  );
  if (missingKeys.length === 0) {
    if (copiedRequired) writeFileSync(cacheFile, JSON.stringify(cache, null, 2) + "\n", "utf8");
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
    const warnedKeys: string[] = [];
    let saved = 0;
    for (const key of missingKeys) {
      const value = translated[key];
      if (typeof value !== "string" || value.trim().length === 0) {
        suspectKeys.push(`${key} (missing or empty)`);
        continue;
      }
      if (isPassthroughTranslation(options.source[key], value)) {
        const action = resolveVerbatimAction(verbatim[key], locale, options.defaultVerbatim);
        if (action === "error") {
          suspectKeys.push(`${key} (identical to source)`);
          continue;
        }
        if (action === "warn") warnedKeys.push(key);
      }
      cache[key] = value;
      saved++;
    }
    if (suspectKeys.length > 0) {
      console.warn(
        `⚠ ${locale}: ${suspectKeys.length} response(s) not cached, will retry next run:\n${formatKeyList(suspectKeys)}`,
      );
    }
    if (warnedKeys.length > 0) {
      console.warn(
        `⚠ ${locale}: ${warnedKeys.length} response(s) identical to the English source (verbatim policy: warn), cached anyway:\n${formatKeyList(warnedKeys)}`,
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

export const MESSAGES: Record<string, Record<string, string>> = {
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
