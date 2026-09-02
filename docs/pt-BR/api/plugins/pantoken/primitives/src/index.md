[pantoken](../../../../index.md) / primitives

# primitives

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Opt-in utility classes for the raw pantoken primitive palette (`--instui-primitive-*`).

The semantic utilities in `@pantoken/components` deliberately expose only semantic tokens — a color
override there is always a role (`bg-brand`), never a raw swatch. This package is the escape hatch:
one class per primitive token for the rare case a developer needs the palette directly. Load it on
its own (`@pantoken/plugin-primitives/primitives.css`), separate from the semantic layer.

## Exemplo

**Build the primitive stylesheet**

```ts
import { primitivesCss } from "@pantoken/plugin-primitives";
import { tokens } from "@pantoken/tokens";

const names = (p: string) => tokens.filter((t) => t.name.startsWith(p)).map((t) => t.name);
const css = primitivesCss({
  color: names("--instui-primitive-color-"),
  fontFamily: names("--instui-primitive-font-family-"),
  fontWeight: names("--instui-primitive-font-weight-"),
});
// .instui-bg-primitive-color-white { background: var(--instui-primitive-color-white); }
```

## Interfaces

- [PrimitiveTokenNames](interfaces/PrimitiveTokenNames.md)
- [PrimitivesOptions](interfaces/PrimitivesOptions.md)

## Funções

- [primitivesCss](functions/primitivesCss.md)

## Referências

### default

Renames and re-exports [primitivesCss](functions/primitivesCss.md)
