[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / ElementDefinition

# واجهة: ElementDefinition

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

عنصر مخصص مسجل واحد: اسم الوسم الأساسي الخاص به بالإضافة إلى `define` الذي يقوم بتسجيله عبر السياق.

## الخصائص

### name

> `readonly` **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

اسم الوسم الأساسي، مثال `button` (تم إنشاؤه كـ `&lt;instui-button&gt;`/`&lt;x-button&gt;` بواسطة البادئة النشطة).

## الطرق

### define()

> **define**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

سجل العنصر في `ctx.registry`، باستخدام أدوات المساعدة المشتركة المدركة للبادئة فقط.

#### المعلمات

##### ctx

[`RegisterContext`](RegisterContext.md)

#### القيم المرجعة

`void`
