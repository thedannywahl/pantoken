[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Функція: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Параметри

### name

`string`

### fallback?

`string` = `""`

## Повертає

`string`

## Приклад

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
