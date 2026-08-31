[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Function: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار تجاوز إعدادات Foundation Sass. حمّله قبل `@include foundation-everything`.

## Parameters

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Returns

`string`

جزء Sass كسلسلة.

## Example

**دع إعدادات المستهلك لا تزال تفوز**

```ts
toFoundationSettings({ useDefault: true });
```
