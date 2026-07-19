/**
 * Emit `generated/stacking.css` — the `:root` `--instui-stacking-*` token block, the authored cssdoc
 * `@utility` record, and the `.instui-stack-<level>` utility rules, at the default `instui` prefix. The
 * `:root` block leads so the doc comment binds to the first class rule (cssdoc attaches a comment to the
 * next rule). The sheet feeds the stylelint/eslint cssdoc lint and the docs CSS-API pages.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { STACKING_RULES, stackingRootCss } from "../src/index.ts";

const DOC = `/**
 * @utility stacking
 * @class .instui-stack-topmost
 * @group Plugins
 * @summary z-index depth utilities: \`.instui-stack-<level>\` (\`deepest\`, \`below\`, \`above\`, \`topmost\`) set \`z-index\` from the \`--instui-stacking-*\` scale, so layers stack predictably instead of by hand-tuned numbers.
 * @cssproperty --instui-stacking-deepest — The lowest stacking depth.
 * @cssproperty --instui-stacking-below — Below the default flow.
 * @cssproperty --instui-stacking-above — Above the default flow.
 * @cssproperty --instui-stacking-topmost — The highest stacking depth (overlays, menus).
 * @example
 * <div class="instui-stack-topmost">Always on top.</div>
 */`;

const sheet = `${stackingRootCss()}\n${DOC}\n${STACKING_RULES}\n`;

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "stacking.css"), sheet);
console.log(`✓ stacking: wrote stacking.css (${STACKING_RULES.split("\n").length} rules)`);
