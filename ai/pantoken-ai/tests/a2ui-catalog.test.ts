import { readFileSync } from "node:fs";
import { expect, test } from "vite-plus/test";
import { validateCatalog } from "../scripts/generate-a2ui-catalog.ts";

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
  expect(() => validateCatalog(readCatalog())).not.toThrow();
});

test("rejects unlisted component properties and executable catalog functions", () => {
  const withExtraProperty = readCatalog();
  withExtraProperty.components.PantokenButton.properties.href = {
    type: "string",
    format: "uri",
  };
  expect(() => validateCatalog(withExtraProperty)).toThrow(/properties must be exactly/);

  const withFunctions = readCatalog();
  withFunctions.functions = {};
  expect(() => validateCatalog(withFunctions)).toThrow(/does not publish executable/);
});
