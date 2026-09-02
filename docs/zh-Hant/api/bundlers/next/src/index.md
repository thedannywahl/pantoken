[pantoken](../../../index.md) / next

# next

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

`@pantoken/next` — a Next.js config adapter.

Instructure UI ships ESM packages that Next must transpile (`transpilePackages`), the #1 papercut
when running InstUI on Next. `withPantoken` merges the InstUI packages into that list. Wrap your
`next.config`, then import `@pantoken/css` in your root layout for the tokens.

## 介面

- [NextConfigLike](interfaces/NextConfigLike.md)
- [WithPantokenOptions](interfaces/WithPantokenOptions.md)

## 變數

- [INSTUI\_TRANSPILE\_PACKAGES](variables/INSTUI_TRANSPILE_PACKAGES.md)

## 函式

- [withPantoken](functions/withPantoken.md)

## 參考

### default

Renames and re-exports [withPantoken](functions/withPantoken.md)
