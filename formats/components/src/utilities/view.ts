/**
 * The View primitive utility — InstUI's `View` as a neutral box with key-value modifiers for its
 * visual props (background, border, radius, shadow, display, position, overflow, cursor).
 *
 * @module
 */
import { defineUtility } from "../lib/define.ts";

export const view = defineUtility({
  name: "view",
  summary:
    "The View primitive: a neutral box with key-value modifiers for background, border, radius, shadow, display, position, overflow, and cursor.",
  examples: [
    '<div class="instui-view -background-secondary -border-radius-medium -shadow-resting">A card-like surface.</div>',
  ],
  css: (p) => {
    const rule = (mod: string, decls: string): string => `.${p}view.-${mod} { ${decls} }`;
    const rules: string[] = [`.${p}view { display: block; box-sizing: border-box; }`];
    // background — InstUI View's surfaces (its own component-view-background-* tokens).
    for (const bg of [
      "primary",
      "secondary",
      "primary-inverse",
      "brand",
      "info",
      "alert",
      "success",
      "danger",
      "warning",
    ]) {
      rules.push(
        rule(`background-${bg}`, `background: var(--instui-component-view-background-${bg});`),
      );
    }
    rules.push(rule("background-transparent", "background: transparent;"));
    // border-radius — InstUI View's named radii (circle/pill are shape values).
    for (const [name, value] of [
      ["small", "var(--instui-border-radius-sm)"],
      ["medium", "var(--instui-border-radius-md)"],
      ["large", "var(--instui-border-radius-lg)"],
      ["circle", "50%"],
      ["pill", "var(--instui-border-radius-full)"],
    ] as const) {
      rules.push(rule(`border-radius-${name}`, `border-radius: ${value};`));
    }
    // border-width — sets a solid border in the base stroke colour (override with -border-color-*).
    for (const [name, size] of [
      ["small", "sm"],
      ["medium", "md"],
      ["large", "lg"],
    ] as const) {
      rules.push(
        rule(
          `border-width-${name}`,
          `border-style: solid; border-width: var(--instui-border-width-${size}); border-color: var(--instui-color-stroke-base);`,
        ),
      );
    }
    // border-color — semantic stroke colours (danger maps to the error stroke token).
    for (const [name, token] of [
      ["primary", "base"],
      ["brand", "brand"],
      ["success", "success"],
      ["info", "info"],
      ["warning", "warning"],
      ["danger", "error"],
    ] as const) {
      rules.push(
        rule(`border-color-${name}`, `border-color: var(--instui-color-stroke-${token});`),
      );
    }
    // shadow — the named elevations (defined by elevationCss, shipped in components.css).
    for (const s of ["resting", "above", "topmost"]) {
      rules.push(rule(`shadow-${s}`, `box-shadow: var(--instui-elevation-${s});`));
    }
    // display / position / overflow / cursor — plain CSS enums.
    for (const d of ["block", "inline-block", "inline", "flex", "inline-flex", "none"]) {
      rules.push(rule(`display-${d}`, `display: ${d};`));
    }
    for (const pos of ["static", "relative", "absolute", "fixed", "sticky"]) {
      rules.push(rule(`position-${pos}`, `position: ${pos};`));
    }
    for (const o of ["visible", "hidden", "auto", "scroll", "clip"]) {
      rules.push(rule(`overflow-x-${o}`, `overflow-x: ${o};`));
      rules.push(rule(`overflow-y-${o}`, `overflow-y: ${o};`));
    }
    for (const c of ["auto", "default", "pointer", "not-allowed", "text", "move", "grab", "wait"]) {
      rules.push(rule(`cursor-${c}`, `cursor: ${c};`));
    }
    return rules.join("\n");
  },
});

export const viewCss = view.css;
