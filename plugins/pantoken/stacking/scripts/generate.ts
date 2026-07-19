/**
 * Emit `generated/stacking.css` — the `:root` `--instui-stacking-*` token block, a typed `@property`
 * registration per token (so each carries a `<integer>` syntax and a concrete `initial-value` default,
 * which the cssdoc CSS-API table reads into its Type and Default columns), the authored cssdoc
 * `@utility` record, and the `.instui-stack-<level>` utility rules, at the default `instui` prefix. The
 * `:root` block leads so the doc comment binds to the first class rule (cssdoc attaches a comment to the
 * next rule); the `@property` at-rules trail the doc so cssdoc folds their type/default into the record.
 * The sheet feeds the stylelint/eslint cssdoc lint and the docs CSS-API pages.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { STACKING_LEVELS, STACKING_RULES, stackingRootCss } from "../src/index.ts";

const rootCss = stackingRootCss();

// The concrete z-index each `--instui-stacking-<level>` resolves to, pulled from the `:root` block, so
// the `@property` defaults below stay in lock-step with the emitted token values.
const valueByName = new Map(
  [...rootCss.matchAll(/(--instui-stacking-[\w-]+):\s*(-?\d+);/gu)].map((m) => [m[1], m[2]]),
);

// One typed registration per token: `z-index` is an integer, tokens cascade (`inherits: true`), and the
// `initial-value` is the resolved depth. cssdoc reads `syntax` → Type and `initial-value` → Default.
const PROPERTY_RULES = STACKING_LEVELS.map((level) => {
  const name = `--instui-stacking-${level}`;
  return `@property ${name} { syntax: "<integer>"; inherits: true; initial-value: ${valueByName.get(name)}; }`;
}).join("\n");

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

const sheet = `${rootCss}\n${DOC}\n${PROPERTY_RULES}\n${STACKING_RULES}\n`;

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "stacking.css"), sheet);
console.log(`✓ stacking: wrote stacking.css (${STACKING_RULES.split("\n").length} rules)`);
