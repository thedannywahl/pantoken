import juice from "juice";
import { flattenScopes } from "./flatten-scopes.ts";
import postcss from "postcss";
import valueParser from "postcss-value-parser";
import { load } from "cheerio/slim";

function resolveElementVariables(html: string): string {
  const $ = load(html, {}, false);
  const environments = new Map<object, Map<string, string | undefined>>();
  $("*").each((_index, element) => {
    const inherited =
      environments.get(element.parent ?? {}) ?? new Map<string, string | undefined>();
    const environment = new Map(inherited);
    const declarations: postcss.Declaration[] = [];
    postcss.parse(`target { ${$(element).attr("style") ?? ""} }`).walkDecls((declaration) => {
      declarations.push(declaration);
    });
    const definitions = new Map<string, postcss.Declaration>();
    for (const declaration of declarations.filter((entry) => entry.prop.startsWith("--"))) {
      if (!definitions.get(declaration.prop)?.important || declaration.important)
        definitions.set(declaration.prop, declaration);
    }
    const own = new Map([...definitions].map(([name, declaration]) => [name, declaration.value]));
    const computed = new Map<string, string | undefined>();
    const active = new Set<string>();
    const resolveVariable = (name: string): string | undefined => {
      if (!own.has(name)) return inherited.get(name);
      if (computed.has(name)) return computed.get(name);
      if (active.has(name)) throw new Error(`Circular CSS variable dependency: ${name}`);
      active.add(name);
      const value = expand(valueParser(own.get(name)!).nodes);
      active.delete(name);
      computed.set(name, value);
      return value;
    };
    const expand = (nodes: valueParser.Node[]): string | undefined => {
      let output = "";
      for (const node of nodes) {
        if (node.type !== "function") {
          output += valueParser.stringify(node);
          continue;
        }
        if (node.value.toLowerCase() === "var") {
          const comma = node.nodes.findIndex(
            (child) => child.type === "div" && child.value === ",",
          );
          const name = valueParser
            .stringify(comma < 0 ? node.nodes : node.nodes.slice(0, comma))
            .trim();
          const resolved =
            resolveVariable(name) ?? (comma >= 0 ? expand(node.nodes.slice(comma + 1)) : undefined);
          if (resolved === undefined) return undefined;
          output += resolved;
        } else {
          const inner = expand(node.nodes);
          if (inner === undefined) return undefined;
          output += `${node.value}(${inner})`;
        }
      }
      return output;
    };
    for (const name of own.keys()) environment.set(name, resolveVariable(name));
    environments.set(element, environment);
    const styles = declarations
      .filter((declaration) => !declaration.prop.startsWith("--"))
      .map((declaration) => {
        const value = expand(valueParser(declaration.value).nodes);
        if (value === undefined)
          throw new Error(`Unresolved CSS value for ${declaration.prop}: ${declaration.value}`);
        return `${declaration.prop}: ${value}${declaration.important ? " !important" : ""};`;
      });
    if (styles.length) $(element).attr("style", styles.join(" "));
    else $(element).removeAttr("style");
  });
  return $.html();
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
  if (options.inlineCustomProperties === false && !resolveCSSVariables) {
    const root = postcss.parse(flatCss);
    root.walkDecls((declaration) => {
      if (declaration.prop.startsWith("--")) declaration.remove();
    });
    flatCss = root.toString();
  }
  const safeCss = flatCss.replace(/</gu, "\\3C ");
  const result = juice(`<style>${safeCss}</style>${html}`, {
    preserveContainerQueries: preserveFallbacks,
    preserveFontFaces: preserveFallbacks,
    preserveKeyFrames: preserveFallbacks,
    preserveLayers: preserveFallbacks,
    preserveMediaQueries: preserveFallbacks,
    preservePseudos: preserveFallbacks,
    removeStyleTags: true,
    resolveCSSVariables: false,
  });
  return resolveCSSVariables ? resolveElementVariables(result) : result;
}
