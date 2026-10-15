import juice from "juice";
import { flattenScopes } from "./flatten-scopes.ts";
import postcss from "postcss";

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
  if (options.inlineCustomProperties === false) {
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
