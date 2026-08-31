[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / button

# Variable: button

> `const` **button**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-button&gt;` — նշանի-ոճավորված `&lt;button&gt;`: `variant` հատկությունը քարտեզ է անում `-color-&lt;variant&gt;` փոփոխիչին (`secondary`, `tertiary`, `success`, `danger`, `ai`, …); `margin` ավելացնում է տարածություն հյուսնիկի շուրջ (InstUI հեղացո՞ղներ ինչպես `small` / `medium large`); տեղադրված բովանդակությունը պիտակն է:

Դա նաև հայրենի կանչողն է. `popovertarget` (ընտրովի `popovertargetaction`) անջատում է ցանկացած լույսի-DOM `[popover]` ինչպես `&lt;instui-context-view&gt;`, `&lt;instui-popover&gt;`, կամ `&lt;instui-tray&gt;`, և `command`/`commandfor` վարում է հրամանի վրա հիմնված բաղադրիչներ (`&lt;instui-modal&gt;`-ը `--show`/`--close` հետ, և այլն): ID-ը ցակատարվում է ներքին կոճակին կանչողի IDL-ի միջոցով, ուստի այն լուծվում է ստվերային սահմանի միջոցով և կարող է մատնացույց անել այն տարրի, որը հետագայում հայտարարված է փաստաթղթում:

## Example

```html
<instui-button variant="primary" margin="small">Save changes</instui-button>
<instui-button variant="danger" margin="small">Delete</instui-button>
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
