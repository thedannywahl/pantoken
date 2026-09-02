[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Functie: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parameters

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Retourneert

`string`

The Sass partial as a string.

## Voorbeeld

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
