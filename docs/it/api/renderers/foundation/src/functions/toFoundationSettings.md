[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funzione: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametri

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Restituisce

`string`

The Sass partial as a string.

## Esempio

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
