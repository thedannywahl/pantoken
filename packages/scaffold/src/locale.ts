/**
 * Locale detection and message lookup for the scaffold CLI.
 *
 * @module
 * @alpha
 */

/** Resolved locale plus a message lookup function. */
export interface LocaleLookup {
  readonly locale: string;
  /** Looks up `key`, substituting any `{{param}}` placeholders from `params`. */
  t(key: string, params?: Record<string, string>): string;
}

/**
 * Resolves the active locale: --lang flag \> LC_ALL/LANG env \> Intl \> "en".
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
  if (options.langFlag) return options.langFlag;

  // 2. Check environment variables (LC_ALL takes precedence over LANG)
  const env = options.env ?? process.env;
  const locale = env.LC_ALL ?? env.LANG ?? "";
  if (locale) {
    // Extract language code from locale strings like "en_US.UTF-8"
    return locale.split(".")[0].split("_")[0] || "en";
  }

  // 3. Try Intl API
  try {
    const intlFn = options.intl ?? (() => Intl.DateTimeFormat().resolvedOptions().locale);
    const tag = intlFn();
    if (tag) return tag.split("-")[0] || "en";
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
    t(key: string, params?: Record<string, string>): string {
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
