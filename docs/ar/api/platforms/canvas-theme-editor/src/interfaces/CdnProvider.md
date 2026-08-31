[pantoken](../../../../index.md) / [platforms/canvas-theme-editor/src](../index.md) / CdnProvider

# Interface: CdnProvider

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

شبكة توصيل محتوى (CDN) يمكنها تقديم ملفات حزم npm. لا يقوم المزودون بتحديد اسم حزمة مشفر - فهم يعرفون فقط كيفية تشكيل عنوان URL من [CdnFile](CdnFile.md).

## Properties

### id

> **id**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

معرف مستقر، على سبيل المثال `"jsdelivr"`.

---

### label

> **label**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

اسم قابل للقراءة من قبل الإنسان، على سبيل المثال `"jsDelivr"`.

---

### supportsCombine

> **supportsCombine**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

ما إذا تم تنفيذ [CdnProvider.buildCombineUrl](#buildcombineurl).

## Methods

### buildUrl()

> **buildUrl**(`file`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

ينشئ عنوان URL لملف واحد.

#### Parameters

##### file

[`CdnFile`](CdnFile.md)

##### options?

`CdnBuildOptions`

#### Returns

`string`

---

### buildCombineUrl()?

> `optional` **buildCombineUrl**(`files`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

ينشئ عنوان URL واحد يقدم ملفات متعددة متسلسلة معًا. مطلوب إذا وفقط إذا `supportsCombine`.

#### Parameters

##### files

[`CdnFile`](CdnFile.md)[]

##### options?

`CdnBuildOptions`

#### Returns

`string`
