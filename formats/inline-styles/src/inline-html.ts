import juice from "juice";
import { flattenScopes } from "./flatten-scopes.ts";
import postcss from "postcss";
import valueParser from "postcss-value-parser";

function assertAcyclicVariables(css: string): void {
  const dependencies = new Map<string, Set<string>>();
  postcss.parse(css).walkDecls((declaration) => {
    if (!declaration.prop.startsWith("--")) return;
    const references = dependencies.get(declaration.prop) ?? new Set<string>();
    valueParser(declaration.value).walk((node) => {
      if (node.type === "function" && node.value.toLowerCase() === "var") {
        const argument = node.nodes.find((child) => child.type === "word");
        if (argument?.type === "word") references.add(argument.value);
      }
    });
    dependencies.set(declaration.prop, references);
  });
  const visited = new Set<string>();
  const active = new Set<string>();
  const visit = (name: string): void => {
    if (active.has(name)) throw new Error(`Circular CSS variable dependency: ${name}`);
    if (visited.has(name)) return;
    active.add(name);
    for (const dependency of dependencies.get(name) ?? []) visit(dependency);
    active.delete(name);
    visited.add(name);
  };
  for (const name of dependencies.keys()) visit(name);
}

/** Options for inlining a stylesheet into an HTML document. */
export interface InlineHtmlOptions {
  /** Keep media-query and pseudo-class rules in a style element. */
  preserveFallbacks?: boolean;
  /** Resolve custom-property references against declarations in the document. */
  resolveCSSVariables?: boolean;
  /** Inline custom-property declarations. Disable when a companion theme stylesheet supplies them. */
  inlineCustomProperties?: boolean;
}

/** Inline CSS rules into matching HTML elements without fetching external resources. */
export function inlineHtml(html: string, css: string, options: InlineHtmlOptions = {}): string {
  const { preserveFallbacks = true, resolveCSSVariables = false } = options;
  let flatCss = flattenScopes(css);
  if (resolveCSSVariables) assertAcyclicVariables(flatCss);
  if (options.inlineCustomProperties === false && !resolveCSSVariables) {
    const root = postcss.parse(flatCss);
    root.walkDecls((declaration) => {
      if (declaration.prop.startsWith("--")) declaration.remove();
    });
    flatCss = root.toString();
  }
  const safeCss = flatCss.replace(/</gu, "\\3C ");
  return juice(`<style>${safeCss}</style>${html}`, {
    preserveContainerQueries: preserveFallbacks,
    preserveFontFaces: preserveFallbacks,
    preserveKeyFrames: preserveFallbacks,
    preserveLayers: preserveFallbacks,
    preserveMediaQueries: preserveFallbacks,
    preservePseudos: preserveFallbacks,
    removeStyleTags: true,
    resolveCSSVariables,
  });
}
