/**
 * The overflow utility — CSS `overflow-x`/`overflow-y` as composable, globally-available classes (bare,
 * or chained onto any component) — copied from `view`'s former `-overflow-{x,y}-*` modifiers.
 *
 * @module
 */
import { css } from "../../lib/css.ts";
import { defineUtility, type Definition } from "../../lib/define.ts";
import { globalSelectors } from "../../lib/global-alias.ts";

const OVERFLOWS = ["visible", "hidden", "auto", "scroll", "clip"] as const;
const AXES = ["x", "y"] as const;

/** The overflow utility — `overflow-x`/`overflow-y` as composable, global classes. */
export const overflow: Definition = defineUtility({
  name: "overflow",
  css: (p) => {
    const rules = AXES.flatMap((axis) =>
      OVERFLOWS.map((value) => {
        const name = `overflow-${axis}-${value}`;
        const selectors = globalSelectors(p, `.${p}${name}`, `.-${name}`);
        return `${selectors.join(", ")} { overflow-${axis}: ${value}; }`;
      }),
    );
    // prettier-ignore
    return css`/**
 * @utility overflow
 * @selector .instui-overflow-x-hidden
 * @global
 * @summary \`overflow-x\`/\`overflow-y\` as composable, global classes — \`.instui-overflow-x-<value>\` / \`.instui-overflow-y-<value>\` — usable bare or chained onto any component.
 * @modifier -overflow-x-visible — overflow-x: visible.
 * @modifier -overflow-x-hidden — overflow-x: hidden.
 * @modifier -overflow-x-auto — overflow-x: auto.
 * @modifier -overflow-x-scroll — overflow-x: scroll.
 * @modifier -overflow-x-clip — overflow-x: clip.
 * @modifier -overflow-y-visible — overflow-y: visible.
 * @modifier -overflow-y-hidden — overflow-y: hidden.
 * @modifier -overflow-y-auto — overflow-y: auto.
 * @modifier -overflow-y-scroll — overflow-y: scroll.
 * @modifier -overflow-y-clip — overflow-y: clip.
 * @example
 * <div class="instui-overflow-y-auto">…</div>
 */
${rules.join("\n")}`;
  },
});

/** The overflow utility as a standalone, header-wrapped stylesheet. */
export const overflowUtilitiesCss: Definition["css"] = overflow.css;
