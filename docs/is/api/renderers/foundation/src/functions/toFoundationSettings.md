[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Fall: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Færibreytur

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Skilar

`string`

The Sass partial as a string.

## Dæmi

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
