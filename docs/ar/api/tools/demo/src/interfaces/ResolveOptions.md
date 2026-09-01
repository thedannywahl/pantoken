[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ResolveOptions

# واجهة: ResolveOptions

خيارات لحل مواصفة العرض التوضيحي. موفر `self` فقط هو الذي يستخدم حقول runner/demos/css.

## Extended by

- [`DemoMarkdownItOptions`](DemoMarkdownItOptions.md)

## الخصائص

### base?

> `optional` **base?**: `string`

مسار الأساس للموقع، على سبيل المثال `/pantoken/` (الافتراضي `/`).

***

### runnerPath?

> `optional` **runnerPath?**: `string`

مسار صفحة المشغل، نسبةً إلى `base` (الافتراضي `play/index.html`).

***

### demosPath?

> `optional` **demosPath?**: `string`

دليل مصدر العرض التوضيحي المستضاف ذاتياً، نسبةً إلى `base` (الافتراضي `demos/`).

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

عناوين URL لملفات الأنماط التي يدرجها المشغل (في واجهته وكل نتيجة مرسومة): أوراق المكونات
أوراق الرموز متعددة السمات، وأوراق الإضافات/الواجهات. يقوم المشغل بتطبيق السمات عن طريق تبديل
الخاصية `data-pantoken-theme`، لذا تغطي ورقة الرموز الواحدة كل سمة.
