[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Propriétés

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

A unique, human-readable plugin name.

## Méthodes

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Token stage: return the full replacement token list.

#### Paramètres

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Retourne

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Paramètres

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Retourne

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

CSS stage: contribute or post-process CSS.

#### Paramètres

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Retourne

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Paramètres

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Retourne

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Bêta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Paramètres

##### ctx

`unknown`

#### Retourne

`void`
