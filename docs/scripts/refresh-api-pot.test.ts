import { expect, test, vi } from "vite-plus/test";

const mocks = vi.hoisted(() => ({
  serializePot: vi.fn(
    (_units: Array<{ msgid: string; flags: string[] }>, _flags: string[]) => "catalog",
  ),
  writeCatalog: vi.fn(),
  refreshCoverageReports: vi.fn(),
}));

vi.mock("node:fs", () => ({
  globSync: () => ["css/button.md"],
  readFileSync: () =>
    '<table class="pantoken-a11y-table"><tr><td>WCAG 2.2 1.4.3, 1.4.6</td><td>WCAG 2.2 1.4.3 explains contrast</td></tr></table>',
  writeFileSync: vi.fn(),
}));
vi.mock("@pantoken/i18n-engine", () => mocks);

test("flags WCAG criterion references in the generated template but not explanatory prose", async () => {
  const { refreshApiPot } = await import("./refresh-api-pot.ts");
  refreshApiPot();
  const units = mocks.serializePot.mock.calls[0][0];
  expect(units.find(({ msgid }) => msgid === "WCAG 2.2 1.4.3, 1.4.6")?.flags).toEqual([
    "pantoken-verbatim",
  ]);
  expect(units.find(({ msgid }) => msgid === "WCAG 2.2 1.4.3 explains contrast")?.flags).toEqual(
    [],
  );
});
