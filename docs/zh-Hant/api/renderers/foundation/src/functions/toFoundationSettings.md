[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# 函式: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## 參數

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## 回傳

`string`

The Sass partial as a string.

## 範例

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
