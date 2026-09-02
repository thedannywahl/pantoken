[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Συνάρτηση: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
the built-in `@pantoken/icons` set. The first match wins.

## Παράμετροι

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Επιστρέφει

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Παράδειγμα

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
