[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Функція: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Read a resolved token value. Returns `fallback` on the server.

## Параметри

### name

`string`

### fallback?

`string` = `""`

## Повертає

`string`

## Приклад

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
