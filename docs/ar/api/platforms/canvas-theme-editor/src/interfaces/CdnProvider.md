[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# واجهة: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

شبكة توزيع محتوى (CDN) يمكنها تقديم ملفات حزمة npm. لا يقوم المزودون بتضمين اسم الحزمة مباشرةً — هم فقط
يعرفون كيفية تشكيل عنوان URL من [CdnFile](CdnFile.md).

## الخصائص

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

مُعرف ثابت، على سبيل المثال `"jsdelivr"`.

***

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

اسم مقروء من البشر، على سبيل المثال `"jsDelivr"`.

***

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ما إذا كان [CdnProvider.buildCombineUrl](#buildcombineurl) مُنفَّذًا.

## الطرق

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ينشئ عنوان URL لملف واحد.

#### المعلمات

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### القيم المرجعة

`string`

***

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

ينشئ عنوان URL واحد يخدم عدة ملفات مدموجة معًا. مطلوب إذا وفقط إذا `supportsCombine`.

#### المعلمات

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### القيم المرجعة

`string`
