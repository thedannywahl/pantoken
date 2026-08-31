[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ResolveOptions

# Interface: ResolveOptions

خيارات لحل مواصفات العرض التوضيحي. يستخدم موفر `self` فقط حقول العامل/العروض التوضيحية/CSS.

## Extended by

- [`DemoMarkdownItOptions`](DemoMarkdownItOptions.md)

## Properties

### base?

> `optional` **base?**: `string`

مسار قاعدة الموقع، على سبيل المثال `/pantoken/` (الافتراضي `/`).

---

### runnerPath?

> `optional` **runnerPath?**: `string`

مسار صفحة العامل، نسبي إلى `base` (الافتراضي `play/index.html`).

---

### demosPath?

> `optional` **demosPath?**: `string`

دليل مصدر العرض التوضيحي المستضاف ذاتياً، نسبي إلى `base` (الافتراضي `demos/`).

---

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

عناوين URL لأوراق الأنماط التي يحقنها العامل (في الشريط العلوي الخاص به وكل نتيجة معروضة): أوراق المكون،
ورقة الرموز متعددة المواضيع، وأوراق المكون الإضافي/السطح. يقوم العامل بالتبديل بين المواضيع عن طريق تبديل
سمة `data-pantoken-theme`، بحيث تغطي ورقة رموز واحدة كل موضوع.
