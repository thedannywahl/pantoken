[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Fonksyon: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Paramèt

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Retounen

`string`

The Sass partial as a string.

## Egzanp

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
