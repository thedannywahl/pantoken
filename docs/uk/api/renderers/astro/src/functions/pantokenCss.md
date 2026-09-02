[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Функція: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Параметри

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Повертає

`string`

The CSS string.

## Приклад

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
