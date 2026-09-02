[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# इंटरफेस: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

A pantoken plugin. Every hook is optional; a plugin participates only in the stages it defines a
hook for. The same plugin can therefore inject at more than one layer.

## प्रॉपर्टीज

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

A unique, human-readable plugin name.

## मिथड्स

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Token stage: return the full replacement token list.

#### पैरामीटर

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### वापसी

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Icon stage: return new [IconEntry](IconEntry.md) records to register as `&lt;image&gt;` tokens.
Returning `undefined` or an empty array leaves the current set unchanged.

#### पैरामीटर

##### ctx

[`IconHookContext`](IconHookContext.md)

#### वापसी

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

CSS stage: contribute or post-process CSS.

#### पैरामीटर

##### ctx

[`CssHookContext`](CssHookContext.md)

#### वापसी

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Rehype stage: provide a resolver merged into the rehype plugin.

#### पैरामीटर

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### वापसी

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

Native stage (Style Dictionary): register transforms/formats.

#### पैरामीटर

##### ctx

`unknown`

#### वापसी

`void`
