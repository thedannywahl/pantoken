[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# インターフェース: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## プロパティ

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

A unique, human-readable plugin name.

## メソッド

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Token stage: return the full replacement token list.

#### パラメーター

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### 戻り値

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### パラメーター

##### ctx

[`IconHookContext`](IconHookContext.md)

#### 戻り値

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

CSS stage: contribute or post-process CSS.

#### パラメーター

##### ctx

[`CssHookContext`](CssHookContext.md)

#### 戻り値

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### パラメーター

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### 戻り値

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">ベータ</span>

Native stage (Style Dictionary): register transforms/formats.

#### パラメーター

##### ctx

`unknown`

#### 戻り値

`void`
