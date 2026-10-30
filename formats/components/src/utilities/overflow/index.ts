/**
 * The overflow utility — CSS `overflow-x`/`overflow-y` as composable, globally-available classes (bare,
 * or chained onto any component) — copied from `view`'s former `-overflow-{x,y}-*` modifiers.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalModifierSelector } from "@pantoken/utils";

const OVERFLOWS = ["visible", "hidden", "auto", "scroll", "clip"] as const;
const AXES = ["x", "y"] as const;

/** The overflow utility — `overflow-x`/`overflow-y` as composable, global classes. */
export const overflow: Definition = defineUtility({
  name: "overflow",
  css: (p) => {
    const rules = AXES.flatMap((axis) =>
      OVERFLOWS.map((value) => {
        const name = `overflow-${axis}-${value}`;
        return `${globalModifierSelector(p, name)} { overflow-${axis}: ${value}; }`;
      }),
    );
    // prettier-ignore
    return css`/**
 * @utility overflow
 * @selector .--overflow-x-hidden
 * @global
 * @summary \`overflow-x\`/\`overflow-y\` as composable, global classes — \`.--overflow-x-<value>\` / \`.--overflow-y-<value>\` — usable bare or chained onto any component.
 * @modifier --overflow-x-visible — overflow-x: visible.
 * @modifier --overflow-x-hidden — overflow-x: hidden.
 * @modifier --overflow-x-auto — overflow-x: auto.
 * @modifier --overflow-x-scroll — overflow-x: scroll.
 * @modifier --overflow-x-clip — overflow-x: clip.
 * @modifier --overflow-y-visible — overflow-y: visible.
 * @modifier --overflow-y-hidden — overflow-y: hidden.
 * @modifier --overflow-y-auto — overflow-y: auto.
 * @modifier --overflow-y-scroll — overflow-y: scroll.
 * @modifier --overflow-y-clip — overflow-y: clip.
 * @a11y A scrollable region must work from the keyboard: give it \`tabindex="0"\`, a role, and an accessible name (or make sure it contains a focusable control). Don't use \`hidden\` or \`clip\` to cut off content people need to read.
 * @example -automatica11y
 * \`\`\`html
 * <div class="--overflow-y-auto" tabindex="0" role="region" aria-label="Release notes" style="block-size: 5rem">
 *   <p>Version 2.4 adds keyboard shortcuts for the gradebook.</p>
 *   <p>Version 2.3 fixes focus order in the course menu.</p>
 *   <p>Version 2.2 improves contrast in dark mode.</p>
 *   <p>Version 2.1 updates the file upload messages.</p>
 * </div>
 * \`\`\`
 * @example
 * <div class="--overflow-y-auto">…</div>
 */
${rules.join("\n")}`;
  },
});

/** The overflow utility as a standalone, header-wrapped stylesheet. */
export const overflowUtilitiesCss: Definition["css"] = overflow.css;
