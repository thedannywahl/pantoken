[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Funkcja: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametry

### name

`string`

### fallback?

`string` = `""`

## Zwraca

`string`

## Przykład

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
