[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# Giao diện: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## Thuộc tính

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

A unique, human-readable plugin name.

## Phương thức

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token stage: return the full replacement token list.

#### Tham số

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Trả về

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### Tham số

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Trả về

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS stage: contribute or post-process CSS.

#### Tham số

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Trả về

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### Tham số

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Trả về

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Native stage (Style Dictionary): register transforms/formats.

#### Tham số

##### ctx

`unknown`

#### Trả về

`void`
