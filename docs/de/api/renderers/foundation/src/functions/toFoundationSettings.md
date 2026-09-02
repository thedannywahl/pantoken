[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funktion: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parameter

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Rückgabe

`string`

The Sass partial as a string.

## Beispiel

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
