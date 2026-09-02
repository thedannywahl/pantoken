[pantoken](../../../../index.md) / [renderers/react/src](../index.md) / readToken

# Функция: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Read a resolved token value from the document. Returns `fallback` on the server.

## Параметры

### name

`string`

### fallback?

`string` = `""`

## Возвращаемое значение

`string`

## Пример

```tsx
import { readToken } from "@pantoken/react";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
