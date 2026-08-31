[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / SCAFFOLD\_PLATFORMS

# Variable: SCAFFOLD\_PLATFORMS

> `const` **SCAFFOLD\_PLATFORMS**: readonly [`ScaffoldPlatform`](../type-aliases/ScaffoldPlatform.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

كل مفتاح منصة قابل للحفر (مكتشف من المسبقات المتاحة، بالإضافة إلى أي منصات قديمة تحتوي على القالب فقط غير مدعومة بـ preset حتى الآن).

## Example

**قائمة المنصات المتاحة**

```ts
import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
```
