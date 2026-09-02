[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funkcija: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametri

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Vrne

`string`

The Sass partial as a string.

## Primer

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
