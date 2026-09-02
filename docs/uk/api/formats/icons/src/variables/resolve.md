[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / resolve

# Змінна: resolve

> `const` **resolve**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

An [IconResolver](../../../../packages/core/src/type-aliases/IconResolver.md) backed by the pantoken icon set (for the plugin/rehype stages).

## Приклад

```ts
import { resolve } from "@pantoken/icons";

resolve("arrow-left"); // { name, svg, viewBox, source } | undefined
```
