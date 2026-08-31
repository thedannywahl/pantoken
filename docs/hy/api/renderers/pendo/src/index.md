[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — Instructure ոճավորված գլոբալ ոճի թերթիկ Pendo ուղեցուցների համար:

Pendo-ը ուղեցուցի HTML-ը ներարկում է հյուսի էջի մեջ; սա այդ ուղեցուցի DOM-ը (`._pendo-*`) Instructure UI-ի հետ համապատասխանեցնում է,
პანտոկենի `--instui-*` թոկեն շերտ օգտագործելով դասավորման համար: Բաղադրիչի CSS-ը
ներմուծվել է `@instructure/pendo-global-css`-ից; pantoken-ը մատակարարում է թոկենները և հավաքածուն:

[buildPendoCss](functions/buildPendoCss.md) ոճի թերթիկ կազմում է; [pendoCss](variables/pendoCss.md) պատրաստ `rebrand` կառուցում է
(տիրույթային, `!important`): Ստատիկ ֆայլ հրապարակվում է `@pantoken/pendo/global.css`-ում:

## Example

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## Interfaces

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## Variables

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## Functions

- [buildPendoCss](functions/buildPendoCss.md)

## References

### default

Վերանվանում և վերաարտահանում [pendoCss](variables/pendoCss.md)
