/**
 * The View primitive component — InstUI's `View` as a neutral box with key-value modifiers for its
 * visual props (background, border, radius, shadow, display, position, overflow, cursor).
 *
 * @module
 */
import { defineComponent, type Definition } from "../../lib/define.ts";
import { css } from "../../lib/css.ts";

/** Generate rules for background modifiers. */
const buildBackgroundRules = (
  p: string,
  rule: (mod: string, decls: string) => string,
): string[] => {
  const backgrounds = [
    "primary",
    "secondary",
    "primary-inverse",
    "brand",
    "info",
    "alert",
    "success",
    "danger",
    "warning",
  ];
  return [
    ...backgrounds.map((bg) =>
      rule(`background-${bg}`, `background: var(--instui-component-view-background-${bg});`),
    ),
    rule("background-transparent", "background: transparent;"),
  ];
};

/** Generate rules for border modifiers (radius, width, color). */
const buildBorderRules = (p: string, rule: (mod: string, decls: string) => string): string[] => {
  const radiusRules = [
    ["small", "var(--instui-border-radius-sm)"],
    ["medium", "var(--instui-border-radius-md)"],
    ["large", "var(--instui-border-radius-lg)"],
    ["circle", "50%"],
    ["pill", "var(--instui-border-radius-full)"],
  ].map(([name, value]) => rule(`border-radius-${name}`, `border-radius: ${value};`));

  const widthRules = [
    ["small", "sm"],
    ["medium", "md"],
    ["large", "lg"],
  ].map(([name, size]) =>
    rule(
      `border-width-${name}`,
      `border-style: solid; border-width: var(--instui-border-width-${size}); border-color: var(--instui-color-stroke-base);`,
    ),
  );

  const colorRules = [
    ["primary", "base"],
    ["brand", "brand"],
    ["success", "success"],
    ["info", "info"],
    ["warning", "warning"],
    ["danger", "error"],
  ].map(([name, token]) =>
    rule(`border-color-${name}`, `border-color: var(--instui-color-stroke-${token});`),
  );

  return [...radiusRules, ...widthRules, ...colorRules];
};

/** Generate rules for shadow, display, position, overflow, and cursor modifiers. */
const buildEnumRules = (p: string, rule: (mod: string, decls: string) => string): string[] => {
  const shadowRules = ["resting", "above", "topmost"].map((s) =>
    rule(`shadow-${s}`, `box-shadow: var(--instui-elevation-${s});`),
  );

  const displayRules = ["block", "inline-block", "inline", "flex", "inline-flex", "none"].map((d) =>
    rule(`display-${d}`, `display: ${d};`),
  );

  const positionRules = ["static", "relative", "absolute", "fixed", "sticky"].map((pos) =>
    rule(`position-${pos}`, `position: ${pos};`),
  );

  const overflowRules = ["visible", "hidden", "auto", "scroll", "clip"].flatMap((o) => [
    rule(`overflow-x-${o}`, `overflow-x: ${o};`),
    rule(`overflow-y-${o}`, `overflow-y: ${o};`),
  ]);

  const cursorRules = [
    "auto",
    "default",
    "pointer",
    "not-allowed",
    "text",
    "move",
    "grab",
    "wait",
  ].map((c) => rule(`cursor-${c}`, `cursor: ${c};`));

  return [...shadowRules, ...displayRules, ...positionRules, ...overflowRules, ...cursorRules];
};

/** The View component — a neutral box with key-value modifiers for its visual props (background, border, radius, shadow, display, position, overflow, cursor). */
export const view: Definition = defineComponent({
  name: "view",
  css: (p) => {
    const rule = (mod: string, decls: string): string => `.${p}view.-${mod} { ${decls} }`;
    const rules: string[] = [`.${p}view { display: block; box-sizing: border-box; }`];
    rules.push(...buildBackgroundRules(p, rule));
    rules.push(...buildBorderRules(p, rule));
    rules.push(...buildEnumRules(p, rule));
    // prettier-ignore
    return css`/**
 * @component view
 * @summary The View primitive: a neutral box with key-value modifiers for background, border, radius, shadow, display, position, overflow, and cursor. Every one of these modifiers is also available globally (bare, or chained onto any other component) — see the \`background\`/\`border\`/\`shadow\`/\`display\`/\`position\`/\`overflow\`/\`cursor\` utilities.
 * @modifier -background-primary — Primary surface background.
 * @modifier -background-secondary — Secondary surface background.
 * @modifier -background-primary-inverse — Inverse primary surface background.
 * @modifier -background-brand — Brand surface background.
 * @modifier -background-info — Info surface background.
 * @modifier -background-alert — Alert surface background.
 * @modifier -background-success — Success surface background.
 * @modifier -background-danger — Danger surface background.
 * @modifier -background-warning — Warning surface background.
 * @modifier -background-transparent — Transparent background.
 * @modifier -border-radius-small — Small corner radius.
 * @modifier -border-radius-medium — Medium corner radius.
 * @modifier -border-radius-large — Large corner radius.
 * @modifier -border-radius-circle — Fully circular (50%) radius.
 * @modifier -border-radius-pill — Pill (full) radius.
 * @modifier -border-width-small — Small solid border in the base stroke colour.
 * @modifier -border-width-medium — Medium solid border in the base stroke colour.
 * @modifier -border-width-large — Large solid border in the base stroke colour.
 * @modifier -border-color-primary — Base stroke border colour.
 * @modifier -border-color-brand — Brand stroke border colour.
 * @modifier -border-color-success — Success stroke border colour.
 * @modifier -border-color-info — Info stroke border colour.
 * @modifier -border-color-warning — Warning stroke border colour.
 * @modifier -border-color-danger — Error stroke border colour.
 * @modifier -shadow-resting — Resting elevation shadow.
 * @modifier -shadow-above — Above elevation shadow.
 * @modifier -shadow-topmost — Topmost elevation shadow.
 * @modifier -display-block — display: block.
 * @modifier -display-inline-block — display: inline-block.
 * @modifier -display-inline — display: inline.
 * @modifier -display-flex — display: flex.
 * @modifier -display-inline-flex — display: inline-flex.
 * @modifier -display-none — display: none.
 * @modifier -position-static — position: static.
 * @modifier -position-relative — position: relative.
 * @modifier -position-absolute — position: absolute.
 * @modifier -position-fixed — position: fixed.
 * @modifier -position-sticky — position: sticky.
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
 * @modifier -cursor-auto — cursor: auto.
 * @modifier -cursor-default — cursor: default.
 * @modifier -cursor-pointer — cursor: pointer.
 * @modifier -cursor-not-allowed — cursor: not-allowed.
 * @modifier -cursor-text — cursor: text.
 * @modifier -cursor-move — cursor: move.
 * @modifier -cursor-grab — cursor: grab.
 * @modifier -cursor-wait — cursor: wait.
 * @example
 * <div class="instui-view -background-secondary -border-radius-medium -shadow-resting">A card-like surface.</div>
 */
${rules.join("\n")}`;
  },
});

/** The View component as a standalone, header-wrapped stylesheet. */
export const viewCss: Definition["css"] = view.css;
