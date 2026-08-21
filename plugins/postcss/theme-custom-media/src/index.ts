/**
 * `@pantoken/plugin-theme-custom-media` — author with theme custom-idents
 * (`@media (theme: <name>)`) and/or `@media (--theme-*)` aliases, then emit concrete CSS for a
 * chosen target theme.
 *
 * The plugin expands built-in `--theme-*` and `--breakpoint-*` aliases, prunes non-target theme
 * branches, strips matching `theme:*` clauses from kept queries, unwraps always-true theme-only media
 * wrappers, and removes `@custom-media --theme-*`/`--breakpoint-*` declarations from emitted CSS.
 *
 * @module
 * @beta
 */
import type { AtRule, Plugin } from "postcss";
import { tokens } from "@pantoken/tokens";

/** A theme the plugin can target when emitting concrete CSS. */
export type Theme = "rebrand" | "canvas" | "canvasHighContrast";

/** Options for the theme custom-media plugin. */
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

// ── Breakpoint custom-media ─────────────────────────────────────────────────
// 0.0625em ≈ 1px at a 16px root — keeps a "-down" alias from overlapping the next tier's "-up".
const EM_HAIR = 0.0625;

/** Short name, long-form spelling, and device name for each `--instui-component-tray-width-*` tier. */
const SCALE_TIERS: readonly [short: string, long: string, device: string][] = [
  ["xs", "x-small", "mobile"],
  ["sm", "small", "phablet"],
  ["md", "medium", "tablet"],
  ["lg", "large", "laptop"],
  ["xl", "x-large", "desktop"],
];

/** The main content area's max-width, in em, per theme — hand-authored (not in the token IR). */
const CONTENT_BREAKPOINT_EM: Record<Theme, { content: number; contentFullWidth: number }> = {
  rebrand: { content: 68.75, contentFullWidth: 98.75 }, // 1100px / 1580px
  canvas: { content: 59.25, contentFullWidth: 59.25 },
  canvasHighContrast: { content: 59.25, contentFullWidth: 59.25 },
};

const formatEm = (em: number): string => `${em.toFixed(4).replace(/\.?0+$/u, "")}em`;

const emValue = (tokenName: string): number => {
  const match = /^([\d.]+)em$/u.exec(tokens.find((t) => t.name === tokenName)?.value ?? "");
  if (!match) throw new Error(`@pantoken/tokens: missing or non-em token "${tokenName}"`);
  return Number(match[1]);
};

/** Set `--breakpoint-<name>-up`/`-down` for every alias name sharing one breakpoint value. */
const setBreakpointPair = (
  map: Map<string, string>,
  names: readonly string[],
  em: number,
): void => {
  for (const name of names) {
    map.set(`--breakpoint-${name}-up`, `(min-width: ${formatEm(em)})`);
    map.set(`--breakpoint-${name}-down`, `(max-width: ${formatEm(em - EM_HAIR)})`);
  }
};

// Theme-invariant (tray-width tiers are identical across `rebrand`/`canvas`/`canvasHighContrast`),
// so built once rather than per plugin instantiation.
const SCALE_BREAKPOINT_ALIAS: Map<string, string> = (() => {
  const map = new Map<string, string>();
  for (const [short, long, device] of SCALE_TIERS) {
    setBreakpointPair(
      map,
      [short, long, device],
      emValue(`--instui-component-tray-width-${short}`),
    );
  }
  return map;
})();

/** The full breakpoint alias map for a target theme: the fixed scale tiers plus the theme-dependent content tiers. */
const buildBreakpointAlias = (theme: Theme): Map<string, string> => {
  const map = new Map(SCALE_BREAKPOINT_ALIAS);
  const { content, contentFullWidth } = CONTENT_BREAKPOINT_EM[theme];
  setBreakpointPair(map, ["content"], content);
  setBreakpointPair(map, ["content-full-width"], contentFullWidth);
  return map;
};

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

function lowerMedia(rule: AtRule, theme: Theme, aliasMap: Map<string, string>): void {
  const expanded = Array.from(aliasMap.entries()).reduce(
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
 * Supports authoring with either direct theme custom-idents in media features (for example,
 * `(theme: canvas)`) or built-in `@custom-media --theme-*` aliases.
 *
 * @param options - {@link ThemeCustomMediaOptions}.
 * @returns A PostCSS {@link Plugin}.
 */
export const themeCustomMedia: {
  (options?: ThemeCustomMediaOptions): Plugin;
  /** Required PostCSS plugin marker. */
  postcss: true;
} = Object.assign(
  function themeCustomMedia(options: ThemeCustomMediaOptions = {}): Plugin {
    const theme = options.theme ?? "rebrand";
    const aliasMap = new Map([...THEME_ALIAS, ...buildBreakpointAlias(theme)]);

    return {
      postcssPlugin: "pantoken-theme-custom-media",
      OnceExit(root) {
        root.walkAtRules("media", (rule) => lowerMedia(rule, theme, aliasMap));

        // Remove authoring-time alias declarations from emitted CSS.
        root.walkAtRules("custom-media", (rule) => {
          const [alias] = rule.params.trim().split(/\s+/, 1);
          if (alias && aliasMap.has(alias)) rule.remove();
        });
      },
    };
  },
  { postcss: true as const },
);

export default themeCustomMedia;
