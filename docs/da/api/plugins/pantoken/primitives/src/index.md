[pantoken](../../../../index.md) / primitives

# primitives

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Tilvalg af utility klasser for raw pantoken primitive palette (`--instui-primitive-*`).

De semantiske utilities i `@pantoken/components` eksponerer bevidst kun semantiske tokens — en farve
overriding der er altid en rolle (`bg-brand`), aldrig en rå swatch. Denne pakke er flugtventilen:
én klasse pr. primitive token til det sjældne tilfælde, hvor en udvikler har brug for paletten direkte. Indlæs den på
dens eget (`@pantoken/plugin-primitives/primitives.css`), adskilt fra det semantiske lag.

## Eksempel

**Byg det primitive stylesheet**

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

## Funktioner

- [primitivesCss](functions/primitivesCss.md)

## Referencer

### default

Omdøber og re-eksporterer [primitivesCss](functions/primitivesCss.md)
