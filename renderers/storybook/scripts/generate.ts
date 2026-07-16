/**
 * Emit the InstUI-look prose stylesheet scoped to storybook's content region, from
 * @pantoken/components. Runs before `vp pack`, which finalizes the published CSS.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { proseCss } from "@pantoken/components";

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });
const out = join(dir, "components.css");
writeFileSync(out, proseCss({ scope: ".sbdocs-content" }));
console.log(`✓ wrote ${out}`);
