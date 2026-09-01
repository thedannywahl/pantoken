[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / LiveExampleOptions

# واجهة: LiveExampleOptions

كيفية إلحاق معاينة حية بكل قفص HTML `@example` في الصفحات المطابقة.

## الخصائص

### match

> **match**: (`relativePath`) => `boolean`

غلف الأقفاص فقط على الصفحات التي يطابق فيها `env.relativePath` الخاص بـ markdown-it (مثلاً صفحات CSS-API).

#### المعلمات

##### relativePath

`string`

#### القيم المرجعة

`boolean`

***

### wrap

> **wrap**: (`html`, `flags`, `relativePath`) => `string`

بِناء كتلة المعاينة المُلحَقَة بعد كل قفص `html` غير التراكبي، من علامته، وأي توكنات `-flag` مُحلَّلة من سلسلة معلومات القفص، و`env.relativePath` الخاصة بالصفحة (لاستعلامات اللغة/اتجاه النص).

#### المعلمات

##### html

`string`

##### flags

`Set`\<`string`\>

##### relativePath

`string`

#### القيم المرجعة

`string`
