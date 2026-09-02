[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# تابع: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## پارامترها

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## مقدار بازگشتی

`string`

The Sass partial as a string.

## نمونه

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
