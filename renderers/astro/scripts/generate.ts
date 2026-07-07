/**
 * Emit the InstUI-look prose stylesheet scoped to astro's content region, from
 * @pantoken/components. Runs after `vp pack`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { proseCss } from "@pantoken/components";

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });
const out = join(dir, "components.css");
writeFileSync(out, proseCss({ scope: ".pantoken-prose" }));
console.log(`✓ wrote ${out}`);
