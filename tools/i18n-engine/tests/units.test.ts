import { describe, expect, test } from "vite-plus/test";
import { catalogUnitKey, resolveCatalogUnits, type CatalogUnit } from "../src/units.ts";

describe("catalogUnitKey", () => {
  test("distinguishes keyed messages with the same source text", () => {
    expect(catalogUnitKey({ msgctxt: "a", msgid: "Back" })).not.toBe(
      catalogUnitKey({ msgctxt: "b", msgid: "Back" }),
    );
  });

  test("uses the source text identity for unkeyed content", () => {
    expect(catalogUnitKey({ msgid: "Back" })).toBe("\u0000Back");
  });
});

describe("resolveCatalogUnits", () => {
  test("resolves translated values and falls back to source text", () => {
    const units: CatalogUnit[] = [
      { msgctxt: "back", msgid: "Back", reference: "i18n.json", translate: "always" },
      { msgid: "Hello", reference: "guide.md:1", translate: "always" },
    ];
    const translations = new Map([[catalogUnitKey(units[0]), "Vissza"]]);
    expect(resolveCatalogUnits(units, translations)).toEqual(
      new Map([
        ["back", "Vissza"],
        ["Hello", "Hello"],
      ]),
    );
  });
});
