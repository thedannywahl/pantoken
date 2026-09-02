[pantoken](../../../index.md) / next

# next

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

`@pantoken/next` — a Next.js config adapter.

Instructure UI ships ESM packages that Next must transpile (`transpilePackages`), the #1 papercut
when running InstUI on Next. `withPantoken` merges the InstUI packages into that list. Wrap your
`next.config`, then import `@pantoken/css` in your root layout for the tokens.

## Grensesnitt

- [NextConfigLike](interfaces/NextConfigLike.md)
- [WithPantokenOptions](interfaces/WithPantokenOptions.md)

## Variabler

- [INSTUI\_TRANSPILE\_PACKAGES](variables/INSTUI_TRANSPILE_PACKAGES.md)

## Funksjoner

- [withPantoken](functions/withPantoken.md)

## Referanser

### default

Renames and re-exports [withPantoken](functions/withPantoken.md)
