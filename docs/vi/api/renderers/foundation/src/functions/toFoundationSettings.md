[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Hàm: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Tham số

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Trả về

`string`

The Sass partial as a string.

## Ví dụ

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
