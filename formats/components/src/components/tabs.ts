import { defineComponent } from "../lib/define.ts";
import { scope } from "../lib/helpers.ts";

export const tabs = defineComponent({
  name: "tabs",
  summary: "A tabbed panel set: a tab list, selectable tabs, and their panels.",
  parts: [
    { name: ".list", description: "The row of tabs." },
    { name: ".tab", description: "A single tab; `-selected` marks the active one." },
    { name: ".panel", description: "The content panel for a tab." },
  ],
  examples: [
    `<div class="instui-tabs">
  <div class="list" role="tablist" aria-label="Default tabs">
    <button class="tab -selected" role="tab" aria-selected="true">Overview</button>
    <button class="tab" role="tab" aria-selected="false">Details</button>
    <button class="tab -disabled" role="tab" aria-disabled="true" disabled>Disabled</button>
    <button class="tab" role="tab" aria-selected="false">History</button>
  </div>
  <div class="panel" role="tabpanel">The Overview tab's content shows here.</div>
</div>`,
  ],
  structure: `.instui-tabs
  .list
    .tab.-selected
    .tab
    .tab.-disabled
  .panel`,
  css: (p) => {
    const root = `.${p}tabs`;
    return `
${root} {
  display: flex;
  flex-direction: column;
  background: var(--instui-component-tabs-default-background);
}
${scope(
  root,
  `
.${p}tabs .list {
  display: flex;
  width: 100%;
  flex-flow: row wrap;
}
.${p}tabs.-overflow-scroll .list {
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}
.${p}tabs.-overflow-scroll .list::-webkit-scrollbar { display: none; }
.${p}tabs .tab {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: 0;
  color: var(--instui-component-tabs-tab-default-text-color);
  font-family: var(--instui-component-tabs-tab-font-family);
  font-size: var(--instui-component-tabs-tab-font-size);
  font-weight: var(--instui-component-tabs-tab-font-weight);
  line-height: 1;
  padding: 1rem 1.25rem;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  position: relative;
  z-index: 1;
  /* Layout-stable underline: always 0.25rem, coloured only when hovered or selected. */
  border-bottom: 0.25rem solid transparent;
  margin-bottom: calc(-1 * var(--instui-component-tabs-panel-border-width));
}
.${p}tabs .tab:hover:not(.-selected):not(.-disabled):not([aria-selected="true"]):not([aria-disabled="true"]) {
  border-bottom-color: var(--instui-component-tabs-tab-default-hover-border-color);
}
.${p}tabs .tab.-selected,
.${p}tabs .tab[aria-selected="true"] {
  border-bottom-color: var(--instui-component-tabs-tab-default-selected-border-color);
}
.${p}tabs .tab.-disabled,
.${p}tabs .tab[aria-disabled="true"],
.${p}tabs .tab:disabled {
  opacity: 0.5;
  font-weight: normal;
  cursor: default;
}
/* Secondary variant: rounded "folder" tabs; the selected tab's bottom border matches the panel
   background so it visually connects into the panel below. */
.${p}tabs.-variant-secondary .tab {
  padding: 0.75rem 1rem;
  line-height: var(--instui-component-tabs-tab-line-height);
  color: var(--instui-component-tabs-tab-secondary-text-color);
  margin-inline-end: 0.2em;
  margin-bottom: calc(-1 * var(--instui-component-tabs-panel-border-width));
  border: var(--instui-component-tabs-panel-border-width) solid transparent;
  border-radius: 0.1875rem 0.1875rem 0 0;
}
.${p}tabs.-variant-secondary .tab:first-of-type { margin-inline-start: 0; }
.${p}tabs.-variant-secondary .tab:hover:not(.-selected):not(.-disabled):not([aria-selected="true"]):not([aria-disabled="true"]) {
  background: var(--instui-component-tabs-tab-secondary-selected-background);
  border-color: var(--instui-component-tabs-tab-secondary-selected-border-color);
  color: var(--instui-component-tabs-tab-secondary-selected-text-color);
}
.${p}tabs.-variant-secondary .tab.-selected,
.${p}tabs.-variant-secondary .tab[aria-selected="true"] {
  background: var(--instui-component-tabs-tab-secondary-selected-background);
  border-color: var(--instui-component-tabs-tab-secondary-selected-border-color);
  border-bottom-color: var(--instui-component-tabs-tab-secondary-selected-background);
  color: var(--instui-component-tabs-tab-secondary-selected-text-color);
}
.${p}tabs .panel {
  box-sizing: border-box;
  border-top: var(--instui-component-tabs-panel-border-width) solid var(--instui-component-tabs-panel-border-color);
  background: var(--instui-component-tabs-panel-background);
  color: var(--instui-component-tabs-panel-text-color);
  font-family: var(--instui-component-tabs-panel-font-family);
  font-size: var(--instui-component-tabs-panel-font-size);
  font-weight: var(--instui-component-tabs-panel-font-weight);
  line-height: var(--instui-component-tabs-panel-line-height);
  padding: var(--instui-spacing-space-sm) var(--instui-spacing-space-md) var(--instui-spacing-space-md);
}
.${p}tabs .panel[hidden] { display: none; }
`,
  ["list", "panel"],
)}`;
  },
});

export const tabsCss = tabs.css;
