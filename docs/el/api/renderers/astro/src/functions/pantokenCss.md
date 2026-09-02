[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Συνάρτηση: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Άλφα</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Παράμετροι

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Επιστρέφει

`string`

The CSS string.

## Παράδειγμα

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
