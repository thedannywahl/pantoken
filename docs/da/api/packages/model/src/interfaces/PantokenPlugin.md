[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

En pantoken-plugin. Hver hook er valgfri; en plugin deltager kun i de stadier, den definerer en hook for. Den samme plugin kan derfor injicere på mere end ét lag.

## Egenskaber

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Et unikt, menneskelæseligt plugin-navn.

## Metoder

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Token-stadie: returner den fulde erstatningstokenliste.

#### Parametre

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Returnerer

`void` \| [`Token`](Token.md)[]

***

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ikon-stadie: returner nye [IconEntry](IconEntry.md) poster til registrering som `&lt;image&gt;` tokens. Returnering af `undefined` eller et tomt array lader det aktuelle sæt uændret.

#### Parametre

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Returnerer

`void` \| [`IconEntry`](IconEntry.md)[]

***

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

CSS-stadie: bidrag til eller post-behandl CSS.

#### Parametre

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Returnerer

`void` \| [`CssContribution`](CssContribution.md)

***

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Rehype-stadie: levér en resolver fusioneret til rehype-pluginen.

#### Parametre

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Returnerer

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

***

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Oprindeligt stadie (Style Dictionary): registrer transformationer/formater.

#### Parametre

##### ctx

`unknown`

#### Returnerer

`void`
