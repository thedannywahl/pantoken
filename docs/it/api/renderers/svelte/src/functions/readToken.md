[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Funzione: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametri

### name

`string`

### fallback?

`string` = `""`

## Restituisce

`string`

## Esempio

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
