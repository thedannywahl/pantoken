[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / readToken

# Swyddogaeth: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Read a resolved token value. Returns `fallback` on the server.

## Paramedrau

### name

`string`

### fallback?

`string` = `""`

## Yn dychwelyd

`string`

## Enghraifft

```ts
import { readToken } from "@pantoken/angular";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
