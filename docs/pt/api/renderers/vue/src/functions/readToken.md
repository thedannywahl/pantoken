[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / readToken

# Função: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Read a resolved token value. Returns `fallback` on the server.

## Parâmetros

### name

`string`

### fallback?

`string` = `""`

## Retorna

`string`

## Exemplo

```ts
import { readToken } from "@pantoken/vue";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
