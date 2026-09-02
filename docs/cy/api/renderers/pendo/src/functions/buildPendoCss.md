[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Swyddogaeth: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Build the Pendo guide stylesheet.

## Paramedrau

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Yn dychwelyd

`string`

The composed CSS.

## Enghreifftiau

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
