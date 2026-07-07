/**
 * Pure, framework-free helpers: the icon-resolver chain, the color-code rehype plugin, alert-marker
 * parsing, and value sniffing. Kept separate from the React layer so the logic is unit-testable.
 *
 * @module
 */
import { resolve as pantokenResolve } from "@pantoken/icons";
import { visit } from "unist-util-visit";
import type { AlertMarker, InstuiMarkdownRenderOptions } from "./types.ts";
import type { IconResolver } from "@pantoken/model";

/**
 * Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
 * the built-in `@pantoken/icons` set. The first match wins.
 *
 * @example
 * ```ts
 * import { buildIconResolver } from "@pantoken/react-markdown";
 *
 * const resolve = buildIconResolver();
 * resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
 * ```
 */
export function buildIconResolver(options?: InstuiMarkdownRenderOptions): IconResolver {
  const resolvers: IconResolver[] = [];
  for (const plugin of options?.icons?.plugins ?? []) {
    const contributed = plugin.rehype?.({ resolve: pantokenResolve });
    if (contributed?.resolve) resolvers.push(contributed.resolve);
  }
  for (const resolver of options?.icons?.resolvers ?? []) resolvers.push(resolver);
  resolvers.push(pantokenResolve);
  return (code) => {
    for (const resolver of resolvers) {
      const hit = resolver(code);
      if (hit) return hit;
    }
    return undefined;
  };
}

const ALERT_RE = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/;

/**
 * Detect a GitHub alert marker at the start of text; returns the marker and the remaining text.
 *
 * @example
 * ```ts
 * import { parseAlertMarker } from "@pantoken/react-markdown";
 *
 * parseAlertMarker("[!TIP] Helpful"); // { marker: "TIP", rest: "Helpful" }
 * parseAlertMarker("Plain text"); // undefined
 * ```
 */
export function parseAlertMarker(text: string): { marker: AlertMarker; rest: string } | undefined {
  const match = ALERT_RE.exec(text);
  if (!match) return undefined;
  return { marker: match[1] as AlertMarker, rest: text.slice(match[0].length) };
}

const COLOR_RE = /^(#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([^)]*\))$/i;

/**
 * True when a string is a standalone CSS color value (hex or a color function).
 *
 * @example
 * ```ts
 * import { isColorValue } from "@pantoken/react-markdown";
 *
 * isColorValue("#03893D"); // true
 * isColorValue("oklch(0.7 0.1 200)"); // true
 * isColorValue("hello"); // false
 * ```
 */
export function isColorValue(value: string): boolean {
  return COLOR_RE.test(value.trim());
}

const INLINE_COLOR_RE =
  /(#[0-9a-f]{3,8}\b|(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)\([^)]*\))/gi;

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

/**
 * A rehype plugin that wraps standalone color values in `<span data-color-code="…">`, so the React
 * layer can render a swatch. Mirrors the icon-token pipeline.
 *
 * @example
 * ```tsx
 * import Markdown from "react-markdown";
 * import { rehypeColorCodes } from "@pantoken/react-markdown";
 *
 * <Markdown rehypePlugins={[rehypeColorCodes]}>Brand is #03893D.</Markdown>;
 * ```
 */
export function rehypeColorCodes() {
  return (tree: unknown): void => {
    visit(tree as never, "text", (node: HastText, index, parent) => {
      if (index === undefined || !parent) return;
      const text = node.value;
      INLINE_COLOR_RE.lastIndex = 0;
      if (!INLINE_COLOR_RE.test(text)) return;

      INLINE_COLOR_RE.lastIndex = 0;
      const out: (HastText | HastElement)[] = [];
      let last = 0;
      let match: RegExpExecArray | null;
      while ((match = INLINE_COLOR_RE.exec(text))) {
        if (match.index > last) out.push({ type: "text", value: text.slice(last, match.index) });
        out.push({
          type: "element",
          tagName: "span",
          properties: { "data-color-code": match[1] },
          children: [{ type: "text", value: match[1] }],
        });
        last = match.index + match[0].length;
      }
      if (last < text.length) out.push({ type: "text", value: text.slice(last) });
      (parent as { children: unknown[] }).children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}

function findFirstText(node: unknown): HastText | undefined {
  if (!node || typeof node !== "object") return undefined;
  const n = node as { type?: string; children?: unknown[] };
  if (n.type === "text") return node as HastText;
  for (const child of n.children ?? []) {
    const found = findFirstText(child);
    if (found) return found;
  }
  return undefined;
}

/**
 * A rehype plugin that tags GitHub-alert blockquotes: it detects a `[!NOTE]`-style marker at the
 * start of a blockquote, records it as `data-alert="note"`, and strips the marker text. The React
 * `blockquote` component then renders an InstUI `Alert`.
 *
 * @example
 * ```tsx
 * import Markdown from "react-markdown";
 * import { rehypeGithubAlerts } from "@pantoken/react-markdown";
 *
 * <Markdown rehypePlugins={[rehypeGithubAlerts]}>{"> [!NOTE]\n> Heads up."}</Markdown>;
 * ```
 */
export function rehypeGithubAlerts() {
  return (tree: unknown): void => {
    visit(tree as never, "element", (node: HastElement) => {
      if (node.tagName !== "blockquote") return;
      const first = findFirstText(node);
      if (!first) return;
      const parsed = parseAlertMarker(first.value.replace(/^\s+/, ""));
      if (!parsed) return;
      node.properties = { ...node.properties, "data-alert": parsed.marker.toLowerCase() };
      first.value = parsed.rest;
    });
  };
}

/** Map an alert marker to an InstUI `Alert` variant. */
export function alertVariant(marker: AlertMarker): "info" | "success" | "warning" | "error" {
  switch (marker) {
    case "TIP":
      return "success";
    case "WARNING":
      return "warning";
    case "CAUTION":
      return "error";
    default:
      return "info";
  }
}
