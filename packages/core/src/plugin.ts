/**
 * Runtime helpers for the pantoken plugin pipeline. The plugin *contract* (types) lives in
 * `@pantoken/model` so emitters can depend on it without pulling the upstream token package; the
 * *runtime* (token-stage runner, `defineToken`) lives here.
 *
 * @module
 */
import { checkPlugins } from "@pantoken/plugin-kit";
import { sanitizeSvg } from "@pantoken/utils";
import { svgToDataUri } from "./icons.ts";
import { cssSyntaxForValue, isContextual } from "./utils.ts";
import type {
  IconEntry,
  IconResolver,
  PantokenPlugin,
  Theme,
  Token,
  TokenInput,
} from "@pantoken/model";

export type {
  CssContribution,
  CssHookContext,
  IconEntry,
  IconHookContext,
  IconResolver,
  PantokenPlugin,
  RehypeHookContext,
  TokenHookContext,
} from "@pantoken/model";

/**
 * Build a fully-formed {@link Token} from partial input, defaulting `inherits` and `syntax`.
 *
 * @example Sniff syntax from a concrete value
 * ```ts
 * import { defineToken } from "@pantoken/core";
 *
 * defineToken({ name: "--instui-color-x", value: "#0374B5" });
 * // → { name: "--instui-color-x", syntax: "<color>", inherits: true, value: "#0374B5" }
 * ```
 *
 * @example A single var() value records refersTo; a light-dark() sets themed
 * ```ts
 * import { defineToken } from "@pantoken/core";
 *
 * defineToken({ name: "--instui-brand", value: "var(--instui-color-background-brand)" });
 * // → syntax "*", refersTo: "--instui-color-background-brand"
 *
 * defineToken({ name: "--instui-bg", value: "light-dark(#fff, #000)" });
 * // → syntax "*", themed: true
 * ```
 */
export function defineToken(input: TokenInput): Token {
  const contextual = isContextual(input.value);
  const refMatch = input.value.match(/^var\((--instui-[\w-]+)\)$/);
  return {
    name: input.name,
    syntax: input.syntax ?? (contextual ? "*" : cssSyntaxForValue(input.value)),
    inherits: input.inherits ?? true,
    value: input.value,
    ...(input.themed || input.value.startsWith("light-dark(") ? { themed: true } : {}),
    ...((input.refersTo ?? refMatch) ? { refersTo: input.refersTo ?? refMatch?.[1] } : {}),
    ...(input.meta ? { meta: input.meta } : {}),
  };
}

/**
 * De-duplicate tokens by name, keeping the last occurrence (so later plugins win).
 *
 * @example
 * ```ts
 * import { dedupeByName } from "@pantoken/core";
 * import type { Token } from "@pantoken/model";
 *
 * const tokens: Token[] = [
 *   { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
 *   { name: "--instui-x", syntax: "<color>", inherits: true, value: "#000" },
 * ];
 * dedupeByName(tokens); // → one token, value "#000" (the later wins)
 * ```
 */
export function dedupeByName(tokens: Token[]): Token[] {
  const byName = new Map<string, Token>();
  for (const token of tokens) byName.set(token.name, token);
  return [...byName.values()];
}

/** Valid CSS custom property name pattern — names outside this are CSS-injection vectors. */
const CUSTOM_PROP_RE = /^--[\w\u0080-\uFFFF][\w\u0080-\uFFFF-]*$/;
const DATA_SVG_PREFIX = "data:image/svg+xml;utf8,";

/** Sanitize the SVG embedded in an <image> token data-URI and return the cleaned token value. */
function sanitizeImageToken(value: string): string {
  const inner = /^url\(\s*'?(.*?)'?\s*\)$/.exec(value.trim())?.[1] ?? value;
  if (!inner.startsWith(DATA_SVG_PREFIX)) return value;
  try {
    const svg = sanitizeSvg(decodeURIComponent(inner.slice(DATA_SVG_PREFIX.length)));
    return `url('${DATA_SVG_PREFIX}${encodeURIComponent(svg)}')`;
  } catch {
    return value;
  }
}

