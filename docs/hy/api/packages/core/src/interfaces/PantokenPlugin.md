[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Pantoken plugin: Ամեն hook-ը ընտրովի է; plugin-ը մասնակցում է միայն այն փուլերին, որտեղ այն սահմանում է
hook: Նույն plugin-ը կարող է ինեկցիա անել ավելի քան մեկ շերտում:

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Յուրահատուկ, մարդկային ընթեռնելի plugin անունը:

## Methods

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token փուլ` վերադարձնել տեղադրման token ամբողջ ցանկը:

#### Parameters

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Returns

`void` \| [`Token`](Token.md)[]

---

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Պատկերակի փուլ` վերադարձնել նոր [IconEntry](IconEntry.md) գրառումներ` գրանցելու համար որպես `&lt;image&gt;` tokens:
Վերադարձնել `undefined` կամ դատարկ array-ը թողնում է ընթացիկ հավաքածուն անփոփոխ:

#### Parameters

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Returns

`void` \| [`IconEntry`](IconEntry.md)[]

---

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS փուլ` ներդրում կամ CSS հետ-մշակում:

#### Parameters

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Returns

`void` \| [`CssContribution`](CssContribution.md)

---

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype փուլ` տրամադրել resolver-ը միացված rehype plugin-ի մեջ:

#### Parameters

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Returns

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

---

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Բնական փուլ (Style Dictionary)` գրանցել transforms/formats:

#### Parameters

##### ctx

`unknown`

#### Returns

`void`
