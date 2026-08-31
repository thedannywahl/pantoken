[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / register

# Function: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

سجّل عناصر pantoken المخصصة. عدم عملية عندما لا توجد DOM (SSR / build)، لذلك هذه الوحدة آمنة للاستيراد في أي مكان.

## Parameters

### target?

[`ElementRegistry`](../interfaces/ElementRegistry.md) \| `undefined`

السجل المراد التعريف فيه (الافتراضي هو `globalThis.customElements`).

### options?

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md) & `object` = `{}`

`prefix` يعيّن بادئة الوسم، ممسحاً طبقة CSS: مرّر سلسلة غير فارغة مثل `x` لـ `&lt;x-icon&gt;`. يتم تطبيق بادئة دائماً (يجب أن يحتوي اسم العنصر المخصص على واصلة)، لذلك بادئة مُحذوفة أو فارغة أو فارغة تعود إلى الافتراضي `instui` (`&lt;instui-icon&gt;`). `only` يقيّد التسجيل إلى مجموعة فرعية من أسماء القاعدة `ELEMENTS` — يتم سحب تبعيات العرض المتداخلة الخاصة بها تلقائياً، لذلك `{ only: ["date-time-input"] }` أيضاً يعرّف `date-input` و `calendar`. تجاهل `only` لتسجيل كل عنصر (الافتراضي).

## Returns

`void`

## Example

```ts
import { register } from "@pantoken/web-components";
import "@pantoken/css"; // defines the --instui-* custom properties the elements read

register(); // <instui-button>, <instui-icon>, …
register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
register(customElements, { only: ["button", "alert"] }); // just those two
register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
```
