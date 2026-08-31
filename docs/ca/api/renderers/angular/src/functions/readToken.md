[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Function: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Llegir un valor de token resolt. Retorna `fallback` al servidor.

## Parameters

### name

`string`

### fallback?

`string` = `""`

## Returns

`string`

## Example

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
