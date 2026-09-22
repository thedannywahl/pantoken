# @pantoken/vitepress-sidebar-toggle

A persistent show/hide toggle for a VitePress site's whole sidebar — not per-group collapse (VitePress
already supports that via `collapsed: true`). Hiding the sidebar gives page content the full width,
equivalent to per-page frontmatter `sidebar: false`, but user-toggleable and restorable. State
persists across navigation and reloads via `localStorage`, restored by a blocking pre-hydration
script so there's no flash of the wrong state.

No dependency on any `@pantoken/*` package. Requires a site whose theme extends VitePress's
`DefaultTheme`. The default toggle icons reuse VitePress's built-in `vpi-chevron-*` classes.

## Setup

`.vitepress/config.ts`:

```ts
import { defineConfig } from "vitepress";
import { sidebarToggleHead } from "@pantoken/vitepress-sidebar-toggle";

export default defineConfig({
  head: [
    sidebarToggleHead({
      placement: "start",
      icons: { show: "my-show-icon", hide: "my-hide-icon" },
    }),
  ],
  themeConfig: {
    // optional — defaults to "Toggle sidebar"; localize per-locale like any other VitePress label
    sidebarToggleLabel: "Toggle sidebar",
  },
});
```

`.vitepress/theme/index.ts`:

```ts
import DefaultTheme from "vitepress/theme";
import SidebarToggle from "@pantoken/vitepress-sidebar-toggle/SidebarToggle.vue";
import "@pantoken/vitepress-sidebar-toggle/style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("SidebarToggle", SidebarToggle);
  },
};
```

Then drop `<SidebarToggle />` directly into the `nav-bar-content-after` theme slot in a custom
`Layout.vue`. The component must be a direct child of VitePress's navbar flex container for
`placement: "start"` to move it before search.

## Localization

`sidebarToggleLabel` is a plain `themeConfig` string, following VitePress core's own convention
(`sidebarMenuLabel`, `mobileMenuLabel`, `langMenuLabel`, …). VitePress deep-merges
`locales.<code>.themeConfig` over the root `themeConfig`, so set a translated value per locale the
same way you would for any built-in VitePress label — no plugin-specific i18n API to learn.

## Options

Both `sidebarToggleHead(options)` and the `<SidebarToggle>` component accept:

- `storageKey` — the `localStorage` key persisting hidden/shown state. Default: `vitepress-sidebar-hidden`.
- `hiddenClass` — the class applied to `<html>` while hidden. Default: `sidebar-hidden`.
- `placement` — `start` places the toggle before search; `end` leaves it after VitePress's standard
  navbar controls. Default: `end`.
- `icons.show` — CSS class or classes for the icon that shows a hidden sidebar. Default:
  `vpi-chevron-right`.
- `icons.hide` — CSS class or classes for the icon that hides a visible sidebar. Default:
  `vpi-chevron-left`.

Options passed to `sidebarToggleHead()` are available to the component automatically. Component props
override the matching head options. Directional icons mirror on the x axis for RTL locales.

The toggle appears at `60rem` and wider, exactly where VitePress hides its built-in local-nav menu.
Clicking that narrow-viewport menu always restores a persistently hidden sidebar before VitePress opens
it, keeping both controls synchronized.

## Programmatic access

```ts
import { useSidebarVisibility } from "@pantoken/vitepress-sidebar-toggle";

const { isHidden, show, toggle } = useSidebarVisibility();
```
