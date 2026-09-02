[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Ֆունկցիա: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Արձակել Foundation Sass կարգավորումներ վերազատ: Բեռնել այն `@include foundation-everything`-ից առաջ:

## Պարամետրեր

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Վերադարձվող արժեք

`string`

Sass մասնակի որպես տող:

## Օրինակ

**Թույլ տալ սպառողի կարգավորումներ դեռ հաղթել**

```ts
toFoundationSettings({ useDefault: true });
```
