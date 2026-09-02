[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# رابط: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## خصوصیات

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

A unique, human-readable plugin name.

## متدها

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Token stage: return the full replacement token list.

#### پارامترها

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### مقدار بازگشتی

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### پارامترها

##### ctx

[`IconHookContext`](IconHookContext.md)

#### مقدار بازگشتی

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

CSS stage: contribute or post-process CSS.

#### پارامترها

##### ctx

[`CssHookContext`](CssHookContext.md)

#### مقدار بازگشتی

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### پارامترها

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### مقدار بازگشتی

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">بتا</span>

Native stage (Style Dictionary): register transforms/formats.

#### پارامترها

##### ctx

`unknown`

#### مقدار بازگشتی

`void`
