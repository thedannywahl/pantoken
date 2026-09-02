[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# Ինտերֆեյս: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Pantoken plugin: Ամեն hook-ը ընտրովի է; plugin-ը մասնակցում է միայն այն փուլերին, որտեղ այն սահմանում է
hook: Նույն plugin-ը կարող է ինեկցիա անել ավելի քան մեկ շերտում:

## Առանձնահատկություններ

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Յուրահատուկ, մարդկային ընթեռնելի plugin անունը:

## Մեթոդներ

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Token փուլ` վերադարձնել տեղադրման token ամբողջ ցանկը:

#### Պարամետրեր

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Վերադարձվող արժեք

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Պատկերակի փուլ` վերադարձնել նոր [IconEntry](IconEntry.md) գրառումներ` գրանցելու համար որպես `&lt;image&gt;` tokens:
Վերադարձնել `undefined` կամ դատարկ array-ը թողնում է ընթացիկ հավաքածուն անփոփոխ:

#### Պարամետրեր

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Վերադարձվող արժեք

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

CSS փուլ` ներդրում կամ CSS հետ-մշակում:

#### Պարամետրեր

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Վերադարձվող արժեք

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Rehype փուլ` տրամադրել resolver-ը միացված rehype plugin-ի մեջ:

#### Պարամետրեր

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Վերադարձվող արժեք

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Բնական փուլ (Style Dictionary)` գրանցել transforms/formats:

#### Պարամետրեր

##### ctx

`unknown`

#### Վերադարձվող արժեք

`void`
