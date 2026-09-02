[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Fonction: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Paramètres

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Retourne

`string`

The Sass partial as a string.

## Exemple

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
