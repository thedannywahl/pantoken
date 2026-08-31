[pantoken](../../../../index.md) / [formats/components/src](../index.md) / ComponentOptions

# Interface: ComponentOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions comunes a cada constructor.

## Extended by

- [`IconGlyphsOptions`](IconGlyphsOptions.md)

## Properties

### prefix?

> `optional` **prefix?**: `string` \| `null`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El prefix de classe. Una cadena truthy estableix l'espai de noms de cada classe (`"instui"` → `.instui-button`); qualsevol valor falsy (`null`, `undefined`, `""`, o omitint l'opció) elimina el prefix sencer
(`.button`), perquè pugueu escriure `class="heading -h1"`. Els fulls d'estils enviats per aquest paquet es
construeixen amb `"instui"`.

---

### theme?

> `optional` **theme?**: `ComponentTheme`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tema objectiu per al CSS emès. Per defecte a `"rebrand"` quan s'omet.
