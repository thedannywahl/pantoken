[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interfejs: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Właściwości

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A unique, human-readable plugin name.

## Metody

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token stage: return the full replacement token list.

#### Parametry

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Zwraca

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Parametry

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Zwraca

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS stage: contribute or post-process CSS.

#### Parametry

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Zwraca

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Parametry

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Zwraca

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Parametry

##### ctx

`unknown`

#### Zwraca

`void`
