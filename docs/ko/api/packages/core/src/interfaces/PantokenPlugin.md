[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# 인터페이스: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## 속성

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

A unique, human-readable plugin name.

## 메서드

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Token stage: return the full replacement token list.

#### 매개변수

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### 반환값

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### 매개변수

##### ctx

[`IconHookContext`](IconHookContext.md)

#### 반환값

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

CSS stage: contribute or post-process CSS.

#### 매개변수

##### ctx

[`CssHookContext`](CssHookContext.md)

#### 반환값

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### 매개변수

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### 반환값

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Native stage (Style Dictionary): register transforms/formats.

#### 매개변수

##### ctx

`unknown`

#### 반환값

`void`
