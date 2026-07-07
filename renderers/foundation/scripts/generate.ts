import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { proseCss } from "@pantoken/components";
import { foundationCss, foundationSettings } from "../dist/index.mjs";

const generatedDir = resolve(import.meta.dirname, "../generated");
mkdirSync(generatedDir, { recursive: true });

const settings = join(generatedDir, "_settings.scss");
writeFileSync(settings, foundationSettings);
console.log(`✓ wrote ${settings}`);

const theme = join(generatedDir, "theme.css");
writeFileSync(theme, foundationCss);
console.log(`✓ wrote ${theme}`);

const components = join(generatedDir, "components.css");
writeFileSync(components, proseCss({ scope: ".pantoken-prose" }));
console.log(`✓ wrote ${components}`);
