[pantoken](../../../../index.md) / [renderers/astro/src](../index.md) / pantokenCss

# Mahi: pantokenCss()

> **pantokenCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Build the pantoken stylesheet for a theme (with optional plugin CSS). Exposed for direct use.

## Ngā Tawhā

### options?

[`InstUIOptions`](../interfaces/InstUIOptions.md) = `{}`

[InstUIOptions](../interfaces/InstUIOptions.md).

## Whakahokia

`string`

The CSS string.

## Tauira

```ts
import { pantokenCss } from "@pantoken/astro";

const css = pantokenCss({ theme: "canvas" });
```
