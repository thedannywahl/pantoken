[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Functie: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Read a resolved token value. Returns `fallback` on the server.

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Retourneert

`string`

## Voorbeeld

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
