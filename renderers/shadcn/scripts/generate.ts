/**
 * Emit the static `theme.css` (`@pantoken/shadcn/theme.css`) before `vp pack` finalizes it.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { proseCss } from "@pantoken/components";
import { shadcnCss, shadcnTailwindV4Css } from "../src/index.ts";

const out = resolve(import.meta.dirname, "../generated/theme.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, shadcnCss);
console.log(`✓ wrote ${out}`);

const tailwindV4 = join(resolve(import.meta.dirname, "../generated"), "tailwind-v4.css");
writeFileSync(tailwindV4, shadcnTailwindV4Css);
console.log(`✓ wrote ${tailwindV4}`);

const components = join(resolve(import.meta.dirname, "../generated"), "components.css");
writeFileSync(components, proseCss({ scope: ".pantoken-prose" }));
console.log(`✓ wrote ${components}`);
