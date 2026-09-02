[pantoken](../../../index.md) / mintlify

# mintlify

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/mintlify` — طبق سمة على موقع توثيق Mintlify باستخدام توكنات Instructure.

[toMintlifyConfig](functions/toMintlifyConfig.md) يحوّل أي IR إلى مفاتيح `colors` + `background` في `docs.json` الخاص بـ Mintlify؛ [docsJson](variables/docsJson.md) هو مقتطف `rebrand` الجاهز. ادمجه في `docs.json`.

## مثال

```jsonc
// docs.json
{
  "name": "My docs",
  "theme": "mint",
  "colors": { "primary": "#1D354F", "light": "#EEF4FD", "dark": "#1D354F" },
  "background": { "color": { "light": "#F2F4F5", "dark": "#10141A" } }
}
```

## واجهات

- [MintlifyColors](interfaces/MintlifyColors.md)
- [MintlifyBackground](interfaces/MintlifyBackground.md)
- [MintlifyTheme](interfaces/MintlifyTheme.md)

## المتغيرات

- [docsJson](variables/docsJson.md)

## الدوال

- [toMintlifyConfig](functions/toMintlifyConfig.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [docsJson](variables/docsJson.md)
