[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Función: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parámetros

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Devuelve

`string`

The Sass partial as a string.

## Ejemplo

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
