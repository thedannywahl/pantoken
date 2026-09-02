[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Ֆունկցիա: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կազմել պատկերակ-resolver շղթան՝ plugin `rehype` resolver-ներ նախ, այնուհետ հստակ `resolvers`, ապա
ներկառուցված `@pantoken/icons` հավաքածուն։ Առաջին համապատասխանությունը հաղթում է։

## Պարամետրեր

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Վերադարձվող արժեք

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Օրինակ

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
