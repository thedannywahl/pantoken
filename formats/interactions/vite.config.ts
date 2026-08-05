import { extendBase } from "../../vite.config.base.ts";

// All components that will have per-component IIFE bundles
const ALL_COMPONENTS = [
  "icon",
  "button",
  "alert",
  "badge",
  "pill",
  "tag",
  "avatar",
  "spinner",
  "progress",
  "metric",
  "rating",
  "progress-circle",
  "icon-button",
  "toggle-button",
  "truncate",
  "img",
  "side-nav-bar",
  "tree-browser",
  "calendar",
  "tooltip",
  "modal",
  "context-view",
  "popover",
  "tray",
  "in-place-edit",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
];

// Components that require command event handling
const _COMMAND_COMPONENTS = new Set([
  "button",
  "icon-button",
  "toggle-button",
  "calendar",
  "drilldown",
  "pages",
  "drawer-layout",
  "date-input",
  "date-time-input",
]);


export default extendBase({
  run: {
    tasks: {
      build: {
        command: ["node scripts/generate-components.ts", "vp pack", "node scripts/build-iife.ts"],
      },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      interactions: "src/index.ts",
      ...Object.fromEntries(ALL_COMPONENTS.map((name) => [name, `src/components/${name}.ts`])),
    },
    // Build IIFE bundles separately via build-iife.ts
    exports: false,
  },
});
