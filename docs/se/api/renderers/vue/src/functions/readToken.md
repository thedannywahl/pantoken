[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / readToken

# Fušla: readToken()

> **readToken**(`name`, `fallback?`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Read a resolved token value. Returns `fallback` on the server.

## Parametera

### name

`string`

### fallback?

`string` = `""`

## Gullii / Gávdnat

`string`

## Exempel

```ts
import { readToken } from "@pantoken/vue";

const brand = readToken("--instui-color-background-brand", "#0374B5");
```
