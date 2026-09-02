[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Feidhm: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Paraiméadair

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Tuairisceáin

`string`

The Sass partial as a string.

## Sampla

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