/**
 * Run every plugin's `tokens` hook in order. Each hook receives the current list and returns the
 * full replacement; the result is de-duplicated by name.
 *
 * @example
 * ```ts
 * import { runTokenPlugins, type PantokenPlugin } from "@pantoken/core";
 * import type { Token } from "@pantoken/model";
 *
 * const base: Token[] = [
 *   { name: "--instui-x", syntax: "<color>", inherits: true, value: "#fff" },
 * ];
 * const addBrand: PantokenPlugin = {
 *   name: "brand",
 *   tokens: ({ tokens, define }) => [
 *     ...tokens,
 *     define({ name: "--instui-brand", value: "#0374B5" }),
 *   ],
 * };
 *
 * runTokenPlugins(base, "rebrand", [addBrand]); // → base + the --instui-brand token
 * ```
 */
export function runTokenPlugins(
  tokens: Token[],
  theme: Theme,
  plugins: readonly PantokenPlugin[],
): Token[] {
  let acc = tokens;
  for (const plugin of checkPlugins(plugins, "tokens")) {
    const result = plugin.tokens?.({ tokens: acc, theme, define: defineToken });
    if (!Array.isArray(result)) continue;
    // Validate token names and sanitize <image> SVG values before accepting into the IR.
    const validated: Token[] = [];
    for (const token of result) {
      if (!CUSTOM_PROP_RE.test(token.name)) {
        console.warn(
          `[pantoken] Plugin "${plugin.name}" returned a token with an invalid name "${token.name}" — dropping.`,
        );
        continue;
      }
      if (token.syntax === "<image>" && token.value.includes(DATA_SVG_PREFIX))
        validated.push({ ...token, value: sanitizeImageToken(token.value) });
      else validated.push(token);
    }
    acc = validated;
  }
  return dedupeByName(acc);
}

/** Turn an {@link IconEntry} into an `<image>` icon token, or `undefined` if it has no artwork. */
function iconEntryToToken(entry: IconEntry): Token | undefined {
  const svg =
    entry.svg ??
    (entry.path
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${entry.viewBox ?? "0 0 24 24"}"><path d="${entry.path}"/></svg>`
      : undefined);
  if (!svg) return undefined;
  return defineToken({
    name: `--instui-icon-${entry.name}`,
    value: svgToDataUri(svg),
    syntax: "<image>",
    meta: { kind: "icon" },
  });
}

/**
 * Run every plugin's `icons` hook, letting plugins register extra glyphs as `<image>` tokens. Each
 * hook gets an `add` (collects entries) and a `resolve` (looks up the current icon set). The result
 * is de-duplicated by name.
 *
 * @example Register an extra glyph as an <image> token
 * ```ts
 * import { runIconPlugins, type PantokenPlugin } from "@pantoken/core";
 * import type { Token } from "@pantoken/model";
 *
 * const base: Token[] = [];
 * const star: PantokenPlugin = {
 *   name: "star",
 *   icons: ({ add }) => add({ name: "star", path: "M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" }),
 * };
 *
 * const tokens = runIconPlugins(base, [star]);
 * // → adds a --instui-icon-star token whose value is a data-URI SVG
 * ```
 */
export function runIconPlugins(tokens: Token[], plugins: readonly PantokenPlugin[]): Token[] {
  const active = checkPlugins(plugins, "icons");
  if (active.length === 0) return tokens;

  const added: Token[] = [];
  const has = (name: string): boolean =>
    tokens.some((t) => t.name === name) || added.some((t) => t.name === name);
  const resolve: IconResolver = (code) =>
    has(`--instui-icon-${code}`) ? { name: code } : undefined;
  const add = (entry: IconEntry): void => {
    // Sanitize plugin-contributed SVG before encoding into the IR.
    const sanitized: IconEntry = entry.svg ? { ...entry, svg: sanitizeSvg(entry.svg) } : entry;
    const token = iconEntryToToken(sanitized);
    if (token) added.push(token);
  };

  for (const plugin of active) plugin.icons?.({ add, resolve });
  return added.length ? dedupeByName([...tokens, ...added]) : tokens;
}
