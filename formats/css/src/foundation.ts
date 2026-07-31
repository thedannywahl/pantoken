import type { PantokenPlugin } from "@pantoken/model";
import { definePlugin } from "@pantoken/plugin-kit";
import { elevationDeclarations, focusOutlineDeclarations } from "@pantoken/utils";

/**
 * The elevation (`--instui-elevation-*`) and focus-outline (`--instui-focus-outline-*`) composite
 * custom properties shared by the ready-made token sheets and docs-only themed token sheet.
 */
export const foundationPlugin: PantokenPlugin = definePlugin({
  name: "pantoken-foundation",
  css: () => ({
    marker: "pantoken foundation — elevation + focus-outline custom properties",
    declarations: [...elevationDeclarations(), ...focusOutlineDeclarations()],
  }),
});
