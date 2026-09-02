[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Fonksyon: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the Pendo guide stylesheet.

## Paramèt

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Retounen

`string`

The composed CSS.

## Egzanp

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
