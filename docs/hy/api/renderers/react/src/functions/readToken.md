[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Ֆունկցիա: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Կարդալ փաստաթղթից լուծված թոկեն արժեքը: Վերադարձ `fallback` սերվերում:

## Պարամետրեր

### name

`string`

### fallback?

`string` = `""`

## Վերադարձվող արժեք

`string`

## Օրինակ

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
