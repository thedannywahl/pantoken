[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Función: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Read a resolved token value. Returns `fallback` on the server.

## Parámetros

### name

`string`

### fallback?

`string` = `""`

## Devuelve

`string`

## Ejemplo

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
