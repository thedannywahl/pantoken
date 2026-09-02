[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Функция: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Build the shared icon-resolver chain: plugin `rehype` resolvers first, then an explicit
`resolve`, then the built-in pantoken icon set. Used by `@pantoken/rehype` and
`@pantoken/markdown-it` so the resolution order stays identical across renderers.

## Параметры

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Возвращаемое значение

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Пример

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
