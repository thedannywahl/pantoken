[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# تابع: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Build the Pendo guide stylesheet.

## پارامترها

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## مقدار بازگشتی

`string`

The composed CSS.

## نمونه‌ها

**Default rebrand build (scoped, !important, pruned)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**Canvas theme, unscoped, keep the full token set**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```
