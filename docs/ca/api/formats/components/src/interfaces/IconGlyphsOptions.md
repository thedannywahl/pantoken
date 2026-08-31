[pantoken](../../../../index.md) / [formats/components/src](../index.md) / IconGlyphsOptions

# Interface: IconGlyphsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [iconGlyphsCss](../functions/iconGlyphsCss.md).

## Extends

- [`ComponentOptions`](ComponentOptions.md)

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El prefix de classe. Una cadena truthy estableix l'espai de noms de cada classe (`"instui"` → `.instui-button`); qualsevol valor falsy (`null`, `undefined`, `""`, o omitint l'opció) elimina el prefix sencer
(`.button`), perquè pugueu escriure `class="heading -h1"`. Els fulls d'estils enviats per aquest paquet es
construeixen amb `"instui"`.

#### Inherited from

[`ComponentOptions`](ComponentOptions.md).[`prefix`](ComponentOptions.md#prefix)

---

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tema objectiu per al CSS emès. Per defecte a `"rebrand"` quan s'omet.

#### Inherited from

[`ComponentOptions`](ComponentOptions.md).[`theme`](ComponentOptions.md#theme)

---

### deprecatedAliases?

> `optional` **deprecatedAliases?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Emet també els alias de glif de propietat InstUI deprecats (`-render-icon-&lt;name&gt;`, `-render-custom-icon-&lt;name&gt;`)
com a alias funcionals de `-icon-&lt;name&gt;`. Desactivat per defecte — activar-lo duplica aproximadament la mida del full, per tant
activeu-lo només quan necessiteu que el marcat escrit amb els noms de propietat antigus `renderIcon`/`renderCustomIcon` continuï representant-se correctament. El `icons.css` enviat es construeix amb aquesta opció activada.
