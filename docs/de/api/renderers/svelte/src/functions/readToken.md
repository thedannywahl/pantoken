[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Funktion: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Read a resolved token value. Returns `fallback` on the server.

## Parameter

### name

`string`

### fallback?

`string` = `""`

## Rückgabe

`string`

## Beispiel

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
