[pantoken](../../../index.md) / hugo

# hugo

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

`@pantoken/hugo` — emit the Instructure token stylesheet for a Hugo site.

Hugo has no standard theming-variable contract, so this delivers the tokens as drop-in assets
under `assets/` (where Hugo Pipes / Dart Sass pick them up): a Sass partial and a plain CSS file
(from `@pantoken/scss` and `@pantoken/css`), plus an InstUI-look prose stylesheet (from
`@pantoken/components`) that styles content in a `.pantoken-prose` region.

## Интерфейсы

- [HugoFile](interfaces/HugoFile.md)

## Функции

- [toHugoAssets](functions/toHugoAssets.md)
