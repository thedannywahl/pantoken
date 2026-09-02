[pantoken](../../../../index.md) / prune-custom-props

# prune-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-prune-custom-props` — tree-shake de propietats personalitzades sense usar d'una fulla d'estils composta.

La `@pantoken/css` de pantoken emet tot el conjunt de símbols `--instui-*` (≈1.800 URI de dades d'icones
incloses). Un renderitzador que es construeix sobre aquesta capa però només aplica estils a una part del sistema hauria
d'enviar el conjunt complet d'una altra manera — així que qualsevol renderitzador així ho vol. Partint de les
referències `var()` en declaracions reals (no de propietat personalitzada), manté transitòriament només les
propietats personalitzades realment assequibles, i descarta les registracions `@property` sense usar que coincideixen.

És un connector PostCSS autònom (executeu-lo en la vostra pròpia canonada PostCSS). La factoria retorna un
objecte de connector senzill, de manera que importar aquest mòdul no comporta cap dependència d'execució — `postcss` és només
un tipus.

## Exemple

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
```

## Variables

- [pruneCustomProps](variables/pruneCustomProps.md)

## Referències

### default

Canvia el nom i reexporta [pruneCustomProps](variables/pruneCustomProps.md)
