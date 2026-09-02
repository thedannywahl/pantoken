[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# دالة: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

أصدر تجاوز إعدادات Foundation Sass. حمِّله قبل `@include foundation-everything`.

## المعلمات

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## القيم المرجعة

`string`

الجزء الجزئي من Sass كسلسلة.

## مثال

**دع إعدادات المستهلك تظل هي الفائزة**

```ts
toFoundationSettings({ useDefault: true });
```
