[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / button

# Variable: button

> `const` **button**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-button&gt;` — un `&lt;button&gt;` estilitzat per token. L'atribut `variant` es mapeja al modificador `-color-&lt;variant&gt;` (`secondary`, `tertiary`, `success`, `danger`, `ai`, …); `margin` afegeix espaiat al voltant de l'host (paraules clau de InstUI com `small` / `medium large`); el contingut amb slot és l'etiqueta.

Tanmateix, és un invocador natiu: `popovertarget` (amb opcional `popovertargetaction`) commuta qualsevol `[popover]` de DOM clar, com ara `&lt;instui-context-view&gt;`, `&lt;instui-popover&gt;`, o `&lt;instui-tray&gt;`, i `command`/`commandfor` impulsa els components basats en comandaments (`&lt;instui-modal&gt;` amb `--show`/`--close`, etc.). L'id es remet al botó intern a través de l'invocador IDL, de manera que es resol dins del límit de l'ombra i pot apuntar endavant a un element declarat més tard al document.

## Exemple

```html
<instui-button variant="primary" margin="small">Save changes</instui-button>
<instui-button variant="danger" margin="small">Delete</instui-button>
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
