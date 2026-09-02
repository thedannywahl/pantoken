[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / buildIconResolver

# Funció: buildIconResolver()

> **buildIconResolver**(`options?`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir la cadena de resolució d'icones: resolvedors del plugin `rehype` primer, després els de `resolvers` explícit, després
el conjunt `@pantoken/icons` integrat. El primer coincidència guanya.

## Paràmetres

### options?

[`InstuiMarkdownRenderOptions`](../interfaces/InstuiMarkdownRenderOptions.md)

## Retorna

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Exemple

```ts
import { buildIconResolver } from "@pantoken/react-markdown";

const resolve = buildIconResolver();
resolve("arrow-left"); // an IconEntry from the built-in set, or undefined
```
