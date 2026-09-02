[pantoken](../../../../index.md) / primitives

# primitives

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Classes d'utilitats opt-in per a la paleta de primitius pantoken crua (`--instui-primitive-*`).

Les utilitats semàntiques en `@pantoken/components` exposen deliberadament només tokens semàntiques — una sobreescriptura de color allà és sempre un rol (`bg-brand`), mai una mostra crua. Aquest paquet és l'escala de sortida: una classe per token primitiu per al cas rar en què un desenvolupador necessita la paleta directament. Carrega-la per si sola (`@pantoken/plugin-primitives/primitives.css`), separada de la capa semàntica.

## Exemple

**Construeix la full d'estils primitiva**

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

## Interfícies

- [PrimitiveTokenNames](interfaces/PrimitiveTokenNames.md)
- [PrimitivesOptions](interfaces/PrimitivesOptions.md)

## Funcions

- [primitivesCss](functions/primitivesCss.md)

## Referències

### default

Reanomena i re-exporta [primitivesCss](functions/primitivesCss.md)
