[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Function: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

بناء ورقة أنماط pantoken لموضوع (مع CSS مكون اختياري). معروض للاستخدام المباشر.

## Parameters

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returns

`string`

سلسلة CSS.

## Example

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
