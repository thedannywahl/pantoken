[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Atanga: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Ngā Rawa

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A unique, human-readable plugin name.

## Ngā Tikanga

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token stage: return the full replacement token list.

#### Ngā Tawhā

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Whakahokia

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Ngā Tawhā

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Whakahokia

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS stage: contribute or post-process CSS.

#### Ngā Tawhā

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Whakahokia

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Ngā Tawhā

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Whakahokia

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Ngā Tawhā

##### ctx

`unknown`

#### Whakahokia

`void`
