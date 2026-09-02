[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Ֆունկցիա: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կառուցել կիսված պատկերակ-լուծիչ շղթա. խրթի `rehype` լուծիչներ առաջինը, ապա հստակ
`resolve`, ապա ներկառուցված pantoken պատկերակային հավաքածուն: Օգտագործվում է `@pantoken/rehype` և
`@pantoken/markdown-it` կողմից, որպեսզի լուծման կարգը մնա միատեսակ բոլոր վերականգնողների միջև:

## Պարամետրեր

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Վերադարձվող արժեք

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Օրինակ

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
