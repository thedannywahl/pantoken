/**
 * `@pantoken/plugin-lucide-lab` — bring Lucide Lab glyphs into pantoken.
 *
 * The plugin converts Lucide Lab icon-node arrays into `--instui-icon-<name>` image tokens. Pass
 * the imported registry to the factory when using the synchronous token hook.
 *
 * @beta
 */
import { definePlugin } from "@pantoken/plugin-kit";
import { defineToken } from "@pantoken/model";
import type { PantokenPlugin, TokenInput } from "@pantoken/model";

/** One SVG element in a Lucide icon-node array. */
export type LucideLabNode = [tag: string, attrs: Record<string, string | number>];

/** A registry of named Lucide Lab icon-node arrays. */
export type LucideLabRegistry = Record<string, unknown>;

/** Options for the {@link lucideLab} plugin. */
export interface LucideLabOptions {
  /** Icon names to emit as `<image>` tokens (default: every icon in the registry). */
  names?: string[];
  /** The Lucide Lab registry (required by the synchronous token hook). */
  registry?: LucideLabRegistry;
  /** The token-name prefix (default: `--instui-icon-`). */
  prefix?: string;
}

const SVG_ATTRIBUTES =
  'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ' +
  'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

function isNode(value: unknown): value is LucideLabNode {
  if (!Array.isArray(value) || value.length !== 2 || typeof value[0] !== "string") return false;
  return !!value[1] && typeof value[1] === "object" && !Array.isArray(value[1]);
}

function isIconNode(value: unknown): value is LucideLabNode[] {
  return Array.isArray(value) && value.every(isNode);
}

/** Convert a Lucide Lab export name to its kebab-case token name. */
export function toKebab(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function escapeAttribute(value: string | number): string {
  return String(value).replace(/[&<>"']/g, (character) => {
    const escapes: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escapes[character];
  });
}

/** Convert a Lucide Lab icon-node array into standalone SVG markup. */
export function svgOf(nodes: LucideLabNode[]): string {
  const elements = nodes
    .map(([tag, attrs]) => {
      const attributes = Object.entries(attrs)
        .map(([name, value]) => `${toKebab(name)}="${escapeAttribute(value)}"`)
        .join(" ");
      return `<${tag}${attributes ? ` ${attributes}` : ""}/>`;
    })
    .join("");
  return `<svg ${SVG_ATTRIBUTES}>${elements}</svg>`;
}

function toDataUri(svg: string): string {
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
}

/** Lazily import the published Lucide Lab icon registry. */
export async function defaultRegistry(): Promise<LucideLabRegistry> {
  return (await import("@lucide/lab")) as LucideLabRegistry;
}

function entries(registry: LucideLabRegistry): Array<{ name: string; nodes: LucideLabNode[] }> {
  return Object.entries(registry)
    .filter((entry): entry is [string, LucideLabNode[]] => isIconNode(entry[1]))
    .map(([name, nodes]) => ({ name: toKebab(name), nodes }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Create the Lucide Lab icon plugin.
 *
 * @param options - {@link LucideLabOptions}. Pass a registry for synchronous token-stage use.
 * @returns A token-capable pantoken plugin.
 */
export function lucideLab(options: LucideLabOptions = {}): PantokenPlugin {
  const prefix = options.prefix ?? "--instui-icon-";
  const names = options.names?.map(toKebab);
  const registry = options.registry;

  return definePlugin({
    name: "@pantoken/plugin-lucide-lab",
    tokens: ({ tokens }) => {
      if (!registry) {
        throw new Error(
          "@pantoken/plugin-lucide-lab: pass `registry` to use the token hook (it is synchronous). " +
            "e.g. lucideLab({ registry: await import('@lucide/lab'), names: ['burger'] })",
        );
      }
      const selected = entries(registry).filter((icon) => !names || names.includes(icon.name));
      const existingNames = new Set(tokens.map((t) => t.name));
      const additions: TokenInput[] = [];
      for (const icon of selected) {
        const name = `${prefix}${icon.name}`;
        // Lab glyphs never displace an existing icon (e.g. InstUI/Lucide's core set).
        if (existingNames.has(name)) {
          console.warn(
            `[pantoken] plugin-lucide-lab: icon "${icon.name}" already exists — skipping.`,
          );
          continue;
        }
        additions.push({
          name,
          value: toDataUri(svgOf(icon.nodes)),
          syntax: "<image>",
          meta: { kind: "icon" },
        });
      }
      return [...tokens, ...additions.map((token) => defineToken(token))];
    },
  });
}

export default lucideLab;
