/**
 * The View primitive component — InstUI's `View` as a neutral box with key-value modifiers for its
 * visual props (background, border, radius, shadow, display, position, overflow, cursor).
 *
 * @module
 */
import { defineComponent, type Definition } from "../../lib/define.ts";
import { SENTINEL } from "../../lib/sentinel.ts";
import { appendGenerated } from "../../lib/aliases.ts";
import { view as viewRaw } from "../../generated/component-styles.ts";

/** Generate rules for background modifiers. */
const buildBackgroundRules = (rule: (mod: string, decls: string) => string): string[] => {
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
const buildBorderRules = (rule: (mod: string, decls: string) => string): string[] => {
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
const buildEnumRules = (rule: (mod: string, decls: string) => string): string[] => {
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
    const rule = (mod: string, decls: string): string => `&.-${mod} { ${decls} }`;
    const rules: string[] = [
      ...buildBackgroundRules(rule),
      ...buildBorderRules(rule),
      ...buildEnumRules(rule),
    ];
    return appendGenerated(viewRaw.replaceAll(SENTINEL, p), rules.join("\n"));
  },
});

/** The View component as a standalone, header-wrapped stylesheet. */
export const viewCss: Definition["css"] = view.css;
