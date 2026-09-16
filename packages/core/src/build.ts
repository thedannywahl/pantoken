/**
 * `buildTokens` — the first and only source transformation. Reads
 * `@instructure/instructure-design-tokens` + `@instructure/ui-icons` and produces the canonical
 * `@property`-aligned {@link Token} IR (icons rolled in), then runs plugin token hooks over it.
 *
 * @module
 */
import { themeTokens } from "@instructure/instructure-design-tokens";
import { applyModify } from "./color.ts";
import { collectIcons } from "./icons.ts";
import { defineToken, runIconPlugins, runTokenPlugins } from "./plugin.ts";
import { collectLeaves, referencedVarName, resolveValue, varName } from "./resolve.ts";
import type { PantokenPlugin } from "./plugin.ts";
import type { Leaf } from "./resolve.ts";
import type { Theme, Token } from "./model.ts";

/** A modifier that cannot be safely resolved into a concrete colour. */
export interface TokenModifierIssue {
  name: string;
  upstreamValue: string;
  rawModifier: unknown;
  reason: string;
}

/** Aggregate failure raised after every malformed modifier in a theme has been collected. */
export class TokenModifierError extends Error {
  constructor(public readonly issues: readonly TokenModifierIssue[]) {
    super(`Unable to resolve ${issues.length} Tokens Studio colour modifier(s)`);
    this.name = "TokenModifierError";
  }
}

/** Options for {@link buildTokens}. */
export interface BuildTokensOptions {
  /** The theme to resolve (default: `"rebrand"`). */
  theme?: Theme;
  /** Plugins whose `tokens` hooks run over the IR (default: none). */
  plugins?: readonly PantokenPlugin[];
  /** Include the icon layer (default: true). */
  includeIcons?: boolean;
  /** Include Instructure-authored (Custom) glyphs (default: true). */
  includeInstui?: boolean;
  /** Include Lucide glyphs (default: true). */
  includeLucide?: boolean;
  /** Resolve a known modifier issue to a reviewed replacement value. */
  resolveModifierIssue?: (issue: TokenModifierIssue) => string | undefined;
}

interface ThemeSpec {
  group: "rebrand" | "canvas";
  light: string;
  dark?: string;
}

const THEME_SPECS: Record<Theme, ThemeSpec> = {
  rebrand: { group: "rebrand", light: "rebrandLight", dark: "rebrandDark" },
  canvas: { group: "canvas", light: "canvas" },
  canvasHighContrast: { group: "canvas", light: "canvasHighContrast" },
};

interface Candidate {
  name: string;
  light: Leaf;
  dark?: Leaf;
}

function toToken(name: string, value: string): Token {
  return defineToken({ name, value });
}

function candidates(prefix: string, root: unknown): Candidate[] {
  return collectLeaves(root).map((light) => ({ name: varName(prefix, light.path), light }));
}

function semanticColorCandidates(group: any, spec: { light: string; dark?: string }): Candidate[] {
  const darkByPath = new Map<string, Leaf>();
  if (spec.dark) {
    for (const leaf of collectLeaves(group?.semantic?.color?.[spec.dark]?.semantic)) {
      darkByPath.set(leaf.path.join("."), leaf);
    }
  }
  return collectLeaves(group?.semantic?.color?.[spec.light]?.semantic).map((light) => ({
    name: varName("", light.path),
    light,
    dark: darkByPath.get(light.path.join(".")),
  }));
}

function componentCandidates(group: any): Candidate[] {
  const out: Candidate[] = [];
  for (const component of Object.values(group?.component ?? {})) {
    out.push(...candidates("component", component));
  }
  return out;
}

