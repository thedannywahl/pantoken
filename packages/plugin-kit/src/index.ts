/**
 * `@pantoken/plugin-kit` — build and compose pantoken plugins, with capability-aware registration.
 *
 * {@link definePlugin} is the modern factory: pass the hooks you implement and it returns a normal
 * `PantokenPlugin` branded with the capabilities inferred from those hooks. Consumers
 * (`buildTokens`, `toCss`) run {@link checkPlugins} to warn — never error — when a plugin is
 * registered where it has no effect: a non-factoried plugin (capability checks unavailable) or a
 * factoried plugin at a stage it doesn't implement (e.g. a token-only plugin passed to `toCss`).
 *
 * The transform stages a `plugins:` array actually drives are `tokens`, `icons`, and `css`; `rehype`
 * (a render-time icon resolver) and `native` (Style Dictionary) are recorded as capabilities but are
 * downstream consumers, not guarded here.
 *
 * @example
 * ```ts
 * const brand = definePlugin({ name: "brand", tokens: (c) => [...c.tokens], css: () => ({ ... }) });
 * // capabilitiesOf(brand) → ["tokens", "css"]
 * ```
 *
 * @module
 * @beta
 */
import type { CssContribution, IconResolver, PantokenPlugin } from "@pantoken/model";

/** The plugin hook stages, recorded as capabilities. */
export type Stage = "tokens" | "icons" | "css" | "rehype" | "native";

const STAGES: readonly Stage[] = ["tokens", "icons", "css", "rehype", "native"];
const BRAND = Symbol.for("pantoken.plugin");

interface Branded {
  [BRAND]?: { capabilities: Stage[] };
}

const hasHook = (plugin: PantokenPlugin, stage: Stage): boolean =>
  typeof plugin[stage] === "function";

/**
 * Create a pantoken plugin from its hooks. The result is a normal `PantokenPlugin` branded with the
 * capabilities inferred from the hooks you provided.
 *
 * @param config - The plugin `name` plus any of the `tokens`/`icons`/`css`/`rehype`/`native` hooks.
 * @returns A branded {@link PantokenPlugin}.
 *
 * @example A unified tokens + css plugin
 * ```ts
 * import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";
 *
 * const brand = definePlugin({
 *   name: "@acme/brand",
 *   tokens: (ctx) => [
 *     ...ctx.tokens,
 *     ctx.define({ name: "--instui-brand", value: "var(--instui-color-background-brand)" }),
 *   ],
 *   css: () => ({ append: ":root { color-scheme: light dark; }" }),
 * });
 *
 * capabilitiesOf(brand); // → ["tokens", "css"]
 * ```
 */
export function definePlugin(config: PantokenPlugin): PantokenPlugin {
  const capabilities = STAGES.filter((stage) => hasHook(config, stage));
  return Object.assign({}, config, { [BRAND]: { capabilities } });
}

/**
 * True when a plugin was created by {@link definePlugin} (or {@link extendPlugin}).
 *
 * @example
 * ```ts
 * import { definePlugin, isFactoried } from "@pantoken/plugin-kit";
 *
 * isFactoried(definePlugin({ name: "brand", css: () => ({}) })); // → true
 * isFactoried({ name: "hand-written", css: () => ({}) });        // → false
 * ```
 */
export function isFactoried(plugin: PantokenPlugin): boolean {
  return Boolean((plugin as Branded)[BRAND]);
}

/**
 * The capabilities a factoried plugin declares, or `undefined` for a non-factoried plugin.
 *
 * @example
 * ```ts
 * import { capabilitiesOf, definePlugin } from "@pantoken/plugin-kit";
 *
 * capabilitiesOf(definePlugin({ name: "brand", tokens: (c) => c.tokens })); // → ["tokens"]
 * capabilitiesOf({ name: "hand-written" });                                 // → undefined
 * ```
 */
export function capabilitiesOf(plugin: PantokenPlugin): Stage[] | undefined {
  return (plugin as Branded)[BRAND]?.capabilities;
}

const warned = new Set<string>();

function warnOnce(key: string, message: string): void {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}

/**
 * Filter a plugin list to those that participate in `stage`, warning about the rest.
 *
 * @param plugins - The registered plugins.
 * @param stage - The stage being run.
 * @returns The plugins that have a hook for `stage`.
 *
 * @example Keep only the plugins that participate in a stage
 * ```ts
 * import { checkPlugins, definePlugin } from "@pantoken/plugin-kit";
 *
 * const tokensOnly = definePlugin({ name: "tok", tokens: (c) => c.tokens });
 * const cssOnly = definePlugin({ name: "styles", css: () => ({ append: "" }) });
 *
 * // Warns that "tok" has no css hook, then returns just the css plugin.
 * checkPlugins([tokensOnly, cssOnly], "css"); // → [cssOnly]
 * ```
 */
