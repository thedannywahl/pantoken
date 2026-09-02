[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Διεπαφή: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Ιδιότητες

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

A unique, human-readable plugin name.

## Μέθοδοι

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Token stage: return the full replacement token list.

#### Παράμετροι

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Επιστρέφει

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Παράμετροι

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Επιστρέφει

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

CSS stage: contribute or post-process CSS.

#### Παράμετροι

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Επιστρέφει

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Παράμετροι

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Επιστρέφει

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Βήτα</span>

Native stage (Style Dictionary): register transforms/formats.

#### Παράμετροι

##### ctx

`unknown`

#### Επιστρέφει

`void`
