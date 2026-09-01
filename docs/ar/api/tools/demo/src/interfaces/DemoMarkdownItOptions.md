[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# واجهة: DemoMarkdownItOptions

خيارات لـ [demoMarkdownIt](../functions/demoMarkdownIt.md): حقول [resolveDemo](../functions/resolveDemo.md) بالإضافة إلى إمكانية ربط أمثلة حية اختيارياً.

## يمتد

- [`ResolveOptions`](ResolveOptions.md)

## الخصائص

### base?

> `optional` **base?**: `string`

مسار الأساس للموقع، مثلاً `/pantoken/` (الافتراضي `/`).

#### موروث من

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

***

### runnerPath?

> `optional` **runnerPath?**: `string`

مسار صفحة المشغل، نسبةً إلى `base` (الافتراضي `play/index.html`).

#### موروث من

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

***

### demosPath?

> `optional` **demosPath?**: `string`

دليل مصدر العرض التوضيحي المستضاف ذاتياً، نسبةً إلى `base` (الافتراضي `demos/`).

#### موروث من

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

عناوين URL لملفات الأنماط التي يدرجها المشغل (في واجهته وكل نتيجة مرسومة): ملفات أنماط المكوّن، ورقة رموز متعددة السمات، وملفات أنماط الإضافات/الأسطح. يقوم المشغل بتبديل السمة `data-pantoken-theme` لتطبيق السمات، لذا تغطي ورقة الرموز الواحدة كل السمات.

#### موروث من

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

***

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

عند التعيين، يضيف معاينة حية بعد كل سياج `html` في الصفحات المطابقة — نفس الوسم معروضًا حيًا أسفل مصدره. تُتخطى أمثلة التراكب (`&lt;dialog&gt;`, `[popover]`) لأنها مخفية حتى تُفتح، لذلك تُشغّل معاينتها إطار `## Demo` بدلاً من ذلك.

***

### localePrefix?

> `optional` **localePrefix?**: (`relativePath`) => `string`

وجّه سياج `demo:self:&lt;name&gt;` إلى دليل عرض توضيحي مستضاف ذاتياً مخصّص للنسق المحلي، استنادًا إلى `env.relativePath` الخاص بـ markdown-it في الصفحة الحالية (مثلاً `"hu/"` للصفحات تحت `hu/`، و`""` للنسق المحلي الجذري). يُسبَق هذا المسار إلى `demosPath` حتى يتم تحميل النسخة المحلية من العرض التوضيحي (نص مترجم، نفس الوسم) بدلًا من المصدر الإنجليزي. اتركه غير معطى لمواقع ذات لغة واحدة.

#### المعلمات

##### relativePath

`string`

#### القيم المرجعة

`string`
