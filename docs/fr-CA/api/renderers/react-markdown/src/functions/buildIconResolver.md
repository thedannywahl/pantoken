[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Fonction: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Build the icon-resolver chain: plugin `rehype` resolvers first, then explicit `resolvers`, then
the built-in `@pantoken/icons` set. The first match wins.

## Paramètres

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Retourne

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Exemple

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
