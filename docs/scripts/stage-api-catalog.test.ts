import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vite-plus/test";
import { loadWorkspacePackages } from "../../scripts/release/workspace-packages.ts";
import { buildApiCatalog } from "./stage-api-catalog.ts";

test("buildApiCatalog lists only public pantoken npm Registry endpoints", async () => {
  const { packages } = await loadWorkspacePackages();
  const catalog = buildApiCatalog(packages);
  const links = catalog.linkset[0].item;

  expect(links.length).toBeGreaterThan(50);
  expect(links.map((link) => link.title).sort((left, right) => left.localeCompare(right))).toEqual(
    links.map((link) => link.title),
  );
  expect(links).toContainEqual({
    href: "https://registry.npmjs.org/@pantoken%2Fcomponents",
    title: "@pantoken/components",
  });
  expect(links).toContainEqual({
    href: "https://registry.npmjs.org/@pantoken%2Fpantoken",
    title: "@pantoken/pantoken",
  });
  expect(
    links.every((link) => link.href.startsWith("https://registry.npmjs.org/@pantoken%2F")),
  ).toBe(true);
});

test("buildApiCatalog omits private packages", () => {
  const catalog = buildApiCatalog([
    {
      name: "@pantoken/public",
      path: "packages/public",
      version: "1.0.0",
      private: false,
      workspaceDeps: new Set(),
    },
    {
      name: "@pantoken/private",
      path: "packages/private",
      version: "1.0.0",
      private: true,
      workspaceDeps: new Set(),
    },
  ]);

  expect(catalog.linkset[0].item).toStrictEqual([
    { href: "https://registry.npmjs.org/@pantoken%2Fpublic", title: "@pantoken/public" },
  ]);
});

test("stages the generated Linkset at the well-known catalog path", () => {
  const result = spawnSync(process.execPath, [join(import.meta.dirname, "stage-api-catalog.ts")]);
  expect(result.status).toBe(0);
  const output = JSON.parse(
    readFileSync(join(import.meta.dirname, "../public/.well-known/api-catalog"), "utf8"),
  );

  expect(output.linkset[0].anchor).toBe("https://pantoken.app/.well-known/api-catalog");
  expect(output.linkset[0].item).toContainEqual({
    href: "https://registry.npmjs.org/@pantoken%2Fcomponents",
    title: "@pantoken/components",
  });
});
