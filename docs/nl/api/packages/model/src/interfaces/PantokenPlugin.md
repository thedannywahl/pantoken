[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Eigenschappen

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

A unique, human-readable plugin name.

## Methoden

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Token stage: return the full replacement token list.

#### Parameters

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Retourneert

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Parameters

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Retourneert

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

CSS stage: contribute or post-process CSS.

#### Parameters

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Retourneert

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Parameters

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Retourneert

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Bèta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Parameters

##### ctx

`unknown`

#### Retourneert

`void`
