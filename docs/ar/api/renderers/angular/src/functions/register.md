[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / register

# دالة: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

سجّل عناصر pantoken المخصصة. لا يفعل شيئًا عندما لا يوجد DOM (SSR / البناء)، لذلك هذا الموديول
آمن للاستيراد في أي مكان.

## المعلمات

### target?

`ElementRegistry`

السجل الذي سيتم التعريف فيه (الافتراضي هو `globalThis.customElements`).

### options?

`RegisterContextOptions` & `object`

`prefix` يحدد بادئة الوسم، معاكسةً لطبقة CSS: مرّر سلسلة غير فارغة مثل
  `x` لـ `&lt;x-icon&gt;`. تُطبَّق بادئة دائمًا (يجب أن يحتوي اسم العنصر المخصص على واصلة)، لذا فإن
  البادئة المحذوفة أو الفارغة أو التي تساوي null تعود إلى الافتراضي `instui` (`&lt;instui-icon&gt;`). يحدُّ `only` من
  التسجيل إلى مجموعة فرعية من أسماء الأساس `ELEMENTS` — تُستدعى تبعيات العرض المتداخلة الخاصة بها تلقائيًا، لذا فإن `{ only: ["date-time-input"] }` يُعرّف أيضًا `date-input` و `calendar`. احذف
  `only` لتسجيل كل عنصر (الوضع الافتراضي).

## القيم المرجعة

`void`

## مثال

```ts
import { register } from "@pantoken/web-components";
import "@pantoken/css"; // defines the --instui-* custom properties the elements read

register(); // <instui-button>, <instui-icon>, …
register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
register(customElements, { only: ["button", "alert"] }); // just those two
register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
```
