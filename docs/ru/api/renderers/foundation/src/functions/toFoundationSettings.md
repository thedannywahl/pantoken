[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Функция: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Emit the Foundation Sass settings override. Load it before `@include foundation-everything`.

## Параметры

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Возвращаемое значение

`string`

The Sass partial as a string.

## Пример

**Let consumer settings still win**

```ts
toFoundationSettings({ useDefault: true });
```
