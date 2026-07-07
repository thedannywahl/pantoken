/**
 * The bridge from shadcn/ui's CSS-variable contract to Instructure tokens. shadcn components read
 * these variables; pointing them at `var(--instui-*)` re-skins shadcn with Instructure's look while
 * keeping light/dark and high-contrast working through the same custom properties.
 *
 * @module
 */

/** shadcn CSS variable → the Instructure token it resolves to. */
export const SHADCN_TO_INSTUI: Readonly<Record<string, string>> = Object.freeze({
  "--background": "--instui-color-background-base",
  "--foreground": "--instui-color-text-base",
  "--card": "--instui-color-background-container",
  "--card-foreground": "--instui-color-text-base",
  "--popover": "--instui-color-background-container",
  "--popover-foreground": "--instui-color-text-base",
  "--primary": "--instui-color-background-brand",
  "--primary-foreground": "--instui-color-text-on-color",
  "--secondary": "--instui-color-background-muted",
  "--secondary-foreground": "--instui-color-text-base",
  "--muted": "--instui-color-background-muted",
  "--muted-foreground": "--instui-color-text-muted",
  "--accent": "--instui-color-background-info",
  "--accent-foreground": "--instui-color-text-on-color",
  "--destructive": "--instui-color-background-error",
  "--destructive-foreground": "--instui-color-text-on-color",
  "--border": "--instui-color-stroke-base",
  "--input": "--instui-color-stroke-base",
  "--ring": "--instui-color-stroke-brand",
  "--radius": "--instui-spacing-space-sm",
});
