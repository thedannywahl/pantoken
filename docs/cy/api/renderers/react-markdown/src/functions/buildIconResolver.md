[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Swyddogaeth: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
the built-in `@pantoken/icons` set. The first match wins.

## Paramedrau

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Yn dychwelyd

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Enghraifft

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
