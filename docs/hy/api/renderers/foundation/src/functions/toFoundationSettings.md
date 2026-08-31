[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Function: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Արձակել Foundation Sass կարգավորումներ վերազատ: Բեռնել այն `@include foundation-everything`-ից առաջ:

## Parameters

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Returns

`string`

Sass մասնակի որպես տող:

## Example

**Թույլ տալ սպառողի կարգավորումներ դեռ հաղթել**

```ts
toFoundationSettings({ useDefault: true });
```
