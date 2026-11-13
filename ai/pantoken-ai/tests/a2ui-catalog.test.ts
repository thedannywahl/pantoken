import { readFileSync } from "node:fs";
import { expect, test } from "vite-plus/test";
import { a2uiNameForElement } from "../../../renderers/web-components/src/a2ui-contracts.ts";
import { ELEMENTS } from "../../../renderers/web-components/src/lib/elements-meta.ts";
import { validateCatalog as validateGeneratedCatalog } from "../scripts/generate-a2ui-catalog.ts";

type CatalogFixture = {
  protocolVersion: string;
  components: Record<string, { properties: Record<string, unknown> }>;
  [key: string]: unknown;
};

function readCatalog(): CatalogFixture {
  return JSON.parse(
    readFileSync(new URL("../catalogs/pantoken-v1.json", import.meta.url), "utf8"),
  ) as CatalogFixture;
}

test("validates the checked-in Pantoken A2UI 1.0 catalog", () => {
  expect(() => validateGeneratedCatalog(readCatalog())).not.toThrow();
});

test("generates exactly one component schema for every web-component export", () => {
  const catalog = readCatalog();
  expect(Object.keys(catalog.components).sort()).toEqual(ELEMENTS.map(a2uiNameForElement).sort());

  const incompleteCatalog = structuredClone(catalog);
  delete incompleteCatalog.components.PantokenButton;
  expect(() => validateGeneratedCatalog(incompleteCatalog)).toThrow(/exactly match all/);
});

test("rejects unexported components, unsafe properties, and executable functions", () => {
  const withUnexportedComponent = readCatalog();
  withUnexportedComponent.components.PantokenUnknown =
    withUnexportedComponent.components.PantokenButton;
  expect(() => validateGeneratedCatalog(withUnexportedComponent)).toThrow(
    /not a component exported/,
  );

  const withExtraProperty = readCatalog();
  withExtraProperty.components.PantokenButton.properties.href = {
    type: "string",
    format: "uri",
  };
  expect(() => validateGeneratedCatalog(withExtraProperty)).toThrow(
    /not allowed in the A2UI catalog/,
  );

  const withFunctions = readCatalog();
  withFunctions.functions = {};
  expect(() => validateGeneratedCatalog(withFunctions)).toThrow(/does not publish executable/);
});
