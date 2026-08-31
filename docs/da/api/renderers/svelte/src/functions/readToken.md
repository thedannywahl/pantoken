[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / readToken

# Function: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Læs en opløst tokenværdi. Returnerer `fallback` på serveren.

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Returns

`string`

## Example

```ts
import { readToken } from "@pantoken/svelte";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
