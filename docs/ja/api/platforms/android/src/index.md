[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

`@pantoken/android` — emit Instructure design tokens as Android resource XML.

It flattens the IR to concrete, single-mode values (`@pantoken/core`'s `toStyleDictionary`), then
emits `res/values/colors.xml` (colour tokens) and `res/values/dimens.xml` (dimension tokens) via
`@pantoken/sd-config`. Style Dictionary applies the Android transforms (`#aarrggbb`, `dp`/`sp`).

## インターフェース

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## 関数

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## 参照

### default

Renames and re-exports [generateAndroid](functions/generateAndroid.md)
