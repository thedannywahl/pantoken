/**
 * Emit one stylesheet per component for the per-component CSS subpath exports
 * (`@import "@pantoken/components/alert.css"`).
 *
 * Runs between `generate.ts` and `vp pack` as part of `build`, NOT as part of
 * the `generate` step that docs:dev invokes. Writing 46+ files on every
 * hot-reload would trigger the workspace observer on each write and create a
 * re-render loop. Keeping this step build-only avoids that entirely.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { COMPONENTS } from "../src/components/index.ts";

const opts = { prefix: "instui" } as const;
const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const component of COMPONENTS) {
  if (component.kind !== "component") continue;
  writeFileSync(join(outDir, `${component.name}.css`), component.css(opts));
  count++;
}
console.log(`✓ components: wrote ${count} per-component CSS files`);
