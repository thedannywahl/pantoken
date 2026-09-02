[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Functie: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Build the Pendo guide stylesheet.

## Parameters

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Retourneert

`string`

The composed CSS.

## Voorbeelden

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
