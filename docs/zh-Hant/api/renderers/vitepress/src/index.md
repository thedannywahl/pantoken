[pantoken](../../../index.md) / vitepress

# vitepress

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

`@pantoken/vitepress` — theme a VitePress site with Instructure tokens.

VitePress theming is driven by `--vp-*` CSS variables. This points them at `var(--instui-*)`, so
dropping the output into `.vitepress/theme/custom.css` (alongside `@pantoken/css`, which defines
the custom properties) re-skins the docs with the Instructure look while light/dark keeps flowing
through the same tokens.

## 介面

- [ToVitePressCssOptions](interfaces/ToVitePressCssOptions.md)

## 變數

- [VITEPRESS\_TO\_INSTUI](variables/VITEPRESS_TO_INSTUI.md)
