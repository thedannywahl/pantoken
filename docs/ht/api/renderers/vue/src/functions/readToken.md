[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / readToken

# Fonksyon: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Read a resolved token value. Returns `fallback` on the server.

## Paramèt

### name

`string`

### fallback?

`string` = `""`

## Retounen

`string`

## Egzanp

```ts
import { readToken } from "@pantoken/vue";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
