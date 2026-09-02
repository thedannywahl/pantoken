[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Funksjon: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametere

### name

`string`

### fallback?

`string` = `""`

## Returnerer

`string`

## Eksempel

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
