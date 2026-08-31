[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مكون إضافي pantoken. كل خطاف اختياري؛ يشارك المكون الإضافي فقط في المراحل التي يحدد فيها خطاف.
لذلك يمكن للمكون الإضافي نفسه أن يحقن في أكثر من طبقة واحدة.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

اسم مكون إضافي فريد وقابل للقراءة من قبل الإنسان.

## Methods

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مرحلة الرمز: إرجاع قائمة الرموز البديلة الكاملة.

#### Parameters

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Returns

`void` \| [`Token`](Token.md)[]

---

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مرحلة الرمز: إرجاع سجلات [IconEntry](IconEntry.md) جديدة للتسجيل كرموز `&lt;image&gt;`.
إرجاع `undefined` أو مصفوفة فارغة يترك المجموعة الحالية دون تغيير.

#### Parameters

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Returns

`void` \| [`IconEntry`](IconEntry.md)[]

---

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مرحلة CSS: المساهمة أو ما بعد معالجة CSS.

#### Parameters

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Returns

`void` \| [`CssContribution`](CssContribution.md)

---

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

مرحلة Rehype: توفير محلل دمج في مكون Rehype الإضافي.

#### Parameters

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Returns

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

---

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

المرحلة الأصلية (Style Dictionary): تسجيل transforms/formats.

#### Parameters

##### ctx

`unknown`

#### Returns

`void`
