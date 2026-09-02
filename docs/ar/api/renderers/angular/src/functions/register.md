[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / register

# دالة: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

سجّل عناصر pantoken المخصصة. لا تقوم بأي فعل عندما لا يوجد DOM (SSR / أثناء البناء)، لذا فهذه الوحدة
آمنة للاستيراد في أي مكان.

## المعلمات

### target?

`ElementRegistry`

التسجيل الذي سيتم التعريف فيه (الافتراضي هو `globalThis.customElements`).

### options?

`RegisterContextOptions` & `object`

`prefix` يحدد بادئة الوسم، معاكِسًا لطبقة CSS: مرّر سلسلة غير فارغة مثل
  `x` لـ `&lt;x-icon&gt;`. تُطبَق بادئة دائمًا (يجب أن يحتوي اسم العنصر المخصص على شرطة)، لذا فإن
  تجاهل البادئة أو كونها فارغة أو غير موجودة أو nullish سيعود إلى الافتراضي `instui` (`&lt;instui-icon&gt;`). تُقَيِّد `only`
  التسجيل إلى مجموعة فرعية من أسماء الأساس `ELEMENTS` — اعتمادات العرض المتداخلة الخاصة بها تُستدعى تلقائيًا، لذلك يُعرّف `{ only: ["date-time-input"] }` أيضًا
  `date-input` و `calendar`. اترك `only` لتسجيل كل عنصر (الافتراضي).

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
