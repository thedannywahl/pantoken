[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# 函数: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## 参数

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## 返回值

`string`

The Sass partial as a string.

## 示例

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
