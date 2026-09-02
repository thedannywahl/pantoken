[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Função: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Parâmetros

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Retorna

`string`

The CSS string.

## Exemplo

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
