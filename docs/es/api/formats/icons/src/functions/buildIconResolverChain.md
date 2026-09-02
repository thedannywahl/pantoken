[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Función: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build the shared icon-resolver chain: plugin `rehype` resolvers first, then an explicit
`resolve`, then the built-in pantoken icon set. Used by `@pantoken/rehype` and
`@pantoken/markdown-it` so the resolution order stays identical across renderers.

## Parámetros

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Devuelve

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Ejemplo

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
