import fs from "node:fs/promises";
import path from "node:path";

import {
  BUGS_URL,
  ENGINES,
  expectedRepository,
  expectedSideEffects,
  HOMEPAGE_URL,
} from "./repository-metadata.ts";
import { isPublishablePackage, loadWorkspacePackages } from "./workspace-packages.ts";

type Manifest = Record<string, unknown>;

// Keys we position deterministically, keyed by the anchor they follow. `homepage`/`bugs` sit with
// `repository`; `sideEffects`/`engines` sit with `type` — so diffs stay localized regardless of where
// the key was before.
const MANAGED_AFTER: Record<string, string[]> = {
  repository: ["homepage", "bugs"],
  type: ["sideEffects", "engines"],
};
const MANAGED = new Set(Object.values(MANAGED_AFTER).flat());

/**
 * Rebuild the manifest's key order, lifting the managed keys out of wherever they are and re-inserting
 * them right after their anchor. Any managed key whose anchor is absent is appended at the end.
 */
function reorder(manifest: Manifest): Manifest {
  const out: Manifest = {};
  const push = (key: string): void => {
    if (key in manifest && !(key in out)) out[key] = manifest[key];
  };

  for (const key of Object.keys(manifest)) {
    if (MANAGED.has(key)) continue; // placed at its anchor below, not in original position
    push(key);
    for (const k of MANAGED_AFTER[key] ?? []) push(k);
  }

  for (const key of MANAGED) push(key); // fallback: anchor absent

  return out;
}

async function syncPackage(relDir: string): Promise<boolean> {
  const manifestPath = path.resolve(relDir, "package.json");
  const raw = await fs.readFile(manifestPath, "utf8");
  const manifest = JSON.parse(raw) as Manifest;

  manifest.repository = expectedRepository(relDir);
  manifest.homepage = HOMEPAGE_URL;
  manifest.bugs = BUGS_URL;
  // Read the CSS surface from the original manifest before we touch anything else.
  manifest.sideEffects = expectedSideEffects(manifest);
  manifest.engines = { ...ENGINES };
  manifest.publishConfig = {
    ...(manifest.publishConfig as Manifest | undefined),
    provenance: true,
  };

  const next = `${JSON.stringify(reorder(manifest), null, 2)}\n`;
  if (next === raw) return false;

  await fs.writeFile(manifestPath, next);
  return true;
}

async function main(): Promise<void> {
  const { packages } = await loadWorkspacePackages();
  const publishable = packages.filter((pkg) => isPublishablePackage(pkg));

  let changed = 0;
  for (const pkg of publishable) {
    if (await syncPackage(pkg.path)) {
      changed += 1;
      process.stdout.write(`updated ${pkg.path}/package.json\n`);
    }
  }

  process.stdout.write(
    `Repository metadata sync complete: ${changed} changed, ${publishable.length - changed} already current (${publishable.length} publishable).\n`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
