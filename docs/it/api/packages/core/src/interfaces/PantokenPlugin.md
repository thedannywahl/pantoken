[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# Interfaccia: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Proprietà

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A unique, human-readable plugin name.

## Metodi

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token stage: return the full replacement token list.

#### Parametri

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Restituisce

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Parametri

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Restituisce

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS stage: contribute or post-process CSS.

#### Parametri

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Restituisce

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Parametri

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Restituisce

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Parametri

##### ctx

`unknown`

#### Restituisce

`void`
