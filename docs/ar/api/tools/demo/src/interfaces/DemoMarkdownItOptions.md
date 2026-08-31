[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Interface: DemoMarkdownItOptions

خيارات [demoMarkdownIt](../functions/demoMarkdownIt.md): حقول [resolveDemo](../functions/resolveDemo.md) بالإضافة إلى دمج مثال حي اختياري.

## Extends

- [`ResolveOptions`](ResolveOptions.md)

## Properties

### base?

> `optional` **base?**: `string`

مسار قاعدة الموقع، على سبيل المثال `/pantoken/` (الافتراضي `/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

---

### runnerPath?

> `optional` **runnerPath?**: `string`

مسار صفحة العامل، نسبي إلى `base` (الافتراضي `play/index.html`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

---

### demosPath?

> `optional` **demosPath?**: `string`

دليل مصدر العرض التوضيحي المستضاف ذاتياً، نسبي إلى `base` (الافتراضي `demos/`).

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

---

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

عناوين URL لأوراق الأنماط التي يحقنها العامل (في الشريط العلوي الخاص به وكل نتيجة معروضة): أوراق المكون،
ورقة الرموز متعددة المواضيع، وأوراق المكون الإضافي/السطح. يقوم العامل بالتبديل بين المواضيع عن طريق تبديل
سمة `data-pantoken-theme`، بحيث تغطي ورقة رموز واحدة كل موضوع.

#### Inherited from

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

---

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

عند التعيين، يقوم بإضافة معاينة مباشرة بعد كل سياج `html` على صفحات مطابقة — نفس الترميز،
معروض مباشرة، تحت مصدره. يتم تخطي الأمثلة المتراكبة (`&lt;dialog&gt;`، `[popover]`): فهي
مخفية حتى يتم فتحها، لذا يقود iframe `## Demo` معاينتهم بدلاً من ذلك.
