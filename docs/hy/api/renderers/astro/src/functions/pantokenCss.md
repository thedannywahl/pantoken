[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Ֆունկցիա: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

Կառուցել pantoken ոճային թերթը թեմայի համար (ընտրովի խրտնակ CSS ունեցող): Բացահայտ ուղղակի օգտագործման համար:

## Պարամետրեր

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Վերադարձվող արժեք

`string`

CSS տողը։

## Օրինակ

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
