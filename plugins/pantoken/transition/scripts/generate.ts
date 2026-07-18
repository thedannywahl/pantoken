/**
 * Emit `generated/transition.css` — the `:root` `--instui-transition-*` token block, the authored cssdoc
 * `@utility` record, and the `.instui-transition` state-class rules, at the default `instui` prefix. The
 * `:root` block leads so the doc comment binds to the first class rule (cssdoc attaches a comment to the
 * next rule). Every state class is a `.-<type>-<state>` modifier, so each is listed as an `@modifier`
 * (built from the type × state matrix) or the `undocumented-modifier` lint rule trips. The sheet feeds
 * the stylelint/eslint cssdoc lint and the docs CSS-API pages.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { TRANSITION_RULES, transitionRootCss } from "../src/index.ts";

const TYPES = ["fade", "scale", "slide-right", "slide-left", "slide-up", "slide-down"] as const;
const STATES = ["entering", "entered", "exiting", "exited"] as const;

const modifiers = TYPES.flatMap((type) =>
  STATES.map((state) => {
    const label = type.replace("-", " ");
    return ` * @modifier -${type}-${state} — The ${label} transition's "${state}" state.`;
  }),
).join("\n");

const DOC = `/**
 * @utility transition
 * @class .instui-transition
 * @summary Enter/exit animation CSS: put \`.instui-transition\` on an element and toggle a \`.-<type>-<state>\` class (\`fade\`, \`scale\`, or \`slide-{up,down,left,right}\` × \`entering\`/\`entered\`/\`exiting\`/\`exited\`) from your own JS to animate it in and out.
 * @cssproperty --instui-transition-duration — The animation duration (default \`300ms\`).
 * @cssproperty --instui-transition-timing — The animation timing function (default \`ease-in-out\`).
${modifiers}
 * @example
 * <div class="instui-transition -fade-entered">Faded in.</div>
 */`;

const sheet = `${transitionRootCss()}\n${DOC}\n${TRANSITION_RULES}\n`;

const outDir = resolve(import.meta.dirname, "../generated");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "transition.css"), sheet);
console.log(
  `✓ transition: wrote transition.css (${String(TYPES.length * STATES.length)} modifiers)`,
);
