/**
 * `@pantoken/plugin-simple-icons` — bring Simple Icons brand glyphs into pantoken.
 *
 * The plugin defines a `tokens` hook (emit selected brand glyphs as `<image>` tokens, so they flow
 * to CSS and native too) *and* a `rehype` hook (resolve `:brand:` codes at render). Same plugin,
 * either layer — the generalized form of the `mcp-stack/portal` icon factory.
 *
 * @module
 */
import { definePlugin } from "@pantoken/plugin-kit";
import type { IconResolver, PantokenPlugin, TokenInput } from "@pantoken/model";

/** The shape of a Simple Icons entry (a subset of the published icon object). */
export interface SimpleIcon {
  title: string;
  slug: string;
  path: string;
  hex?: string;
}

/** A Simple Icons registry: the module's named `si*` exports, or any compatible map. */
export type SimpleIconsRegistry = Record<string, unknown>;

/** Options for the {@link simpleIcons} plugin. */
export interface SimpleIconsOptions {
  /** Brand slugs to emit as `<image>` tokens at the token layer (default: none). */
  slugs?: string[];
  /** The Simple Icons registry (default: the `simple-icons` package, loaded lazily). */
  registry?: SimpleIconsRegistry;
  /** The token-name prefix (default: `--instui-icon-`). */
  prefix?: string;
}

/**
 * Convert a slug (`"github-actions"`) to its Simple Icons export name (`"siGithubActions"`).
 *
 * @example
 * ```ts
 * import { toExportName } from "@pantoken/plugin-simple-icons";
 *
 * toExportName("github"); // "siGithub"
 * toExportName("github-actions"); // "siGithubActions"
 * ```
 */
export function toExportName(slug: string): string {
  const parts = slug
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return `si${parts.map((p) => p[0].toUpperCase() + p.slice(1)).join("")}`;
}

function isSimpleIcon(v: unknown): v is SimpleIcon {
  return (
    !!v &&
    typeof v === "object" &&
    typeof (v as SimpleIcon).path === "string" &&
    typeof (v as SimpleIcon).title === "string"
  );
}

function lookup(registry: SimpleIconsRegistry, slug: string): SimpleIcon | undefined {
  const byExport = registry[toExportName(slug)];
  if (isSimpleIcon(byExport)) return byExport;
  for (const value of Object.values(registry)) {
    if (isSimpleIcon(value) && value.slug === slug) return value;
  }
  return undefined;
}

function svgOf(icon: SimpleIcon): string {
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="${icon.path}"/></svg>`;
}

/**
 * Lazily import the `simple-icons` package as a {@link SimpleIconsRegistry}.
 *
 * @returns The `simple-icons` module's `si*` exports.
 *
 * @example Feed the lazily-loaded registry into the token hook
 * ```ts
 * import { simpleIcons, defaultRegistry } from "@pantoken/plugin-simple-icons";
 *
 * const registry = await defaultRegistry();
 * simpleIcons({ registry, slugs: ["github"] });
 * ```
 */
async function defaultRegistry(): Promise<SimpleIconsRegistry> {
  return (await import("simple-icons")) as SimpleIconsRegistry;
}

/**
 * Create the Simple Icons plugin.
 *
 * @param options - {@link SimpleIconsOptions}. Pass a `registry` to avoid the lazy import (e.g. in
 *   token-stage use, where hooks are synchronous).
 * @returns A {@link PantokenPlugin} with `tokens` and `rehype` hooks.
 *
 * @example Emit brand glyphs as <image> tokens
 * ```ts
 * import { buildTokens } from "@pantoken/core";
 * import { simpleIcons } from "@pantoken/plugin-simple-icons";
 * import * as registry from "simple-icons";
 *
 * buildTokens({
 *   theme: "rebrand",
 *   plugins: [simpleIcons({ registry, slugs: ["github", "react"] })],
 * });
 * // adds --instui-icon-github, --instui-icon-react as <image> tokens
 * ```
 *
 * @example Resolve :brand: codes at render (rehype layer)
 * ```ts
 * import { simpleIcons } from "@pantoken/plugin-simple-icons";
 * import * as registry from "simple-icons";
 *
 * const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
 * resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
 * ```
 */
export function simpleIcons(options: SimpleIconsOptions = {}): PantokenPlugin {
  const prefix = options.prefix ?? "--instui-icon-";
  const slugs = options.slugs ?? [];
  const registry = options.registry;

  const resolveFrom = (reg: SimpleIconsRegistry): IconResolver => {
    return (code) => {
      const icon = lookup(reg, code.toLowerCase());
      return icon
        ? {
            name: icon.slug,
            path: icon.path,
            svg: svgOf(icon),
            viewBox: "0 0 24 24",
            source: "simple-icons",
          }
        : undefined;
    };
  };

  return definePlugin({
    name: "@pantoken/plugin-simple-icons",
    tokens: ({ tokens, define }) => {
      if (!registry) {
        throw new Error(
          "@pantoken/plugin-simple-icons: pass `registry` to use the token hook (it is synchronous). " +
            "e.g. simpleIcons({ registry: await import('simple-icons'), slugs: [...] })",
        );
      }
      const additions: TokenInput[] = [];
      for (const slug of slugs) {
        const icon = lookup(registry, slug);
        if (!icon) continue;
        additions.push({
          name: `${prefix}${slug}`,
          value: `url('data:image/svg+xml;utf8,${encodeURIComponent(svgOf(icon))}')`,
          syntax: "<image>",
          meta: { kind: "icon" },
        });
      }
      return [...tokens, ...additions.map((a) => define(a))];
    },
    rehype: () => ({ resolve: resolveFrom(registry ?? {}) }),
  });
}

export { defaultRegistry };
export default simpleIcons;
