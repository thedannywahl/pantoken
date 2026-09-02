[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Fušla: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Parametera

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Gullii / Gávdnat

`string`

The Sass partial as a string.

## Exempel

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
