[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / button

# Variable: button

> `const` **button**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-button&gt;` — en token-stiliseret `&lt;button&gt;`. Attributten `variant` kortlægges til `-color-&lt;variant&gt;`
modifikatoren (`secondary`, `tertiary`, `success`, `danger`, `ai`, …); `margin` tilføjer mellemrum omkring
væerten (InstUI-nøgleord som `small` / `medium large`); slot-indhold er etiketten.

Det er også en indfødt invoker: `popovertarget` (med valgfri `popovertargetaction`) skifter enhver
light-DOM `[popover]` såsom `&lt;instui-context-view&gt;`, `&lt;instui-popover&gt;`, eller `&lt;instui-tray&gt;`, og
`command`/`commandfor` driver de kommandobaserede komponenter (`&lt;instui-modal&gt;` med `--show`/`--close`,
osv.). Id'et videresendes til den indre knap via invoker IDL, så det løses på tværs af shadow
grænsen og kan pege frem til et element, der er erklæret senere i dokumentet.

## Example

```html
<instui-button variant="primary" margin="small">Save changes</instui-button>
<instui-button variant="danger" margin="small">Delete</instui-button>
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
