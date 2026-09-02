[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Функция: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Альфа</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Параметры

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Возвращаемое значение

`string`

The CSS string.

## Пример

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
