[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Інтерфейс: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Властивості

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A unique, human-readable plugin name.

## Методи

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Token stage: return the full replacement token list.

#### Параметри

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Повертає

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Параметри

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Повертає

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

CSS stage: contribute or post-process CSS.

#### Параметри

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Повертає

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Параметри

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Повертає

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Native stage (Style Dictionary): register transforms/formats.

#### Параметри

##### ctx

`unknown`

#### Повертає

`void`
