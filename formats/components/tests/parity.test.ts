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
  // COMPONENTS is the load-bearing concat order (71: 48 components + icon/screen-reader-content +
  // view/mask (moved here from UTILITIES, real components now) + the `menu.item`/`menu.group`/
  // `menu.separator`, `tabs.tab`/`tabs.panel`, `breadcrumb.link`, `calendar.day`, `pagination.page`,
  // `side-nav-bar.item`, `modal.header`/`modal.body`/`modal.footer`,
  // `table.head`/`table.body`/`table.row`/`table.cell`/`table.col-header`/`table.row-header`, and
  // `list.item` members).
  expect(COMPONENTS.length).toBe(71);
  expect(UTILITIES.length).toBe(13);
  expect(RULES.length).toBe(2);
  expect(DECLARATIONS.length).toBe(2);
});

test("every registered definition has a unique name (guards @memberOf cross-file resolution)", () => {
  // `icon`/`screen-reader-content` intentionally appear in both COMPONENTS (their `componentsCss()`
  // concat position) and UTILITIES (the same `Definition` object, for `validate()` coverage) — dedupe
  // by object identity first so that legitimate double-registration isn't mistaken for a name
  // collision between two DIFFERENT records.
  const uniqueDefs = [...new Set(ALL)];
  const names = uniqueDefs.map((def) => def.name);
  expect(new Set(names).size).toBe(names.length);
});

for (const def of ALL) {
  const timeout = def.name === "spacing" ? 20_000 : undefined;
  if (timeout) {
    test(
      `${def.kind} ${def.name}: emits one well-formed cssdoc record, no token drift`,
      () => {
        validate(def);
      },
      timeout,
    );
  } else {
    test(`${def.kind} ${def.name}: emits one well-formed cssdoc record, no token drift`, () => {
      validate(def);
    });
  }
}
