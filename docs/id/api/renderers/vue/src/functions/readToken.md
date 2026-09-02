[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / readToken

# Fungsi: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Read a resolved token value. Returns `fallback` on the server.

## Parameter

### name

`string`

### fallback?

`string` = `""`

## Mengembalikan

`string`

## Contoh

```ts
import { readToken } from "@pantoken/vue";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
