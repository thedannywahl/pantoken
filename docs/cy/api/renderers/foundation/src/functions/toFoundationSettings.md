[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Swyddogaeth: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Paramedrau

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Yn dychwelyd

`string`

The Sass partial as a string.

## Enghraifft

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
