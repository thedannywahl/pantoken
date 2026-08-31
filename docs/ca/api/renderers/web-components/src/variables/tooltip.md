[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tooltip

# Variable: tooltip

> `const` **tooltip**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tooltip&gt;` — embolcalla un activador ranurat i mostra una bombolla `.tip` (de l'atribut `tip`) en passar el ratolí/focus. `placement` es mapeja a `-placement-&lt;value&gt;` (p. ex. `bottom`, `end`); `show-delay` i `hide-delay` (ms, per defecte 0) controlen la revelació/ocultació, i Escape la descarta. JS controla el temps: una substitució `!important` controlada per `.-show` neutralitza l'automostra purament CSS `:hover`/`:focus-within`, de manera que la demora realment s'aplica.

## Example

```html
<instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
  <button class="instui-button -color-secondary">Hover me</button>
</instui-tooltip>
```
