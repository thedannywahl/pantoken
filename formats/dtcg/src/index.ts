/**
 * `@pantoken/dtcg` — the Instructure tokens as a W3C Design Tokens (DTCG) document.
 *
 * The default export is the `rebrand` DTCG tree; every theme is available by name. Use
 * {@link toDtcg} to convert an arbitrary IR yourself.
 *
 * @module
 * @beta
 */
import canvasJson from "../generated/canvas.json" with { type: "json" };
import canvasHighContrastJson from "../generated/canvasHighContrast.json" with { type: "json" };
import rebrandJson from "../generated/rebrand.json" with { type: "json" };
import type { DtcgNode } from "./transform.ts";
import type { Theme } from "@pantoken/model";

type DtcgDoc = Record<string, DtcgNode>;

/**
 * The `rebrand` theme as a DTCG document (the default).
 *
 * @example
 * ```ts
 * import { dtcg } from "@pantoken/dtcg";
 * import { writeFileSync } from "node:fs";
 *
 * writeFileSync("tokens.json", JSON.stringify(dtcg, null, 2));
 * ```
 */
export const dtcg: DtcgDoc = rebrandJson as DtcgDoc;

/**
 * Every theme's DTCG document, keyed by {@link Theme}.
 *
 * @example
 * ```ts
 * import { themes } from "@pantoken/dtcg";
 *
 * const doc = themes.canvasHighContrast;
 * ```
 */
export const themes: Record<Theme, DtcgDoc> = {
  rebrand: rebrandJson as DtcgDoc,
  canvas: canvasJson as DtcgDoc,
  canvasHighContrast: canvasHighContrastJson as DtcgDoc,
};

/**
 * Look up a theme's DTCG document by name.
 *
 * @example
 * ```ts
 * import { byTheme } from "@pantoken/dtcg";
 *
 * const doc = byTheme("canvasHighContrast");
 * ```
 */
export function byTheme(theme: Theme): DtcgDoc {
  return themes[theme];
}

export { toDtcg } from "./transform.ts";
export type { DtcgNode, Mode } from "./transform.ts";
