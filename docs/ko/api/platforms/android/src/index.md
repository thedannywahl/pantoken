[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

`@pantoken/android` — emit Instructure design tokens as Android resource XML.

It flattens the IR to concrete, single-mode values (`@pantoken/core`'s `toStyleDictionary`), then
emits `res/values/colors.xml` (colour tokens) and `res/values/dimens.xml` (dimension tokens) via
`@pantoken/sd-config`. Style Dictionary applies the Android transforms (`#aarrggbb`, `dp`/`sp`).

## 인터페이스

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## 함수

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## 참조

### default

Renames and re-exports [generateAndroid](functions/generateAndroid.md)
