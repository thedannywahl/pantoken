/**
 * `defineComponent`/`defineUtility`/`defineRule`/`defineDeclaration` — the ergonomic wrappers over
 * {@link record}. Each takes the record metadata plus a `css: (p) => string` body builder and returns
 * a {@link Definition}: `rules(p)` (doc block + body, what the aggregator concatenates) and
 * `css(options)` (the wrapped standalone sheet, what the exported `xxxCss` returns).
 *
 * @module
 */
import type { CssRecordKind } from "@cssdoc/core";
import { ns, wrap, type ComponentOptions } from "./helpers.ts";
import { record, type RecordMeta } from "./record.ts";

export interface Definition {
  name: string;
  kind: CssRecordKind;
  meta: RecordMeta;
  /** Doc block + CSS body at the given (already `ns()`-joined) prefix — concatenated by the aggregator. */
  rules(prefix: string): string;
  /** The standalone, header-wrapped stylesheet — what the exported `xxxCss` returns. */
  css(options?: ComponentOptions): string;
}

/** A record definition's input: its metadata (minus `kind`, which the `defineX` helper supplies) + css. */
export type DefineInput = Omit<RecordMeta, "kind"> & {
  /** Build the CSS body (no doc block) for the `ns()`-joined prefix `p`, e.g. `.${p}menu { … }`. */
  css: (p: string) => string;
};

function make(kind: CssRecordKind, input: DefineInput): Definition {
  const { css: cssBuilder, ...metaRest } = input;
  const meta: RecordMeta = { ...metaRest, kind };
  const rules = (prefix: string): string => record(meta, cssBuilder(prefix));
  return {
    name: input.name,
    kind,
    meta,
    rules,
    css: (options: ComponentOptions = {}) => {
      const prefix = options.prefix || "";
      return wrap(input.name, prefix, rules(ns(prefix)));
    },
  };
}

export const defineComponent = (input: DefineInput): Definition => make("component", input);
export const defineUtility = (input: DefineInput): Definition => make("utility", input);
export const defineRule = (input: DefineInput): Definition => make("rule", input);
export const defineDeclaration = (input: DefineInput): Definition => make("declaration", input);
