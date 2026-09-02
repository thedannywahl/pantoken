[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — an Instructure-styled global stylesheet for Pendo guides.

Pendo injects guide HTML into a host page; this renders that guide DOM (`._pendo-*`) to match
Instructure UI, using pantoken's `--instui-*` token layer for alignment. It includes responsive
violet and sea banner guide treatments alongside alerts, popovers, surveys, and controls. The
component CSS is ported from `@instructure/pendo-global-css`; pantoken supplies the tokens and the
assembly. A single theme class containing `instui` activates the scoped stylesheet; compact
suffixes on that class select banner colors and glyphs.

[buildPendoCss](functions/buildPendoCss.md) composes the stylesheet; [pendoCss](variables/pendoCss.md) is the ready-made `rebrand` build
(scoped, `!important`). A static file is published at `@pantoken/pendo/global.css`.

```demo
self:pendo
```

## Esempio

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## Interfacce

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## Variabili

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## Funzioni

- [buildPendoCss](functions/buildPendoCss.md)

## Riferimenti

### default

Renames and re-exports [pendoCss](variables/pendoCss.md)
