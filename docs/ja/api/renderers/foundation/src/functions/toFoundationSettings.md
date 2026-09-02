[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# 関数: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## パラメーター

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## 戻り値

`string`

The Sass partial as a string.

## 例

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
