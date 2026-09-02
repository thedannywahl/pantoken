[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# 函式: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta（測試）</span>

Build the shared icon-resolver chain: plugin `rehype` resolvers first, then an explicit
`resolve`, then the built-in pantoken icon set. Used by `@pantoken/rehype` and
`@pantoken/markdown-it` so the resolution order stays identical across renderers.

## 參數

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## 回傳

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## 範例

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
