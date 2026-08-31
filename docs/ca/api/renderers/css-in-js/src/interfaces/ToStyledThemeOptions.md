[pantoken](../../../../index.md) / [renderers/css-in-js/src](../index.md) / ToStyledThemeOptions

# Interface: ToStyledThemeOptions

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Opcions per a [toStyledTheme](../functions/toStyledTheme.md).

## Properties

### resolve?

> `optional` **resolve?**: [`Mode`](../../../../packages/core/src/type-aliases/Mode.md)

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Coure valors concrets per a aquest mode de color en lloc de referències `var(--instui-*)`. Omet-ho per mantenir
el tema recolzat per var() (el per defecte — permet que `@pantoken/css` controlí el canvi de tema en temps d'execució).
