import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { proseCss } from "@pantoken/components";
import { bootstrapCss } from "../src/index.ts";

const out = resolve(import.meta.dirname, "../generated/theme.css");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, bootstrapCss);
console.log(`✓ wrote ${out}`);

const components = join(resolve(import.meta.dirname, "../generated"), "components.css");
writeFileSync(components, proseCss({ scope: ".pantoken-prose" }));
console.log(`✓ wrote ${components}`);