function materializeCandidates(
  all: readonly Candidate[],
  resolveIssue?: (issue: TokenModifierIssue) => string | undefined,
): Token[] {
  const byName = new Map(all.map((candidate) => [candidate.name, candidate]));
  const issues = new Map<string, TokenModifierIssue>();
  const memo = new Map<string, string>();

  const report = (candidate: Candidate, leaf: Leaf, reason: string): string => {
    const issue: TokenModifierIssue = {
      name: candidate.name,
      upstreamValue: leaf.value,
      rawModifier: leaf.modifyIssue?.raw ?? leaf.modify,
      reason,
    };
    const key = JSON.stringify(issue);
    issues.set(key, issue);
    return resolveIssue?.(issue) ?? "#000000";
  };

  const resolveColor = (
    candidate: Candidate,
    mode: "light" | "dark",
    active: ReadonlySet<string>,
  ): string => {
    const memoKey = `${mode}:${candidate.name}`;
    const cached = memo.get(memoKey);
    if (cached !== undefined) return cached;
    const leaf = mode === "dark" ? (candidate.dark ?? candidate.light) : candidate.light;
    if (leaf.modifyIssue) return report(candidate, leaf, leaf.modifyIssue.reason);
    if (leaf.type !== "color")
      return report(
        candidate,
        leaf,
        `modified colour chain includes type ${JSON.stringify(leaf.type)}`,
      );
    if (active.has(memoKey)) return report(candidate, leaf, "modified colour reference cycle");

    const reference = referencedVarName(leaf.value);
    let base: string;
    if (reference) {
      const target = byName.get(reference);
      if (!target)
        return report(candidate, leaf, `modified colour references missing token ${reference}`);
      base = resolveColor(target, mode, new Set([...active, memoKey]));
    } else {
      base = leaf.value.trim();
    }

    if (!base.startsWith("#"))
      return report(
        candidate,
        leaf,
        `modified colour resolves to unsupported value ${JSON.stringify(base)}`,
      );
    const value = leaf.modify ? applyModify(base, leaf.modify) : base;
    if (!value) return report(candidate, leaf, "modified colour could not be computed");
    memo.set(memoKey, value);
    return value;
  };

  const tokens = all.map((candidate) => {
    const modified =
      candidate.light.modify !== undefined ||
      candidate.light.modifyIssue !== undefined ||
      candidate.dark?.modify !== undefined ||
      candidate.dark?.modifyIssue !== undefined;
    if (modified) {
      const light = resolveColor(candidate, "light", new Set());
      const dark = resolveColor(candidate, "dark", new Set());
      return toToken(candidate.name, light === dark ? light : `light-dark(${light}, ${dark})`);
    }
    const light = resolveValue(candidate.light.value);
    const dark = resolveValue((candidate.dark ?? candidate.light).value);
    return toToken(candidate.name, light === dark ? light : `light-dark(${light}, ${dark})`);
  });

  if (issues.size > 0 && !resolveIssue) throw new TokenModifierError([...issues.values()]);
  return tokens;
}

// 5. Icons — rolled in as <image> tokens, plus the icon-colour special values.
function iconTokens(opts: { includeInstui: boolean; includeLucide: boolean }): Token[] {
  const { glyphs, colors } = collectIcons(opts);
  const out = glyphs.map((glyph) =>
    defineToken({ name: glyph.name, value: glyph.value, meta: glyph.meta }),
  );
  for (const [name, value] of colors) out.push(toToken(name, value));
  return out;
}

/**
 * Build the canonical token IR for a theme: primitives, layout, semantic colours, component tokens,
 * and optional icons, then run plugin hooks over the result.
 *
 * @param options - {@link BuildTokensOptions}.
 * @returns The resolved, de-duplicated {@link Token} list.
 *
 * @example Build the default (rebrand) IR
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 *
 * const tokens = buildTokens();
 * // → Token[] : { name, syntax, inherits, value, themed?, refersTo?, meta? }
 * ```
 *
 * @example Pick a theme and drop the icon layer
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 *
 * // A smaller, colour/layout-only IR for the canvas theme.
 * const tokens = buildTokens({ theme: "canvas", includeIcons: false });
 * ```
 *
 * @example Run a plugin's tokens hook over the IR
 * ```ts
 * import { buildTokens, type PantokenPlugin } from "@pantoken/core";
 *
 * const brand: PantokenPlugin = {
 *   name: "brand",
 *   tokens: ({ tokens, define }) => [
 *     ...tokens,
 *     define({ name: "--instui-focus-color", value: "var(--instui-color-border-brand)" }),
 *   ],
 * };
 *
 * buildTokens({ theme: "rebrand", plugins: [brand] });
 * ```
 */
export function buildTokens(options: BuildTokensOptions = {}): Token[] {
  return buildTokensFromRoot(themeTokens as unknown as Record<string, any>, options);
}

/** Build tokens from a Tokens Studio root. Exported from the build subpath for validation tooling. */
export function buildTokensFromRoot(
  root: Record<string, any>,
  options: BuildTokensOptions = {},
): Token[] {
  const {
    theme = "rebrand",
    plugins = [],
    includeIcons = true,
    includeInstui = true,
    includeLucide = true,
    resolveModifierIssue,
  } = options;

  const spec = THEME_SPECS[theme];
  const group = root[spec.group];

  const tokenCandidates = [
    ...candidates("primitive", root.primitives?.default),
    ...candidates("", group?.semantic?.layout?.default?.semantic),
    ...semanticColorCandidates(group, spec),
    ...componentCandidates(group),
  ];
  const tokens: Token[] = [
    ...materializeCandidates(tokenCandidates, resolveModifierIssue),
    ...(includeIcons ? iconTokens({ includeInstui, includeLucide }) : []),
  ];

  // 6. Plugin icon hooks only run when the icon layer is enabled; then token hooks always run.
  //    Both stages are guarded (a wrong-stage plugin warns rather than silently doing nothing);
  //    result is de-duped (later wins).
  const withIcons = includeIcons ? runIconPlugins(tokens, plugins, theme) : tokens;
  return runTokenPlugins(withIcons, theme, plugins);
}
