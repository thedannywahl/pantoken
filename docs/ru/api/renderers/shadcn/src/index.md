[pantoken](../../../index.md) / shadcn

# shadcn

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

`@pantoken/shadcn` — theme shadcn/ui with Instructure tokens.

[toShadcnCss](functions/toShadcnCss.md) emits a `:root` block pointing shadcn's CSS variables at `var(--instui-*)`.
Drop it in alongside `@pantoken/css` (which defines the custom properties) and shadcn components
adopt the Instructure look. Icons align for free — shadcn and Instructure both use Lucide.

## Интерфейсы

- [ToShadcnCssOptions](interfaces/ToShadcnCssOptions.md)

## Переменные

- [shadcnCss](variables/shadcnCss.md)
- [SHADCN\_TO\_INSTUI](variables/SHADCN_TO_INSTUI.md)

## Функции

- [toShadcnCss](functions/toShadcnCss.md)

## Ссылки

### default

Renames and re-exports [shadcnCss](variables/shadcnCss.md)
