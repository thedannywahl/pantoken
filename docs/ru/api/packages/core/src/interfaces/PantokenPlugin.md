[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# Интерфейс: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Свойства

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

A unique, human-readable plugin name.

## Методы

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Token stage: return the full replacement token list.

#### Параметры

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Возвращаемое значение

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Параметры

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Возвращаемое значение

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

CSS stage: contribute or post-process CSS.

#### Параметры

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Возвращаемое значение

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Параметры

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Возвращаемое значение

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Бета</span>

Native stage (Style Dictionary): register transforms/formats.

#### Параметры

##### ctx

`unknown`

#### Возвращаемое значение

`void`
