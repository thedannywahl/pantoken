[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationSettings

# Function: toFoundationSettings()

> **toFoundationSettings**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Udsend Foundation Sass-indstillingers tilsidesættelse. Indlæs det før `@include foundation-everything`.

## Parameters

### options?

[`ToFoundationSettingsOptions`](../interfaces/ToFoundationSettingsOptions.md) = `{}`

[ToFoundationSettingsOptions](../interfaces/ToFoundationSettingsOptions.md).

## Returns

`string`

Sass-delen som en streng.

## Example

**Lad forbrugenes indstillinger stadig vinde**

```ts
toFoundationSettings({ useDefault: true });
```
