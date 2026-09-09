/**
 * Locale detection and message lookup for the scaffold CLI.
 *
 * @module
 * @alpha
 */
import { InvalidArgumentError } from "commander";
import { LOCALE_DIRS } from "../generated/locale-registry.ts";

/** Every locale tag pantoken supports, as `--lang` accepts them. */
export const SUPPORTED_LOCALES: readonly string[] = Object.keys(LOCALE_DIRS);

/** Resolved locale plus a message lookup function. */
export interface LocaleLookup {
  readonly locale: string;
  /** Looks up `key`, substituting any `{{param}}` placeholders from `params`. */
  t: (key: string, params?: Record<string, string>) => string;
}

/** Normalize a POSIX/Java-style locale (`pt_BR.UTF-8`, `zh_Hans@x`) to a bare BCP47 tag. */
function normalizeTag(raw: string): string {
  return raw.split(".")[0].split("@")[0].replace(/_/gu, "-");
}

/**
 * Match `tag` against the supported registry case-insensitively, preferring the most specific
 * form: the full tag (`pt-BR`), then progressively shorter subtag prefixes (`pt`).
 *
 * @param tag - A BCP47-ish tag, already normalized
 * @returns The registry's canonical spelling, or `undefined` when nothing matches
 */
export function resolveSupportedLocale(tag: string): string | undefined {
  const subtags = normalizeTag(tag).split("-");
  for (let length = subtags.length; length > 0; length -= 1) {
    const candidate = subtags.slice(0, length).join("-").toLowerCase();
    const match = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === candidate);
    if (match) return match;
  }
  return undefined;
}

/** The base text direction for `locale`, defaulting to `ltr` for anything unrecognized. */
export function localeDirection(locale: string): "ltr" | "rtl" {
  return LOCALE_DIRS[locale] ?? "ltr";
}

/**
 * Commander option validator for `--lang`.
 *
 * Unlike ambient detection, an explicit flag must not silently fall back to English — and because
 * the resolved tag is written into scaffolded files (an HTML `lang`/`dir` attribute), constraining
 * it to the registry also keeps arbitrary caller input out of generated markup.
 *
 * @throws InvalidArgumentError if the value isn't a supported locale
 */
export function validateLocaleTag(value: string): string {
  const resolved = resolveSupportedLocale(value);
  if (resolved) return resolved;
  throw new InvalidArgumentError(
    `Language "${value}" is not supported. Expected one of: ${SUPPORTED_LOCALES.join(", ")}.`,
  );
}

/**
 * Resolves the active locale: --lang flag \> LC_ALL/LANG env \> Intl \> "en".
 *
 * Ambient sources (env, Intl) are advisory: an unsupported or region-only tag narrows to its
 * closest supported parent (`pt_BR.UTF-8` → `pt-BR`, `es_MX` → `es`) and falls back to `"en"`.
 *
 * @param options - Detection options. `langFlag` is an optional --lang flag value; `env` is
 * environment variables (defaults to process.env); `intl` is an optional injected
 * Intl.DateTimeFormat locale function (for testing).
 * @returns The resolved locale tag
 */
export function detectLocale(options: {
  langFlag?: string;
  env?: NodeJS.ProcessEnv;
  intl?: () => string;
}): string {
  // 1. Check --lang flag
  if (options.langFlag) return resolveSupportedLocale(options.langFlag) ?? options.langFlag;

  // 2. Check environment variables (LC_ALL takes precedence over LANG)
  const env = options.env ?? process.env;
  const locale = env.LC_ALL ?? env.LANG ?? "";
  if (locale) {
    const resolved = resolveSupportedLocale(locale);
    if (resolved) return resolved;
  }

  // 3. Try Intl API
  try {
    const intlFn = options.intl ?? (() => Intl.DateTimeFormat().resolvedOptions().locale);
    const tag = intlFn();
    const resolved = tag ? resolveSupportedLocale(tag) : undefined;
    if (resolved) return resolved;
  } catch {
    // Intl not available, continue
  }

  // 4. Default to English
  return "en";
}

/**
 * Builds a lookup over the given locale bundles, falling back to `bundles[fallback]`
 * for any key missing in the resolved locale.
 *
 * @param bundles - Record mapping locale tags to string bundles
 * @param resolvedLocale - The locale to use (typically from detectLocale)
 * @param fallback - The fallback locale when a key is missing (default "en")
 * @returns A LocaleLookup object with a `t` function
 */
export function createLocaleLookup(
  bundles: Record<string, Record<string, string>>,
  resolvedLocale: string,
  fallback = "en",
): LocaleLookup {
  const resolved = bundles[resolvedLocale] ?? bundles[fallback] ?? {};
  const fallbackBundle = bundles[fallback] ?? {};

  return {
    locale: resolvedLocale,
    t: (key: string, params?: Record<string, string>): string => {
      let value = resolved[key] ?? fallbackBundle[key] ?? key;

      // Substitute {{param}} placeholders
      if (params) {
        for (const [param, val] of Object.entries(params)) {
          value = value.replace(new RegExp(`\\{\\{${param}\\}\\}`, "g"), val);
        }
      }

      return value;
    },
  };
}
