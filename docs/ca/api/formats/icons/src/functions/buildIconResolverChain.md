[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / buildIconResolverChain

# Funció: buildIconResolverChain()

> **buildIconResolverChain**(`options`): [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construir la cadena compartida de resolució d'icones: els resolvedors del plugin `rehype` primer, després un `resolve` explícit, després el conjunt d'icones pantoken integrat. Utilitzat per `@pantoken/rehype` i `@pantoken/markdown-it` perquè l'ordre de resolució es mantingui idèntic entre els processadors.

## Paràmetres

### options

[`IconResolverChainOptions`](../interfaces/IconResolverChainOptions.md)

## Retorna

[`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

## Exemple

```ts
import { buildIconResolverChain } from "@pantoken/icons";

const resolveIcon = buildIconResolverChain({ plugins: [myBrandIconsPlugin] });
resolveIcon("arrow-left"); // { name, svg, viewBox, source } | undefined
```
