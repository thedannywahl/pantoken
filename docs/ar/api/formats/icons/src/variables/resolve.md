[pantoken](../../../../index.md) / [formats/icons/src](../index.md) / resolve

# متغير: resolve

> `const` **resolve**: [`IconResolver`](../../../../packages/core/src/type-aliases/IconResolver.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مُحلل [IconResolver](../../../../packages/core/src/type-aliases/IconResolver.md) مدعوم بواسطة مجموعة أيقونات pantoken (لمراحل plugin/rehype).

## مثال

```ts
import { resolve } from "@pantoken/icons";

resolve("arrow-left"); // { name, svg, viewBox, source } | undefined
```
