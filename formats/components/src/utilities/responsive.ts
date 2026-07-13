/**
 * The responsive-visibility utilities — the closest pure-CSS analogue to InstUI's `<Responsive>`:
 * viewport-width hide classes plus `-cq-` container-query variants.
 *
 * @module
 */
import { defineUtility } from "../lib/define.ts";
import { css } from "../lib/css.ts";

export const responsive = defineUtility({
  name: "responsive",
  css: (p) => {
    const bp: [string, string][] = [
      ["sm", "30rem"],
      ["md", "48rem"],
      ["lg", "64rem"],
      ["xl", "80rem"],
    ];
    const viewport = bp
      .map(
        ([name, w]) =>
          `@media (max-width: ${w}) { .${p}hidden-max-${name} { display: none !important; } }\n` +
          `@media (min-width: ${w}) { .${p}hidden-min-${name} { display: none !important; } }`,
      )
      .join("\n");
    // Container-query variants — the true InstUI <Responsive> analogue: mark an ancestor `.<prefix>-container`
    // and these react to ITS width, not the viewport's. Same breakpoint scale, `-cq-` infix.
    const container = bp
      .map(
        ([name, w]) =>
          `@container (max-width: ${w}) { .${p}cq-hidden-max-${name} { display: none !important; } }\n` +
          `@container (min-width: ${w}) { .${p}cq-hidden-min-${name} { display: none !important; } }`,
      )
      .join("\n");
    // prettier-ignore
    return css`
/**
 * @utility responsive
 * @class .instui-hidden-max-md
 * @summary Responsive visibility: \`.instui-hidden-max-<bp>\` / \`-hidden-min-<bp>\` hide by viewport width; the \`-cq-\` variants react to a \`.instui-container\` ancestor's width instead. Breakpoints \`sm\`/\`md\`/\`lg\`/\`xl\`.
 * @example
 * <div class="instui-hidden-max-sm">Hidden at or below the small breakpoint.</div>
 */${viewport}\n.${p}container { container-type: inline-size; }\n${container}\n`;
  },
});

export const responsiveUtilitiesCss = responsive.css;
