[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — an Instructure-styled global stylesheet for Pendo guides.

Pendo injects guide HTML into a host page; this renders that guide DOM (`._pendo-*`) to match
Instructure UI, using pantoken's `--instui-*` token layer for alignment. The component CSS is
ported from `@instructure/pendo-global-css`; pantoken supplies the tokens and the assembly.

[buildPendoCss](functions/buildPendoCss.md) composes the stylesheet; [pendoCss](variables/pendoCss.md) is the ready-made `rebrand` build
(scoped, `!important`). A static file is published at `@pantoken/pendo/global.css`.

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

Renames and re-exports [pendoCss](variables/pendoCss.md)
