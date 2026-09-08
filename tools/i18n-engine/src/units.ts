/** Shared catalog-unit contracts used by content and messages localization spaces. */

import type { TranslatePolicy } from "./config.ts";

/** One source unit ready for POT generation and PO lookup. */
export interface CatalogUnit {
  /** Stable key for keyed messages; omitted for content-addressed units. */
  msgctxt?: string;
  /** English source text. */
  msgid: string;
  /** Source location used in PO references and drift annotations. */
  reference: string;
  /** Whether this unit may be sent to a translation provider. */
  translate: TranslatePolicy;
}

/** Build the collision-safe identity used to deduplicate and resolve catalog units. */
export function catalogUnitKey(unit: Pick<CatalogUnit, "msgctxt" | "msgid">): string {
  return `${unit.msgctxt ?? ""}\u0000${unit.msgid}`;
}

/** Resolve translated values by `(msgctxt, msgid)`, falling back to the source text. */
export function resolveCatalogUnits(
  units: readonly CatalogUnit[],
  translations: ReadonlyMap<string, string>,
): Map<string, string> {
  return new Map(
    units.map((unit) => [
      unit.msgctxt ?? unit.msgid,
      translations.get(catalogUnitKey(unit)) ?? unit.msgid,
    ]),
  );
}
