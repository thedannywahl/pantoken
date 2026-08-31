[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Function: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg ikon-opløserkæden: plugin `rehype` opløsere først, derefter eksplicit `resolvers`, derefter
det indbyggede `@pantoken/icons` sæt. Det første match vinder.

## Parameters

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Returns

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Example

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
