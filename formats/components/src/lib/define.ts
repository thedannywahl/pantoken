/**
 * `defineComponent`/`defineUtility`/`defineRule`/`defineDeclaration` — the ergonomic wrappers over
 * {@link record}. Each takes the record metadata plus a `css: (p) => string` body builder and returns
 * a {@link Definition}: `rules(p)` (doc block + body, what the aggregator concatenates) and
 * `css(options)` (the wrapped standalone sheet, what the exported `xxxCss` returns).
 *
 * @module
 */
import type { CssRecordKind } from "@cssdoc/core";
import {
  deprecatedAliasPairs,
  withAliases,
  withSizeAliases,
  withSizeAliasDocs,
} from "./aliases.ts";
import { ns, wrap, type ComponentOptions } from "./helpers.ts";

export interface Definition {
  name: string;
  kind: CssRecordKind;
  /** Doc block + CSS body at the given (already `ns()`-joined) prefix — concatenated by the aggregator. */
  rules(this: void, prefix: string, options?: ComponentOptions): string;
  /**
   * The standalone, header-wrapped stylesheet — what the exported `xxxCss` returns. Declared `this: void`
   * because it's a plain closure (no receiver): callers bind it as `export const buttonCss = button.css`,
   * so the annotation tells the linter the free-floating reference is safe.
   */
  css(this: void, options?: ComponentOptions): string;
}

/** A record definition's input: the record's programmatic name + its CSS builder. */
export interface DefineInput {
  /** The record's identity — used for the standalone-sheet header, the exports, and `validate()`. */
  name: string;
  /**
   * Build the full record for the `ns()`-joined prefix `p`: a leading `/** … *\/` cssdoc doc comment
   * (prefix-independent) followed by the CSS body, e.g. ``(p) => `/** @component menu … *\/\n.${p}menu {…}` ``.
   */
  css: (p: string, options?: ComponentOptions) => string;
}

/**
 * Split a record's leading `/** … *\/` doc comment from its CSS body. The alias post-processors scan
 * for `{ … }` rule bodies, so they must never see the comment's `{@link …}` braces — `make()` runs them
 * on the body alone and recombines. Tolerates leading whitespace before `/**` (an authored template
 * literal often opens with a newline); drops the single newline separating the comment from the body.
 */
function splitLeadingDocComment(raw: string): { comment: string; body: string } {
  const m = raw.match(/^\s*\/\*\*[\s\S]*?\*\//u);
  if (!m) return { comment: "", body: raw };
  return { comment: m[0].replace(/^\s+/u, ""), body: raw.slice(m[0].length).replace(/^\n/u, "") };
}

function make(kind: CssRecordKind, input: DefineInput): Definition {
  const { css: cssBuilder } = input;
  // Deprecated-alias twins are discovered from the doc comment; the comment is prefix-independent, so
  // parse the record once (any prefix) rather than per `rules()` call.
  const aliasPairs = deprecatedAliasPairs(cssBuilder("instui-", { theme: "rebrand" }));
  // Append the size-alias and deprecated-alias twins to the CSS BODY ONLY (never the comment), so each
  // alias documents on this record's own page and the brace scanners never see the `{@link …}` braces.
  const rules = (prefix: string, options: ComponentOptions = {}): string => {
    const { comment, body } = splitLeadingDocComment(cssBuilder(prefix, options));
    // Auto-document the long-form size twins withSizeAliases appends, so they aren't undocumented.
    return `${withSizeAliasDocs(comment, body)}\n${withAliases(withSizeAliases(body), aliasPairs).trim()}\n`;
  };
  return {
    name: input.name,
    kind,
    rules,
    css: (options: ComponentOptions = {}) => {
      const prefix = options.prefix || "";
      return wrap(input.name, prefix, rules(ns(prefix), options));
    },
  };
}

export const defineComponent = (input: DefineInput): Definition => make("component", input);
export const defineUtility = (input: DefineInput): Definition => make("utility", input);
export const defineRule = (input: DefineInput): Definition => make("rule", input);
export const defineDeclaration = (input: DefineInput): Definition => make("declaration", input);
