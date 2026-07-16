/**
 * `@pantoken/rehype` — render `:icon:` codes as inline SVG.
 *
 * The plugin walks hast text nodes and replaces `:code:` tokens with an inline SVG element,
 * resolving each code through a chain: plugin `rehype` resolvers first, then any explicit
 * `resolve`, then the built-in `@pantoken/icons` set. It ports `rehype-instui-markdown` onto the
 * shared icon manifest.
 *
 * @module
 * @experimental
 */
import { resolve as pantokenResolve } from "@pantoken/icons";
import { visit } from "unist-util-visit";
import type { IconEntry, IconResolver, PantokenPlugin } from "@pantoken/model";

/** Options for {@link rehypePantokenIcons}. */
export interface RehypeOptions {
  /** An explicit resolver, tried before the built-in pantoken icon set. */
  resolve?: IconResolver;
  /** Plugins whose `rehype` hooks contribute resolvers (tried first). */
  plugins?: readonly PantokenPlugin[];
  /** The class name applied to the emitted wrapper (default: `pantoken-icon`). */
  className?: string;
}

const TOKEN_RE = /:([a-z0-9][a-z0-9-]*):/gi;

interface HastText {
  type: "text";
  value: string;
}
interface HastElement {
  type: "element";
  tagName: string;
  properties: Record<string, unknown>;
  children: unknown[];
}
interface HastRaw {
  type: "raw";
  value: string;
}

function buildChain(options: RehypeOptions): IconResolver {
  const resolvers: IconResolver[] = [];
  for (const plugin of options.plugins ?? []) {
    const contributed = plugin.rehype?.({ resolve: pantokenResolve });
    if (contributed?.resolve) resolvers.push(contributed.resolve);
  }
  if (options.resolve) resolvers.push(options.resolve);
  resolvers.push(pantokenResolve);
  return (code) => {
    for (const r of resolvers) {
      const hit = r(code);
      if (hit) return hit;
    }
    return undefined;
  };
}

function iconElement(entry: IconEntry, className: string): HastElement {
  const svg =
    entry.svg ??
    (entry.path
      ? `<svg viewBox="${entry.viewBox ?? "0 0 24 24"}" xmlns="http://www.w3.org/2000/svg"><path d="${entry.path}" fill="currentColor"/></svg>`
      : "");
  return {
    type: "element",
    tagName: "span",
    properties: { className: [className], "data-pantoken-icon": entry.name },
    children: [{ type: "raw", value: svg } satisfies HastRaw],
  };
}

/**
 * A rehype plugin factory. Returns a transformer that rewrites `:code:` tokens to inline SVG.
 *
 * @param options - {@link RehypeOptions}.
 * @returns A unified/rehype transformer.
 *
 * @example Built-in icon set
 * ```ts
 * import { unified } from "unified";
 * import rehypeParse from "rehype-parse";
 * import rehypeRaw from "rehype-raw";
 * import rehypeStringify from "rehype-stringify";
 * import { rehypePantokenIcons } from "@pantoken/rehype";
 *
 * const html = await unified()
 *   .use(rehypeParse, { fragment: true })
 *   .use(rehypePantokenIcons)
 *   .use(rehypeRaw) // required: the icon body is a raw SVG node
 *   .use(rehypeStringify)
 *   .process("go :arrow-left: back");
 * ```
 *
 * @example Compose a brand-icon plugin's resolver
 * ```ts
 * import { rehypePantokenIcons } from "@pantoken/rehype";
 * import { simpleIcons } from "@pantoken/plugin-simple-icons";
 * import * as registry from "simple-icons";
 *
 * unified().use(rehypePantokenIcons, { plugins: [simpleIcons({ registry })] });
 * // :github: now resolves from simple-icons; unknown codes stay literal text.
 * ```
 */
export function rehypePantokenIcons(options: RehypeOptions = {}) {
  const resolve = buildChain(options);
  const className = options.className ?? "pantoken-icon";

  return (tree: unknown): void => {
    visit(tree as never, "text", (node: HastText, index, parent) => {
      if (index === undefined || !parent) return;
      const text = node.value;
      TOKEN_RE.lastIndex = 0;
      if (!TOKEN_RE.test(text)) return;

      TOKEN_RE.lastIndex = 0;
      const out: (HastText | HastElement)[] = [];
      let last = 0;
      let match: RegExpExecArray | null;
      let replaced = false;
      while ((match = TOKEN_RE.exec(text))) {
        const entry = resolve(match[1]);
        if (!entry) continue;
        if (match.index > last) out.push({ type: "text", value: text.slice(last, match.index) });
        out.push(iconElement(entry, className));
        last = match.index + match[0].length;
        replaced = true;
      }
      if (!replaced) return;
      if (last < text.length) out.push({ type: "text", value: text.slice(last) });

      (parent as { children: unknown[] }).children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}

export default rehypePantokenIcons;
