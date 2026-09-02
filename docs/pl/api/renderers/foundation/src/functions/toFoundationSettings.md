[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Funkcja: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametry

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Zwraca

`string`

The Sass partial as a string.

## Przykład

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
