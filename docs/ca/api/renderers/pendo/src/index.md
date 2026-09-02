[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — una fulla d'estils global estilitzada per a Instructure per a guies de Pendo.

Pendo injects guide HTML into a host page; this renders that guide DOM (`._pendo-*`) to match
Instructure UI, using pantoken's `--instui-*` token layer for alignment. It includes responsive
violet and sea banner guide treatments alongside alerts, popovers, surveys, and controls. The
component CSS is ported from `@instructure/pendo-global-css`; pantoken supplies the tokens and the
assembly. A single theme class containing `instui` activates the scoped stylesheet; compact
suffixes on that class select banner colors and glyphs.

[buildPendoCss](functions/buildPendoCss.md) compon la fulla d'estils; [pendoCss](variables/pendoCss.md) és la construcció `rebrand` preelaborada
(amb abast, `!important`). Un fitxer estàtic es publica a `@pantoken/pendo/global.css`.

```demo
self:pendo
```

## Exemple

```ts
import { pendoCss } from "@pantoken/pendo";
// or a variant: buildPendoCss({ theme: "canvas", scope: false })
```

## Interfícies

- [BuildPendoCssOptions](interfaces/BuildPendoCssOptions.md)
- [AddScopeOptions](interfaces/AddScopeOptions.md)

## Variables

- [pendoCss](variables/pendoCss.md)
- [LAYER\_ORDER](variables/LAYER_ORDER.md)
- [COMPONENTS](variables/COMPONENTS.md)
- [addImportant](variables/addImportant.md)
- [addScope](variables/addScope.md)

## Funcions

- [buildPendoCss](functions/buildPendoCss.md)

## Referències

### default

Canvia el nom i re-exporta [pendoCss](variables/pendoCss.md)
