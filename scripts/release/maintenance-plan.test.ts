import { expect, test } from "vite-plus/test";
import { parse } from "yaml";
import {
  breakingMaintenanceBump,
  editMaintenanceDependency,
  groupMaintenanceUpgrades,
  maintenanceId,
  parseMaintenanceUpgrades,
  renderMaintenanceChangeset,
  requireMaintenanceBump,
  safeMaintenancePath,
  type MaintenanceUpgrade,
} from "./maintenance-plan.ts";

const upgrade: MaintenanceUpgrade = {
  depName: "react",
  packageFile: "pnpm-workspace.yaml",
  manager: "npm",
  currentValue: "^19.0.0",
  newValue: "^20.0.0",
};

test("edits catalogs structurally without rewriting unrelated values or comments", () => {
  const source = "# Keep this comment\ncatalog:\n  react: ^19.0.0\n  example: ^1.0.0\n";
  const result = editMaintenanceDependency(source, upgrade);
  expect(result).toContain("# Keep this comment");
  expect(parse(result).catalog).toEqual({ react: "^20.0.0", example: "^1.0.0" });
  expect(() => editMaintenanceDependency(source, { ...upgrade, currentValue: "wrong" })).toThrow(
    "does not match",
  );
});

test("preserves GitHub-only dependency URLs while changing the tag", () => {
  expect(
    parse(
      editMaintenanceDependency(
        "catalog:\n  tokens: github:instructure/instructure-design-tokens#v2.1.0\n",
        { ...upgrade, depName: "tokens", currentValue: "v2.1.0", newValue: "v2.2.0" },
      ),
    ).catalog.tokens,
  ).toBe("github:instructure/instructure-design-tokens#v2.2.0");
});

test("updates manifest fields without replacing catalog or workspace references", () => {
  const source = JSON.stringify({
    dependencies: { react: "^19.0.0" },
    devDependencies: { react: "catalog:" },
    peerDependencies: { react: "^19.0.0" },
  });
  expect(
    JSON.parse(
      editMaintenanceDependency(source, {
        ...upgrade,
        packageFile: "renderers/react/package.json",
      }),
    ),
  ).toEqual({
    dependencies: { react: "^20.0.0" },
    devDependencies: { react: "catalog:" },
    peerDependencies: { react: "^20.0.0" },
  });
});

test("keeps coupled dependency families atomic", () => {
  const group = groupMaintenanceUpgrades([
    upgrade,
    { ...upgrade, depName: "react-dom" },
    { ...upgrade, depName: "unrelated" },
  ]);
  expect(group.map((items) => items.map((item) => item.depName))).toEqual([
    ["react", "react-dom"],
    ["unrelated"],
  ]);
});

test("rejects malformed or traversing metadata and keeps retry IDs stable", () => {
  expect(parseMaintenanceUpgrades([upgrade])).toEqual([upgrade]);
  expect(() => parseMaintenanceUpgrades({})).toThrow("array");
  expect(() => parseMaintenanceUpgrades([{ ...upgrade, newValue: undefined }])).toThrow("newValue");
  for (const path of ["../package.json", "/etc/passwd", "a/../b", "a\\b", "-unsafe;command"])
    expect(() => safeMaintenancePath(path)).toThrow("Unsafe");
  expect(maintenanceId("react", "20.0.0")).toBe(maintenanceId("react", "20.0.0"));
});

test("generates deterministic relevant Changesets at the highest required release level", () => {
  const bumps = {};
  requireMaintenanceBump(bumps, "@pantoken/react", "minor");
  requireMaintenanceBump(bumps, "@pantoken/react", "patch");
  expect(renderMaintenanceChangeset(bumps, ["Support React 20.", "Support React 20."])).toBe(
    '---\n"@pantoken/react": minor\n---\n\nSupport React 20.\n',
  );
  expect(renderMaintenanceChangeset({}, ["Actions only."])).toBe("");
  expect(breakingMaintenanceBump({ version: "0.9.0" })).toBe("minor");
  expect(breakingMaintenanceBump({ version: "1.0.0" })).toBe("major");
});
