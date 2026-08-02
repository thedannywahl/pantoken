import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { applyMinify } from "@pantoken/plugin-props-minify";
import { proseCss } from "@pantoken/components";
import { foundationCss, foundationSettings } from "../src/index.ts";

const generatedDir = resolve(import.meta.dirname, "../generated");
mkdirSync(generatedDir, { recursive: true });

const settings = join(generatedDir, "_settings.scss");
writeFileSync(settings, foundationSettings);
console.log(`✓ wrote ${settings}`);

const theme = join(generatedDir, "theme.css");
writeFileSync(theme, applyMinify(foundationCss, { flatten: true }));
console.log(`✓ wrote ${theme}`);

const components = join(generatedDir, "components.css");
writeFileSync(components, applyMinify(proseCss({ scope: ".pantoken-prose" }), { flatten: true }));
console.log(`✓ wrote ${components}`);
