[pantoken](../../../../index.md) / [packages/model/src](../index.md) / PantokenPlugin

# Interface: PantokenPlugin

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un connector pantoken. Cada ganxo és opcional; un connector participa només en les etapes per a les quals defineix un
ganxo. Per tant, el mateix connector pot injectar en més d'una capa.

## Properties

### name

> **name**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Un nom de connector únic i llegible per humans.

## Methods

### tokens()?

> `optional` **tokens**(`ctx`): `void` \| [`Token`](Token.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Etapa de token: retorna la llista completa de tokens de reemplaçament.

#### Parameters

##### ctx

[`TokenHookContext`](TokenHookContext.md)

#### Returns

`void` \| [`Token`](Token.md)[]

---

### icons()?

> `optional` **icons**(`ctx`): `void` \| [`IconEntry`](IconEntry.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Etapa de icona: retorna nous registres [IconEntry](IconEntry.md) per registrar com a tokens `&lt;image&gt;`.
Retornar `undefined` o una matriu buida deixa el conjunt actual incanviat.

#### Parameters

##### ctx

[`IconHookContext`](IconHookContext.md)

#### Returns

`void` \| [`IconEntry`](IconEntry.md)[]

---

### css()?

> `optional` **css**(`ctx`): `void` \| [`CssContribution`](CssContribution.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Etapa CSS: contribueix o post-processa CSS.

#### Parameters

##### ctx

[`CssHookContext`](CssHookContext.md)

#### Returns

`void` \| [`CssContribution`](CssContribution.md)

---

### rehype()?

> `optional` **rehype**(`ctx`): `void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Etapa Rehype: proporciona un resolutor fusionat al connector rehype.

#### Parameters

##### ctx

[`RehypeHookContext`](RehypeHookContext.md)

#### Returns

`void` \| \{ `resolve?`: [`IconResolver`](../type-aliases/IconResolver.md); \}

---

### native()?

> `optional` **native**(`ctx`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Etapa nativa (Style Dictionary): registra transformacions/formats.

#### Parameters

##### ctx

`unknown`

#### Returns

`void`
