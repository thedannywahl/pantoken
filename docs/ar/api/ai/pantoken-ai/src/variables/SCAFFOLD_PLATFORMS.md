[pantoken](../../../../index.md) / [ai/pantoken-ai/src](../index.md) / SCAFFOLD\_PLATFORMS

# متغير: SCAFFOLD\_PLATFORMS

> `const` **SCAFFOLD\_PLATFORMS**: readonly [`ScaffoldPlatform`](../type-aliases/ScaffoldPlatform.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

كل مفتاح منصة قابل للتجهيز (تم اكتشافه من الإعدادات المسبقة المتاحة، بالإضافة إلى أي منصات قديمة
مخصصة للقوالب فقط لم تُدعَم بعد بواسطة إعداد مسبق).

## مثال

**قائمة المنصات المتاحة**

```ts
import { SCAFFOLD_PLATFORMS } from "@pantoken/scaffold";

console.log(SCAFFOLD_PLATFORMS); // → ["components", "react", "vue", "web-components"]
```
