[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En pantoken-plugin. Hver hook er valgfri; en plugin deltager kun i de stadier, den definerer en hook for. Den samme plugin kan derfor injicere på mere end ét lag.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et unikt, menneskelæseligt plugin-navn.

## Methods

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token-stadie: returner den fulde erstatningstokenliste.

#### Parameters

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Returns

`void` \| [`Token`](Token.md)[]

---

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikon-stadie: returner nye [IconEntry](IconEntry.md) poster til registrering som `&lt;image&gt;` tokens. Returnering af `undefined` eller et tomt array lader det aktuelle sæt uændret.

#### Parameters

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Returns

`void` \| [`IconEntry`](IconEntry.md)[]

---

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS-stadie: bidrag til eller post-behandl CSS.

#### Parameters

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Returns

`void` \| [`CssContribution`](CssContribution.md)

---

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype-stadie: levér en resolver fusioneret til rehype-pluginen.

#### Parameters

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Returns

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

---

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Oprindeligt stadie (Style Dictionary): registrer transformationer/formater.

#### Parameters

##### ctx

`unknown`

#### Returns

`void`
