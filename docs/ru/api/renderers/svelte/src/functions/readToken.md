[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Функция: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Read a resolved token value. Returns `fallback` on the server.

## Параметры

### name

`string`

### fallback?

`string` = `""`

## Возвращаемое значение

`string`

## Пример

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
