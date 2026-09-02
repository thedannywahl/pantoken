[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

`@pantoken/android` — udsend Instructure design-tokens som Android-ressource XML.

Det udfladder IR'en til konkrete, enkelt-tilstands værdier (`@pantoken/core`'s `toStyleDictionary`), derefter
udsender `res/values/colors.xml` (farve-tokens) og `res/values/dimens.xml` (dimensions-tokens) via
`@pantoken/sd-config`. Style Dictionary anvender Android-transformerne (`#aarrggbb`, `dp`/`sp`).

## Interfaces

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## Funktioner

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## Referencer

### default

Omdøber og re-eksporterer [generateAndroid](functions/generateAndroid.md)
