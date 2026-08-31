[pantoken](../../../index.md) / hugo

# hugo

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/hugo` — udled Instructure token-stylesheet til et Hugo-websted.

Hugo har ingen standard tema-variabel kontrakt, så dette leverer tokens som drop-in aktiver under `assets/` (hvor Hugo Pipes / Dart Sass henter dem): en Sass-partial og en almindelig CSS-fil (fra `@pantoken/scss` og `@pantoken/css`), plus en InstUI-lignende prosa-stylesheet (fra `@pantoken/components`) der styler indhold i en `.pantoken-prose` region.

## Interfaces

- [HugoFile](interfaces/HugoFile.md)

## Functions

- [toHugoAssets](functions/toHugoAssets.md)
