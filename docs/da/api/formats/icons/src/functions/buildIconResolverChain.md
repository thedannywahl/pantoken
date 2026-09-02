[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Funktion: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg den delte ikonopløserkæde: plugin `rehype` opløsere først, derefter eksplicit `resolve`, derefter det indbyggede pantoken-ikonsæt. Bruges af `@pantoken/rehype` og `@pantoken/markdown-it`, så opløsningsrækkefølgen forbliver identisk på tværs af renderere.

## Parametre

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Returnerer

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Eksempel

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
