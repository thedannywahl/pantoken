[pantoken](../../../../index.md) / [packages/core/src](../index.md) / PantokenPlugin

# อินเทอร์เฟซ: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## คุณสมบัติ

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

A unique, human-readable plugin name.

## เมธอด

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Token stage: return the full replacement token list.

#### พารามิเตอร์

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### คืนค่า

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### พารามิเตอร์

##### ctx

[`IconHookContext`](IconHookContext.md)

#### คืนค่า

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

CSS stage: contribute or post-process CSS.

#### พารามิเตอร์

##### ctx

[`CssHookContext`](CssHookContext.md)

#### คืนค่า

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### พารามิเตอร์

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### คืนค่า

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">เบต้า</span>

Native stage (Style Dictionary): register transforms/formats.

#### พารามิเตอร์

##### ctx

`unknown`

#### คืนค่า

`void`
