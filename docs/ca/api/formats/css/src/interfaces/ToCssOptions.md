[pantoken](../../../../index.md) / [formats/css/src](../index.md) / ToCssOptions

# Interface: ToCssOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opcions per a [toCss](../functions/toCss.md).

## Properties

### scope?

> `optional` **scope?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

El selector amb declaracions d'àmbit s'emet sota (per defecte `":root"`).

---

### plugins?

> `optional` **plugins?**: readonly [`PantokenPlugin`](../../../../packages/core/src/interfaces/PantokenPlugin.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Plugins els quals ganxos de `css` s'executen després de construir el CSS base (per defecte: cap).
