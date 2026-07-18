/**
 * Registry-driven parity: every `Definition` across the four registries emits exactly one well-formed
 * cssdoc record of the right kind/name with no token drift. This replaces the old source-text-scanning
 * "every rule function carries a record tag" test (which broke once the monolith was split).
 */
import { expect, test } from "vite-plus/test";
import { COMPONENTS } from "../src/components/index.ts";
import { DECLARATIONS } from "../src/declarations/index.ts";
import { RULES } from "../src/rules/index.ts";
import { UTILITIES } from "../src/utilities/index.ts";
import { validate } from "./_validate.ts";

const ALL = [...COMPONENTS, ...UTILITIES, ...RULES, ...DECLARATIONS];

test("every registered definition is a single well-formed record (sanity: the registries are populated)", () => {
  // COMPONENTS is the load-bearing concat order (52: 49 components + icon/mask/screen-reader-content).
  expect(COMPONENTS.length).toBe(52);
  expect(UTILITIES.length).toBe(7);
  expect(RULES.length).toBe(2);
  expect(DECLARATIONS.length).toBe(2);
});

for (const def of ALL) {
  test(`${def.kind} ${def.name}: emits one well-formed cssdoc record, no token drift`, () => {
    validate(def);
  });
}
