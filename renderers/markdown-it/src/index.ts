/**
 * `@pantoken/markdown-it` — a markdown-it plugin that renders `:icon:` codes as inline SVG and
 * standalone color values (`#03893D`, `rgb(…)`, `oklch(…)`) as swatches, using the pantoken icon
 * set.
 *
 * It ports the `@pantoken/rehype` and `@pantoken/react-markdown` pipelines onto markdown-it: a
 * single core rule walks each inline token's text children, splits them on the icon and color
 * patterns, and swaps the matches for `html_inline` tokens. Icon codes resolve through a chain —
 * plugin `rehype` resolvers first, then an explicit {@link MarkdownItOptions.resolve}, then the
 * built-in `@pantoken/icons` set — so brand-icon plugins compose the same way they do elsewhere.
 *
 * The emitted markup uses the same class names as the other renderers (`pantoken-icon`,
 * `pantoken-color-swatch`), so loading `@pantoken/components` styles it. Wrap the rendered HTML in a
 * `.pantoken-prose` container (see {@link PROSE_CLASS}) to pick up the prose layer too.
 *
 * @example
 * ```ts
 * import MarkdownIt from "markdown-it";
 * import { pantokenMarkdownIt } from "@pantoken/markdown-it";
 *
 * const md = new MarkdownIt().use(pantokenMarkdownIt);
 * md.render("Save :check: to lock in #03893D.");
 * ```
 *
 * @module
 */
import { resolve as pantokenResolve } from "@pantoken/icons";
import type MarkdownIt from "markdown-it";
import type { IconEntry, IconResolver, PantokenPlugin } from "@pantoken/model";

/**
 * The prose-scope class the emitted markup is designed to sit inside.
 *
 * @example
 * ```ts
 * import MarkdownIt from "markdown-it";
 * import { pantokenMarkdownIt, PROSE_CLASS } from "@pantoken/markdown-it";
 *
 * const md = new MarkdownIt().use(pantokenMarkdownIt);
 * const html = `<div class="${PROSE_CLASS}">${md.render("Save :check:")}</div>`;
 * ```
 */
export const PROSE_CLASS = "pantoken-prose";

/** Options for {@link pantokenMarkdownIt}. */
export interface MarkdownItOptions {
  /** An explicit icon resolver, tried after plugin resolvers and before the built-in set. */
  resolve?: IconResolver;
  /** Plugins whose `rehype` hooks contribute icon resolvers (tried first). */
  plugins?: readonly PantokenPlugin[];
  /** The class applied to the icon wrapper (default: `pantoken-icon`). */
  iconClassName?: string;
  /** The class applied to the color-swatch wrapper (default: `pantoken-color-swatch`). */
  swatchClassName?: string;
  /** Render `:icon:` codes as inline SVG (default: `true`). */
  icons?: boolean;
  /** Render standalone color values as swatches (default: `true`). */
  swatches?: boolean;
}

/** A structural view of the markdown-it token shape this plugin reads and creates. */
interface MdToken {
  type: string;
  content: string;
  children: MdToken[] | null;
}

/** A structural view of the markdown-it core state this plugin walks. */
interface MdStateCore {
  tokens: MdToken[];
  Token: new (type: string, tag: string, nesting: number) => MdToken;
}

