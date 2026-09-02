[pantoken](../../../../index.md) / [renderers/pendo/src](../index.md) / buildPendoCss

# Ֆունկցիա: buildPendoCss()

> **buildPendoCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Pendo ուղեցուցի ոճի թերթիկ կառուցել:

## Պարամետրեր

### options?

[`BuildPendoCssOptions`](../interfaces/BuildPendoCssOptions.md) = `{}`

[BuildPendoCssOptions](../interfaces/BuildPendoCssOptions.md).

## Վերադարձվող արժեք

`string`

Կազմված CSS-ը:

## Օրինակներ

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
