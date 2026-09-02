[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interfáhta: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

A unique, human-readable plugin name.

## Metodat

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Token stage: return the full replacement token list.

#### Parametera

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Gullii / Gávdnat

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Parametera

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Gullii / Gávdnat

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

CSS stage: contribute or post-process CSS.

#### Parametera

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Gullii / Gávdnat

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Parametera

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Gullii / Gávdnat

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Parametera

##### ctx

`unknown`

#### Gullii / Gávdnat

`void`
