# @pantoken/vitepress-sidebar-toggle

A persistent show/hide toggle for a VitePress site's whole sidebar — not per-group collapse (VitePress
already supports that via `collapsed: true`). Hiding the sidebar gives page content the full width,
equivalent to per-page frontmatter `sidebar: false`, but user-toggleable and restorable. State
persists across navigation and reloads via `localStorage`, restored by a blocking pre-hydration
script so there's no flash of the wrong state.

No dependency on any `@pantoken/*` package. Requires a site whose theme extends VitePress's
`DefaultTheme` (the toggle icon reuses VitePress's own built-in `vpi-chevron-*` icon classes).

## Setup

`.vitepress/config.ts`:

```ts
import { defineConfig } from "vitepress";
import { sidebarToggleHead } from "@pantoken/vitepress-sidebar-toggle";

export default defineConfig({
  head: [sidebarToggleHead()],
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

Then drop `<SidebarToggle />` into a theme slot, e.g. `nav-bar-content-after` in a custom `Layout.vue`.

## Localization

`sidebarToggleLabel` is a plain `themeConfig` string, following VitePress core's own convention
(`sidebarMenuLabel`, `mobileMenuLabel`, `langMenuLabel`, …). VitePress deep-merges
`locales.<code>.themeConfig` over the root `themeConfig`, so set a translated value per locale the
same way you would for any built-in VitePress label — no plugin-specific i18n API to learn.

## Options

Both `sidebarToggleHead(options)` and the `<SidebarToggle>` component accept:

- `storageKey` — the `localStorage` key persisting hidden/shown state. Default: `vitepress-sidebar-hidden`.
- `hiddenClass` — the class applied to `<html>` while hidden. Default: `sidebar-hidden`.

Pass matching options to both if you customize either — the head script and the component must agree.

## Programmatic access

```ts
import { useSidebarVisibility } from "@pantoken/vitepress-sidebar-toggle";

const { isHidden, toggle } = useSidebarVisibility();
```
