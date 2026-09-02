[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

`@pantoken/pendo` — Instructure ոճավորված գլոբալ ոճի թերթիկ Pendo ուղեցուցների համար:

Pendo injects guide HTML into a host page; this renders that guide DOM (`._pendo-*`) to match
Instructure UI, using pantoken's `--instui-*` token layer for alignment. It includes responsive
violet and sea banner guide treatments alongside alerts, popovers, surveys, and controls. The
component CSS is ported from `@instructure/pendo-global-css`; pantoken supplies the tokens and the
assembly. A single theme class containing `instui` activates the scoped stylesheet; compact
suffixes on that class select banner colors and glyphs.

[buildPendoCss](functions/buildPendoCss.md) ոճի թերթիկ կազմում է; [pendoCss](variables/pendoCss.md) պատրաստ `rebrand` կառուցում է
(տիրույթային, `!important`): Ստատիկ ֆայլ հրապարակվում է `@pantoken/pendo/global.css`-ում:

```demo
self:pendo
```

## Օրինակ

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## Ինտերֆեյսներ

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## Փոփոխականներ

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## Ֆունկցիաներ

- [buildPendoCss](functions/buildPendoCss.md)

## Հղումներ

### default

Վերանվանում և վերաարտահանում [pendoCss](variables/pendoCss.md)
