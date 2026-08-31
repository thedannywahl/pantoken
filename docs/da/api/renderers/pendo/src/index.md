[pantoken](../../../index.md) / pendo

# pendo

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/pendo` — et globalt stylesheet designet af Instructure til Pendo-vejledninger.

Pendo injicerer vejledning HTML ind i en værtsside; dette gengiver denne vejledning DOM (`._pendo-*`) for at matche
Instructure UI, ved hjælp af pantokens `--instui-*` tokenlaget til justering. Component CSS er
overført fra `@instructure/pendo-global-css`; pantoken leverer tokens og montagen.

[buildPendoCss](functions/buildPendoCss.md) komponerer stylesheetet; [pendoCss](variables/pendoCss.md) er den færdige `rebrand` opbygning
(omfang, `!important`). En statisk fil publiceres på `@pantoken/pendo/global.css`.

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

Omdøber og genudexporterer [pendoCss](variables/pendoCss.md)
