[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Συνάρτηση: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Build the shared icon-resolver chain: plugin `rehype` resolvers first, then an explicit
`resolve`, then the built-in pantoken icon set. Used by `@pantoken/rehype` and
`@pantoken/markdown-it` so the resolution order stays identical across renderers.

## Παράμετροι

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Επιστρέφει

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Παράδειγμα

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
