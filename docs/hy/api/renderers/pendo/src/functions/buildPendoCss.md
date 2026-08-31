[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Function: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pendo ուղեցուցի ոճի թերթիկ կառուցել:

## Parameters

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Returns

`string`

Կազմված CSS-ը:

## Examples

**Լռակյացի վերաբրենդավորման կառուցում (տիրույթային, !important, պուրգ)**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss();
```

**Canvas թեմա, անտիրույթային, պահել ամբողջ թոկեն հավաքածուն**

```ts
import { buildPendoCss } from "@pantoken/pendo";

const css = buildPendoCss({ theme: "canvas", scope: false, prune: false });
```
