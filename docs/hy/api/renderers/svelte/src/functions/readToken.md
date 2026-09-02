[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Ֆունկցիա: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կարդալ լուծված token արժեքը: Վերադարձնում է `fallback`-ը server-ի վրա:

## Պարամետրեր

### name

`string`

### fallback?

`string` = `""`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
