[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Mahi: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Ngā Tawhā

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Whakahokia

`string`

The Sass partial as a string.

## Tauira

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
