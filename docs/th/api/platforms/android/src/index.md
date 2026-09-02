[pantoken](../../../index.md) / android

# android

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

`@pantoken/android` — emit Instructure design tokens as Android resource XML.

It flattens the IR to concrete, single-mode values (`@pantoken/core`'s `toStyleDictionary`), then
emits `res/values/colors.xml` (colour tokens) and `res/values/dimens.xml` (dimension tokens) via
`@pantoken/sd-config`. Style Dictionary applies the Android transforms (`#aarrggbb`, `dp`/`sp`).

## อินเทอร์เฟซ

- [GenerateAndroidOptions](interfaces/GenerateAndroidOptions.md)

## ฟังก์ชัน

- [toAndroid](functions/toAndroid.md)
- [generateAndroid](functions/generateAndroid.md)

## การอ้างอิง

### default

Renames and re-exports [generateAndroid](functions/generateAndroid.md)
