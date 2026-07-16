import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { proseCss } from "@pantoken/components";
import { docusaurusCss } from "../src/index.ts";

const dir = resolve(import.meta.dirname, "../generated");
mkdirSync(dir, { recursive: true });

// The variable bridge: --ifm-* → var(--instui-*).
const bridge = join(dir, "custom.css");
writeFileSync(bridge, docusaurusCss);
console.log(`✓ wrote ${bridge}`);

// The component look: InstUI-styled prose HTML, scoped to Docusaurus's content root.
const components = join(dir, "components.css");
writeFileSync(components, proseCss({ scope: ".markdown" }));
console.log(`✓ wrote ${components}`);
