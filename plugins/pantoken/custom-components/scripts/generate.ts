/**
 * Emit `generated/layouts.css` — the card layout CSS with the `pfx-` sentinel replaced by `instui-`.
 * The cssdoc `@layout card` doc comment ships as part of `src/components/card/card.css`; `cardRules("instui-")`
 * produces the full sheet (comment + rules) ready for the docs parser and the published stylesheet.
 *
 * Run after `scripts/component-styles.ts` (which generates `src/generated/component-styles.ts`).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { cardRules, agentShellRules, bannerRules } from "../src/components/index.ts";

const outDir = resolve(import.meta.dirname, "../generated");
const allInstui = [cardRules("instui-"), agentShellRules("instui-"), bannerRules("instui-")].join(
  "\n",
);
const allPfx = [cardRules("pfx-"), agentShellRules("pfx-"), bannerRules("pfx-")].join("\n");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "custom-components.css"), `${allInstui}\n`);
writeFileSync(join(outDir, "_records.css"), `${allPfx}\n`);
console.log(`✓ custom-components: wrote custom-components.css + _records.css`);
