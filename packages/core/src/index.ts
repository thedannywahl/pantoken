/**
 * `@pantoken/core` — the pantoken transformer.
 *
 * Defines the uniform plugin contract ({@link PantokenPlugin}) and adapts the resolved token IR for
 * the native lineage ({@link toStyleDictionary}). The upstream-resolving transform (`buildTokens`,
 * which needs the GitHub-only `@instructure/instructure-design-tokens`) lives on the separate
 * `@pantoken/core/build` entry so this main entry stays free of that exotic dependency.
 *
 * @module
 * @beta
 */
export type { Theme, Token, TokenInput, TokenMeta, TokenModify } from "./model.ts";
export { defineToken, dedupeByName, runIconPlugins, runTokenPlugins } from "./plugin.ts";
export type {
  CssContribution,
  CssHookContext,
  IconEntry,
  IconHookContext,
  IconResolver,
  PantokenPlugin,
  RehypeHookContext,
  TokenHookContext,
} from "./plugin.ts";
export { collectLeaves, referenceToVarName, resolveValue, varName } from "./resolve.ts";
export type { Leaf } from "./resolve.ts";
export { collectIcons } from "./icons.ts";
export type { CollectIconsOptions, IconLayer, IconToken } from "./icons.ts";
export { cssSyntaxForValue, isContextual, toKebab, ICON_COLOR_SPECIAL_VALUES } from "./utils.ts";
export { applyModify } from "./color.ts";
export { resolveReferences, toStyleDictionary } from "./style-dictionary.ts";
export type { Mode, SdLeaf } from "./style-dictionary.ts";
export {
  decodeIconSvg,
  flutterIconManifest,
  getIconSvgs,
  toVectorDrawable,
  toXcodeImageset,
} from "./icon-assets.ts";
export type { AssetFile, VectorDrawableOptions } from "./icon-assets.ts";
