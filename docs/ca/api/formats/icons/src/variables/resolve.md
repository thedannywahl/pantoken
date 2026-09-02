[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / resolve

# Variable: resolve

> `const` **resolve**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un [IconResolver](../../../../packages/core/src/type-aliases/IconResolver.md) recolzat pel conjunt d'icones pantoken (per als escenaris de plugin/rehype).

## Exemple

```ts
import { resolve } from "@pantoken/icons";

resolve("arrow-left"); // { name, svg, viewBox, source } | undefined
```
