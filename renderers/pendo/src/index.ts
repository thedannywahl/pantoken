/**
 * `@pantoken/pendo` — an Instructure-styled global stylesheet for Pendo guides.
 *
 * Pendo injects guide HTML into a host page; this renders that guide DOM (`._pendo-*`) to match
 * Instructure UI, using pantoken's `--instui-*` token layer for alignment. The component CSS is
 * ported from `@instructure/pendo-global-css`; pantoken supplies the tokens and the assembly.
 *
 * {@link buildPendoCss} composes the stylesheet; {@link pendoCss} is the ready-made `rebrand` build
 * (scoped, `!important`). A static file is published at `@pantoken/pendo/global.css`.
 *
 * @example
 * ```ts
 * import { pendoCss } from "@pantoken/pendo";
 * // or a variant: buildPendoCss({ theme: "canvas", scope: false })
 * ```
 *
 * @module
 * @beta
 */
import { buildPendoCss } from "./build.ts";

export { buildPendoCss } from "./build.ts";
export type { BuildPendoCssOptions } from "./build.ts";
export { addImportant } from "./plugins/add-important.ts";
export { addScope } from "./plugins/add-scope.ts";
export type { AddScopeOptions } from "./plugins/add-scope.ts";
export { COMPONENTS, LAYER_ORDER } from "./layers.ts";

/** The ready-made `rebrand` Pendo guide stylesheet (scoped, `!important`). */
export const pendoCss: string = buildPendoCss();

export default pendoCss;
