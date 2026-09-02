[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / resolve

# Değişken: resolve

> `const` **resolve**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

An [IconResolver](../../../../packages/core/src/type-aliases/IconResolver.md) backed by the pantoken icon set (for the plugin/rehype stages).

## Örnek

```ts
import { resolve } from "@pantoken/icons";

resolve("arrow-left"); // { name, svg, viewBox, source } | undefined
```
