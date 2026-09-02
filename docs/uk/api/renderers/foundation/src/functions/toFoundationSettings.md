[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Функція: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Параметри

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Повертає

`string`

The Sass partial as a string.

## Приклад

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
