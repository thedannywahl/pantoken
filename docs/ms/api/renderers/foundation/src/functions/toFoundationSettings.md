[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Fungsi: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parameter

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Mengembalikan

`string`

The Sass partial as a string.

## Contoh

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
