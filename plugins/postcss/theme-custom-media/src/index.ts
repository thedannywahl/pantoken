/**
 * `@pantoken/plugin-theme-custom-media` — author with `@media (--theme-*)`, emit concrete
 * CSS for a chosen target theme.
 *
 * The plugin replaces theme aliases with concrete expressions, prunes non-target theme branches,
 * unwraps always-true theme-only media wrappers, and removes `@custom-media --theme-*` declarations
 * from emitted CSS.
 *
 * @module
 * @beta
 */
import type { AtRule, Plugin } from "postcss";

export type Theme = "rebrand" | "canvas" | "canvasHighContrast";

export interface ThemeCustomMediaOptions {
  /** Target theme to emit (default `"rebrand"`). */
  theme?: Theme;
}

const THEME_ALIAS = new Map<string, string>([
  ["--theme-rebrand", "(theme: rebrand)"],
  ["--theme-canvas", "(theme: canvas)"],
  ["--theme-canvas-high-contrast", "(theme: canvasHighContrast)"],
  ["--theme-light", "(theme: rebrand) and (prefers-color-scheme: light)"],
  ["--theme-dark", "(theme: rebrand) and (prefers-color-scheme: dark)"],
]);

const THEME_FEATURE_RE = /\(\s*theme\s*:\s*(rebrand|canvas|canvasHighContrast)\s*\)/gu;

const splitTopLevel = (input: string, separator: string): string[] => {
  const out: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "(") depth++;
    else if (ch === ")" && depth > 0) depth--;
    else if (ch === separator && depth === 0) {
      out.push(input.slice(start, i).trim());
      start = i + 1;
    }
  }
  out.push(input.slice(start).trim());
  return out.filter(Boolean);
};

const normalizeAndParts = (query: string): string => {
  const parts = splitTopLevel(query, ",");
  if (parts.length > 1) return parts.join(", ");
  const andParts = query
    .split(/\band\b/giu)
    .map((part) => part.trim())
    .filter(Boolean);
  return andParts.join(" and ").trim();
};

interface QueryEval {
  keep: boolean;
  next: string;
}

const evalQuery = (query: string, theme: Theme): QueryEval => {
  const themeMatches = Array.from(query.matchAll(THEME_FEATURE_RE)).map((m) => m[1]);
  if (themeMatches.length === 0) {
    return { keep: true, next: normalizeAndParts(query) };
  }

  // If the query references another theme, this branch never applies for the selected target.
  if (themeMatches.some((name) => name !== theme)) {
    return { keep: false, next: "" };
  }

  // Remove theme clauses for the target theme from the emitted output.
  const withoutTheme = query.replace(THEME_FEATURE_RE, "");
  const next = normalizeAndParts(withoutTheme)
    .replace(/^\s*and\s+/iu, "")
    .replace(/\s+and\s*$/iu, "")
    .trim();

  return { keep: true, next };
};

function lowerMedia(rule: AtRule, theme: Theme): void {
  const expanded = Array.from(THEME_ALIAS.entries()).reduce(
    (params, [alias, expr]) => params.replaceAll(`(${alias})`, expr),
    rule.params,
  );

  const queries = splitTopLevel(expanded, ",");
  const kept = queries
    .map((q) => evalQuery(q, theme))
    .filter((q) => q.keep)
    .map((q) => q.next);
  if (kept.length === 0) {
    rule.remove();
    return;
  }

  // If any query becomes unconditional, `@media` is always true for the target theme.
  if (kept.some((q) => q.length === 0)) {
    rule.replaceWith(...(rule.nodes ?? []));
    return;
  }

  rule.params = kept.join(", ");
}

/**
 * Create the theme custom-media lowering plugin.
 *
 * @param options - {@link ThemeCustomMediaOptions}.
 * @returns A PostCSS {@link Plugin}.
 */
export function themeCustomMedia(options: ThemeCustomMediaOptions = {}): Plugin {
  const theme = options.theme ?? "rebrand";

  return {
    postcssPlugin: "pantoken-theme-custom-media",
    OnceExit(root) {
      root.walkAtRules("media", (rule) => lowerMedia(rule, theme));

      // Remove authoring-time alias declarations from emitted CSS.
      root.walkAtRules("custom-media", (rule) => {
        const [alias] = rule.params.trim().split(/\s+/, 1);
        if (alias && THEME_ALIAS.has(alias)) rule.remove();
      });
    },
  };
}

themeCustomMedia.postcss = true;

export default themeCustomMedia;
