[pantoken](../../../index.md) / shadcn

# shadcn

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

`@pantoken/shadcn` — theme shadcn/ui with Instructure tokens.

[toShadcnCss](functions/toShadcnCss.md) emits a `:root` block pointing shadcn's CSS variables at `var(--instui-*)`.
Drop it in alongside `@pantoken/css` (which defines the custom properties) and shadcn components
adopt the Instructure look. Icons align for free — shadcn and Instructure both use Lucide.

## 介面

- [ToShadcnCssOptions](interfaces/ToShadcnCssOptions.md)

## 變數

- [shadcnCss](variables/shadcnCss.md)
- [SHADCN\_TO\_INSTUI](variables/SHADCN_TO_INSTUI.md)

## 函式

- [toShadcnCss](functions/toShadcnCss.md)

## 參考

### default

Renames and re-exports [shadcnCss](variables/shadcnCss.md)
