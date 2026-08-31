[pantoken](../../../../index.md) / [renderers/foundation/src](../index.md) / toFoundationCss

# Function: toFoundationCss()

> **toFoundationCss**(`options?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

إصدار طبقة تراكب CSS رقيقة في وقت التشغيل: موضوع فئات Foundation المترجمة مع `var(--instui-*)`.

## Parameters

### options?

[`ToFoundationCssOptions`](../interfaces/ToFoundationCssOptions.md) = `{}`

[ToFoundationCssOptions](../interfaces/ToFoundationCssOptions.md).

## Returns

`string`

سلسلة طبقة التراكب CSS.

## Example

**نطاق طبقة التراكب إلى حاوية**

```ts
toFoundationCss({ scope: ".instui" });
```
