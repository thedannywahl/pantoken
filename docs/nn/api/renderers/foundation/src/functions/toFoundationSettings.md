[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funksjon: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametrar

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Returnerer

`string`

The Sass partial as a string.

## Døme

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
