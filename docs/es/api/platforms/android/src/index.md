[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/android` — emit Instructure design tokens as Android resource XML.

It flattens the IR to concrete, single-mode values (`@pantoken/core`'s `toStyleDictionary`), then
emits `res/values/colors.xml` (colour tokens) and `res/values/dimens.xml` (dimension tokens) via
`@pantoken/sd-config`. Style Dictionary applies the Android transforms (`#aarrggbb`, `dp`/`sp`).

## Interfaces

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## Funciones

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## Referencias

### default

Renames and re-exports [generateAndroid](functions/generateAndroid.md)
