/** The extra-small viewport breakpoint, below InstUI's 30em `sm` breakpoint. */
export function breakpointDeclarations(): string {
  return `/**
 * @declaration breakpoints
 * @summary Extra-small viewport width for phone-sized previews.
 * @cssproperty --instui-breakpoints-xs — Extra-small viewport width (20em / 320px).
 * @usage @import "@pantoken/plugin-custom-components/custom-components.css";
 */
:root {
  --instui-breakpoints-xs: 20em;
}`;
}
