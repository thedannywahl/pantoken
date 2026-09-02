[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# واجهة: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

إضافة pantoken. كل هوك اختياري؛ الإضافة تشارك فقط في المراحل التي تُعرّف لها هوكًا.
لذلك يمكن لنفس الإضافة أن تُحقن في أكثر من طبقة.

## الخصائص

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اسم إضافة فريد وقابل للقراءة من قبل البشر.

## الطرق

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مرحلة الرموز: إرجاع قائمة الرموز البديلة الكاملة.

#### المعلمات

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### القيم المرجعة

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مرحلة الأيقونات: إرجاع سجلات جديدة من [IconEntry](IconEntry.md) للتسجيل كرموز `&lt;image&gt;`.
إرجاع `undefined` أو مصفوفة فارغة يترك المجموعة الحالية دون تغيير.

#### المعلمات

##### ctx

[`IconHookContext`](IconHookContext.md)

#### القيم المرجعة

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مرحلة CSS: المساهمة أو المعالجة اللاحقة لـ CSS.

#### المعلمات

##### ctx

[`CssHookContext`](CssHookContext.md)

#### القيم المرجعة

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

مرحلة Rehype: توفير محلل يتم دمجه في مكون rehype الإضافي.

#### المعلمات

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### القيم المرجعة

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

المرحلة الأصلية (Style Dictionary): تسجيل التحويلات/التنسيقات.

#### المعلمات

##### ctx

`unknown`

#### القيم المرجعة

`void`