export function checkPlugins(plugins: readonly PantokenPlugin[], stage: Stage): PantokenPlugin[] {
  const active: PantokenPlugin[] = [];
  for (const plugin of plugins) {
    const capabilities = capabilitiesOf(plugin);
    if (!capabilities) {
      warnOnce(
        `${plugin.name}:${stage}:unfactoried`,
        `[pantoken] plugin "${plugin.name}": not created with @pantoken/plugin-kit; capability checks are skipped.`,
      );
      if (hasHook(plugin, stage)) active.push(plugin);
      continue;
    }
    if (!capabilities.includes(stage)) {
      warnOnce(
        `${plugin.name}:${stage}:no-hook`,
        `[pantoken] plugin "${plugin.name}": has no "${stage}" hook and will have no effect here; remove it from this stage.`,
      );
      continue;
    }
    active.push(plugin);
  }
  return active;
}

function joinCss(a: string | undefined, b: string | undefined): string | undefined {
  const joined = [a, b].filter(Boolean).join("\n\n");
  return joined || undefined;
}

function mergeContributions(a: CssContribution, b: CssContribution): CssContribution {
  const out: CssContribution = {};
  const prepend = joinCss(a.prepend, b.prepend);
  const append = joinCss(a.append, b.append);
  if (prepend) out.prepend = prepend;
  if (append) out.append = append;
  if (a.properties || b.properties)
    out.properties = [...(a.properties ?? []), ...(b.properties ?? [])];
  if (a.declarations || b.declarations)
    out.declarations = [...(a.declarations ?? []), ...(b.declarations ?? [])];
  const marker = b.marker ?? a.marker;
  if (marker) out.marker = marker;
  return out;
}

/**
 * Build a plugin on top of another. Same-stage hooks are composed: `tokens` runs `base` then
 * `overrides` (which sees base's output); `css` merges both `CssContribution`s; `icons`/`native` run
 * both; `rehype` chains resolvers (overrides first). Capabilities are the union.
 *
 * @param base - The plugin to extend.
 * @param overrides - Hooks (and an optional `name`) layered on top.
 * @returns A new branded plugin.
 *
 * @example Add an extra CSS contribution on top of a base plugin
 * ```ts
 * import { definePlugin, extendPlugin } from "@pantoken/plugin-kit";
 *
 * const base = definePlugin({ name: "brand", css: () => ({ append: ":root {}" }) });
 * const themed = extendPlugin(base, { css: () => ({ append: ".dark {}" }) });
 * // themed.css merges both contributions; its append holds ":root {}\n\n.dark {}"
 * ```
 */
export function extendPlugin(
  base: PantokenPlugin,
  overrides: Partial<PantokenPlugin>,
): PantokenPlugin {
  const composed: PantokenPlugin = { name: overrides.name ?? base.name };

  if (base.tokens || overrides.tokens) {
    composed.tokens = (ctx) => {
      const afterBase = base.tokens ? (base.tokens(ctx) ?? ctx.tokens) : ctx.tokens;
      return overrides.tokens
        ? (overrides.tokens({ ...ctx, tokens: afterBase }) ?? afterBase)
        : afterBase;
    };
  }
  if (base.css || overrides.css) {
    composed.css = (ctx) => mergeContributions(base.css?.(ctx) || {}, overrides.css?.(ctx) || {});
  }
  if (base.icons || overrides.icons) {
    composed.icons = (ctx) => {
      base.icons?.(ctx);
      overrides.icons?.(ctx);
    };
  }
  if (base.rehype || overrides.rehype) {
    composed.rehype = (ctx) => {
      const fromBase = base.rehype?.(ctx)?.resolve;
      const fromOverrides = overrides.rehype?.(ctx)?.resolve;
      const resolve: IconResolver = (code) =>
        fromOverrides?.(code) ?? fromBase?.(code) ?? ctx.resolve(code);
      return { resolve };
    };
  }
  if (base.native || overrides.native) {
    composed.native = (ctx) => {
      base.native?.(ctx);
      overrides.native?.(ctx);
    };
  }
  return definePlugin(composed);
}

/**
 * Combine several plugins into one, folding them left-to-right with {@link extendPlugin}.
 *
 * @param plugins - The plugins to merge (at least one).
 * @returns A single branded plugin.
 *
 * @example Combine peer plugins into one
 * ```ts
 * import { capabilitiesOf, definePlugin, mergePlugin } from "@pantoken/plugin-kit";
 *
 * const brand = definePlugin({ name: "brand", tokens: (c) => c.tokens });
 * const glyphs = definePlugin({ name: "glyphs", icons: (c) => c.add({ name: "star" }) });
 *
 * const combined = mergePlugin(brand, glyphs);
 * capabilitiesOf(combined); // → ["tokens", "icons"]
 * ```
 */
export function mergePlugin(...plugins: PantokenPlugin[]): PantokenPlugin {
  const [first, ...rest] = plugins;
  if (!first) throw new Error("mergePlugin requires at least one plugin");
  return rest.reduce((acc, plugin) => extendPlugin(acc, plugin), first);
}

// The token reference resolver lives in @pantoken/utils; re-exported here for plugin authors.
export { makeResolver, resolveTokens } from "@pantoken/utils";
export type { Mode, ResolveOptions } from "@pantoken/utils";
