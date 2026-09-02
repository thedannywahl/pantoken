[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Fonksiyon: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametreler

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Döndürür

`string`

The Sass partial as a string.

## Örnek

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
