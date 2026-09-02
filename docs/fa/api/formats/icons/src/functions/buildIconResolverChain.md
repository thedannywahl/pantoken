[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# تابع: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Build the shared icon-resolver chain: plugin `rehype` resolvers first, then an explicit
`resolve`, then the built-in pantoken icon set. Used by `@pantoken/rehype` and
`@pantoken/markdown-it` so the resolution order stays identical across renderers.

## پارامترها

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## مقدار بازگشتی

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## نمونه

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
