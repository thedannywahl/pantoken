[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — una fulla d'estils global estilitzada per a Instructure per a guies de Pendo.

Pendo injecta HTML de guia en una pàgina amfitriona; això renderitza el DOM de la guia (`._pendo-*`) per coincidir amb
la UI d'Instructure, utilitzant la capa de tokens `--instui-*` de pantoken per a l'alineació. El CSS del component és
portat de `@instructure/pendo-global-css`; pantoken subministra els tokens i l'assemblat.

[buildPendoCss](functions/buildPendoCss.md) compon la fulla d'estils; [pendoCss](variables/pendoCss.md) és la construcció `rebrand` preelaborada
(amb abast, `!important`). Un fitxer estàtic es publica a `@pantoken/pendo/global.css`.

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

Canvia el nom i re-exporta [pendoCss](variables/pendoCss.md)