const ICON_RE = /:([a-z0-9][a-z0-9-]*):/gi;
const COLOR_RE = /(#[0-9a-f]{3,8}\b|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([^)]*\))/gi;

/** Build the icon-resolver chain: plugin resolvers, then explicit `resolve`, then the built-in set. */
function buildChain(options: MarkdownItOptions): IconResolver {
  const resolvers: IconResolver[] = [];
  for (const plugin of options.plugins ?? []) {
    const contributed = plugin.rehype?.({ resolve: pantokenResolve });
    if (contributed?.resolve) resolvers.push(contributed.resolve);
  }
  if (options.resolve) resolvers.push(options.resolve);
  resolvers.push(pantokenResolve);
  return (code) => {
    for (const resolver of resolvers) {
      const hit = resolver(code);
      if (hit) return hit;
    }
    return undefined;
  };
}

/** The inline SVG for an entry: its own `svg`, or a single-path fallback, or empty. */
function iconSvg(entry: IconEntry): string {
  if (entry.svg) return entry.svg;
  if (entry.path) {
    const viewBox = entry.viewBox ?? "0 0 24 24";
    return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg"><path d="${entry.path}" fill="currentColor"/></svg>`;
  }
  return "";
}

/** The `<span>…SVG…</span>` markup for a resolved icon. */
function iconHtml(entry: IconEntry, className: string, escapeHtml: (s: string) => string): string {
  return `<span class="${className}" data-pantoken-icon="${escapeHtml(entry.name)}">${iconSvg(entry)}</span>`;
}

/** The swatch markup: a color chip plus the original code text. */
function swatchHtml(color: string, className: string, escapeHtml: (s: string) => string): string {
  const safe = escapeHtml(color);
  return `<span class="${className}" data-color-code="${safe}"><span class="${className}__chip" style="background:${safe}"></span>${safe}</span>`;
}

/**
 * A markdown-it plugin factory. Use it with `md.use(pantokenMarkdownIt, options)`.
 *
 * @param md - The markdown-it instance.
 * @param options - {@link MarkdownItOptions}.
 *
 * @example Compose a brand-icon plugin's resolver
 * ```ts
 * import MarkdownIt from "markdown-it";
 * import { pantokenMarkdownIt } from "@pantoken/markdown-it";
 * import { simpleIcons } from "@pantoken/plugin-simple-icons";
 *
 * const md = new MarkdownIt().use(pantokenMarkdownIt, { plugins: [simpleIcons()] });
 * ```
 */
export function pantokenMarkdownIt(md: MarkdownIt, options: MarkdownItOptions = {}): void {
  const resolve = buildChain(options);
  const iconClassName = options.iconClassName ?? "pantoken-icon";
  const swatchClassName = options.swatchClassName ?? "pantoken-color-swatch";
  const doIcons = options.icons ?? true;
  const doSwatches = options.swatches ?? true;
  const { escapeHtml } = md.utils;

  md.core.ruler.push("pantoken", (rawState) => {
    const state = rawState as unknown as MdStateCore;
    const make = (type: string, content: string): MdToken => {
      const token = new state.Token(type, "", 0);
      token.content = content;
      return token;
    };
    for (const block of state.tokens) {
      if (block.type !== "inline" || !block.children) continue;
      const out: MdToken[] = [];
      for (const child of block.children) {
        if (child.type !== "text") {
          out.push(child);
          continue;
        }
        out.push(...splitText(child.content, make));
      }
      block.children = out;
    }
  });

  /** Split one run of text into text/html_inline tokens on the icon and color patterns. */
  function splitText(text: string, make: (type: string, content: string) => MdToken): MdToken[] {
    const spans = matchSpans(text);
    if (spans.length === 0) return [make("text", text)];

    const out: MdToken[] = [];
    let last = 0;
    for (const span of spans) {
      if (span.start > last) out.push(make("text", text.slice(last, span.start)));
      out.push(make("html_inline", span.html));
      last = span.end;
    }
    if (last < text.length) out.push(make("text", text.slice(last)));
    return out;
  }

  /** Every icon/color span in a text run, sorted by position and non-overlapping. */
  function matchSpans(text: string): { start: number; end: number; html: string }[] {
    const spans: { start: number; end: number; html: string }[] = [];
    if (doIcons) {
      ICON_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = ICON_RE.exec(text))) {
        const entry = resolve(match[1]);
        if (!entry) continue;
        spans.push({
          start: match.index,
          end: match.index + match[0].length,
          html: iconHtml(entry, iconClassName, escapeHtml),
        });
      }
    }
    if (doSwatches) {
      COLOR_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = COLOR_RE.exec(text))) {
        spans.push({
          start: match.index,
          end: match.index + match[0].length,
          html: swatchHtml(match[1], swatchClassName, escapeHtml),
        });
      }
    }
    spans.sort((a, b) => a.start - b.start);
    // Drop any span that overlaps one already kept (earlier match wins).
    const kept: { start: number; end: number; html: string }[] = [];
    let cursor = 0;
    for (const span of spans) {
      if (span.start < cursor) continue;
      kept.push(span);
      cursor = span.end;
    }
    return kept;
  }
}

export default pantokenMarkdownIt;
