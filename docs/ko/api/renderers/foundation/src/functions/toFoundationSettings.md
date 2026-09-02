[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# 함수: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## 매개변수

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## 반환값

`string`

The Sass partial as a string.

## 예제

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
