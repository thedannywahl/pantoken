[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Function: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Կառուցել pantoken ոճային թերթը թեմայի համար (ընտրովի խրտնակ CSS ունեցող): Բացահայտ ուղղակի օգտագործման համար:

## Parameters

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Returns

`string`

CSS տողը։

## Example

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
