/**
 * Writer for the compatibility manifest. Regenerates `compatibility.json` (the machine-readable
 * source of truth) and `docs/compatibility.md` (its human support-matrix render) from the repo's
 * current catalog, lockfile, vendored provenance, and workspace packages. Run after an upstream bump
 * or after adding a consumer; the `gate:compatibility` check then keeps it correct.
 *
 * @module
 */
import fs from "node:fs/promises";
import path from "node:path";
import { buildCompatibility, renderMarkdown } from "./compatibility.ts";

const ROOT = path.resolve(new URL("../../", import.meta.url).pathname);

async function main(): Promise<void> {
  const compat = await buildCompatibility();
  await fs.writeFile(path.join(ROOT, "compatibility.json"), `${JSON.stringify(compat, null, 2)}\n`);
  await fs.writeFile(path.join(ROOT, "docs/compatibility.md"), renderMarkdown(compat));
  console.log(
    `✓ compatibility: wrote compatibility.json + docs/compatibility.md (${Object.keys(compat.upstream).length} upstream sources, ${compat.consumers.length} consumers)`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
