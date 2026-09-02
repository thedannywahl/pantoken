[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# ממשק: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## תכונות

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

A unique, human-readable plugin name.

## שיטות

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Token stage: return the full replacement token list.

#### פרמטרים

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### מחזיר

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### פרמטרים

##### ctx

[`IconHookContext`](IconHookContext.md)

#### מחזיר

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

CSS stage: contribute or post-process CSS.

#### פרמטרים

##### ctx

[`CssHookContext`](CssHookContext.md)

#### מחזיר

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### פרמטרים

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### מחזיר

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">בטא</span>

Native stage (Style Dictionary): register transforms/formats.

#### פרמטרים

##### ctx

`unknown`

#### מחזיר

`void`
