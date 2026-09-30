/** Generate the RFC 9727 API catalog from the public first-party npm packages. */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  isPublishablePackage,
  loadWorkspacePackages,
  type WorkspacePackage,
} from "../../scripts/release/workspace-packages.ts";
import { runAsMain } from "../../scripts/release/cli.ts";

const API_CATALOG_URL = "https://pantoken.app/.well-known/api-catalog";
const NPM_REGISTRY = "https://registry.npmjs.org";

/** Build a Linkset catalog for all public first-party packages. */
export function buildApiCatalog(packages: readonly WorkspacePackage[]) {
  const item = packages
    .filter((pkg) => isPublishablePackage(pkg) && pkg.name.startsWith("@pantoken/"))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((pkg) => ({
      href: `${NPM_REGISTRY}/${pkg.name.replaceAll("/", "%2F")}`,
      title: pkg.name,
    }));

  return {
    linkset: [
      {
        anchor: API_CATALOG_URL,
        item,
        "service-doc": [
          {
            href: "https://pantoken.app/guide/getting-started",
            type: "text/html",
            title: "pantoken documentation",
          },
          {
            href: "https://create.pantoken.app/SKILL.md",
            type: "text/markdown",
            title: "create-pantoken-app agent skill",
          },
        ],
        alternate: [
          {
            href: "https://pantoken.app/llms.txt",
            type: "text/plain",
            title: "LLM-friendly documentation index",
          },
          {
            href: "https://pantoken.app/llms-full.txt",
            type: "text/plain",
            title: "Full documentation as one document",
          },
        ],
      },
    ],
  };
}

async function main(): Promise<void> {
  const { packages } = await loadWorkspacePackages();
  const catalog = buildApiCatalog(packages);
  const output = join(import.meta.dirname, "../public/.well-known/api-catalog");
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`staged API catalog with ${catalog.linkset[0].item.length} npm package endpoints`);
}

runAsMain(import.meta.url, main);
