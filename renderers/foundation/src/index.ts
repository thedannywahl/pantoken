/**
 * `@pantoken/foundation` — theme Foundation for Sites with Instructure tokens.
 *
 * Foundation is Sass-first, so this package ships two layers. {@link toFoundationSettings} emits a
 * `_settings`-style Sass partial that points Foundation's setting variables at `var(--instui-*)`, so
 * a Sass build compiles the Instructure look while keeping runtime theming through the same custom
 * properties. {@link toFoundationCss} emits a thin CSS overlay that themes the common compiled
 * classes (`.button`, `.callout`, links) the same way — useful when you consume stock Foundation CSS
 * and just want to layer Instructure colors on top without recompiling.
 *
 * @example
 * ```ts
 * import { foundationSettings, foundationCss } from "@pantoken/foundation";
 * // foundationSettings → a Sass partial; foundationCss → a runtime overlay.
 * ```
 *
 * @module
 * @experimental
 */

/** Foundation for Sites setting variable → the Instructure token it resolves to. */
export const FOUNDATION_TO_INSTUI: Readonly<Record<string, string>> = Object.freeze({
  "$body-background": "--instui-color-background-base",
  "$body-font-color": "--instui-color-text-base",
  "$body-font-family": "--instui-font-family-base",
  "$primary-color": "--instui-color-background-brand",
  "$secondary-color": "--instui-color-background-muted",
  "$success-color": "--instui-color-background-success",
  "$warning-color": "--instui-color-background-warning",
  "$alert-color": "--instui-color-background-error",
  "$anchor-color": "--instui-color-text-info",
  "$global-radius": "--instui-spacing-space-sm",
});

/** Options for {@link toFoundationSettings}. */
export interface ToFoundationSettingsOptions {
  /** Append `!default` to each assignment, so consumer overrides still win (default `false`). */
  useDefault?: boolean;
}

/**
 * Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.
 *
 * @param options - {@link ToFoundationSettingsOptions}.
 * @returns The Sass partial as a string.
 *
 * @example Let consumer settings still win
 * ```ts
 * toFoundationSettings({ useDefault: true });
 * ```
 */
export function toFoundationSettings(options: ToFoundationSettingsOptions = {}): string {
  const suffix = options.useDefault ? " !default" : "";
  const lines = Object.entries(FOUNDATION_TO_INSTUI).map(
    ([sassVar, instui]) => `${sassVar}: var(${instui})${suffix};`,
  );
  return `// Foundation for Sites settings themed with Instructure tokens (pantoken)\n${lines.join("\n")}\n`;
}

/** Options for {@link toFoundationCss}. */
export interface ToFoundationCssOptions {
  /** A selector prefix to scope the overlay under (e.g. `.instui`); default: unscoped. */
  scope?: string;
}

/**
 * Emit the thin runtime CSS overlay: theme Foundation's compiled classes with `var(--instui-*)`.
 *
 * @param options - {@link ToFoundationCssOptions}.
 * @returns The overlay CSS string.
 *
 * @example Scope the overlay to a container
 * ```ts
 * toFoundationCss({ scope: ".instui" });
 * ```
 */
export function toFoundationCss(options: ToFoundationCssOptions = {}): string {
  const prefix = options.scope ? `${options.scope} ` : "";
  const rules = [
    [
      `${prefix}body`,
      "background-color: var(--instui-color-background-base);\n  color: var(--instui-color-text-base);",
    ],
    [
      `${prefix}.button`,
      "background-color: var(--instui-color-background-brand);\n  border-radius: var(--instui-spacing-space-sm);",
    ],
    [`${prefix}.button.secondary`, "background-color: var(--instui-color-background-muted);"],
    [`${prefix}.button.success`, "background-color: var(--instui-color-background-success);"],
    [`${prefix}.button.warning`, "background-color: var(--instui-color-background-warning);"],
    [`${prefix}.button.alert`, "background-color: var(--instui-color-background-error);"],
    [
      `${prefix}.callout`,
      "background-color: var(--instui-color-background-base);\n  border: 1px solid var(--instui-color-stroke-base);\n  border-radius: var(--instui-spacing-space-sm);\n  color: var(--instui-color-text-base);",
    ],
    [`${prefix}.callout.success`, "background-color: var(--instui-color-background-success);"],
    [`${prefix}.callout.warning`, "background-color: var(--instui-color-background-warning);"],
    [`${prefix}.callout.alert`, "background-color: var(--instui-color-background-error);"],
    [`${prefix}a`, "color: var(--instui-color-text-info);"],
  ];
  const body = rules.map(([selector, decls]) => `${selector} {\n  ${decls}\n}`).join("\n");
  return `/* Foundation for Sites themed with Instructure tokens (pantoken) */\n${body}\n`;
}

/** The ready-made Sass settings partial. */
export const foundationSettings: string = toFoundationSettings();

/** The ready-made runtime CSS overlay. */
export const foundationCss: string = toFoundationCss();

export default foundationCss;
