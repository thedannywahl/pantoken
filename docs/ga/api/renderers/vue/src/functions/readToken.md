[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / readToken

# Feidhm: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Read a resolved token value. Returns `fallback` on the server.

## Paraiméadair

### name

`string`

### fallback?

`string` = `""`

## Tuairisceáin

`string`

## Sampla

```ts
import { readToken } from "@pantoken/vue";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
