[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Comhéadan: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Airíonna

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

A unique, human-readable plugin name.

## Modhanna

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Token stage: return the full replacement token list.

#### Paraiméadair

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Tuairisceáin

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Paraiméadair

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Tuairisceáin

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

CSS stage: contribute or post-process CSS.

#### Paraiméadair

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Tuairisceáin

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Paraiméadair

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Tuairisceáin

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

Native stage (Style Dictionary): register transforms/formats.

#### Paraiméadair

##### ctx

`unknown`

#### Tuairisceáin

`void`
