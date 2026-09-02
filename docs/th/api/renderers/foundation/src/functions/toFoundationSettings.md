[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# ฟังก์ชัน: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## พารามิเตอร์

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## คืนค่า

`string`

The Sass partial as a string.

## ตัวอย่าง

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
