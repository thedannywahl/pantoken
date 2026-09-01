[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / registerLocalized

# دالة: registerLocalized()

> **registerLocalized**(`bundle`, `target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

سجّل عناصر مخصّصة `@pantoken/web-components` مع سلاسل نصية مخصّصة للغة والاتجاه.

يقبل [LocaleBundle](#) مُحلَّلًا بالكامل *أو* سلسلة علامة BCP47 خام. عند تمرير سلسلة
تستخرج [makeStrings](#) أسماء أيام الأسبوع عبر `Intl.DateTimeFormat` وتعود كل السلاسل الأخرى
إلى الإنجليزية؛ مرّر حزمة للحصول على ترجمات كاملة.

## المعلمات

### bundle

`string` \| [`LocaleBundle`](#)

كائن [LocaleBundle](#)، أو علامة BCP47 (`"hu"`, `"ar"`, …).

### target?

`ElementRegistry`

سجل التعريف الذي سيتم التعريف فيه (الافتراضي هو `globalThis.customElements`).

### options?

يُمرَّر إلى `register()` (مثلاً `prefix`, `only`).

#### prefix?

`string` \| `null`

#### only?

للقراءة فقط `string`[]

## القيم المرجعة

`void`

## مثال

```ts
import { registerLocalized, hu } from "@pantoken/i18n";

registerLocalized(hu);
registerLocalized("ar"); // direction inferred from CANVAS_LOCALES
registerLocalized("x-custom", customElements, { prefix: "x" });
```
