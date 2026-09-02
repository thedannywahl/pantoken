[pantoken](../../../../../index.md) / [plugins/postcss/prune-custom-props/src](../index.md) / pruneCustomProps

# Variable: pruneCustomProps

> `const` **pruneCustomProps**: \{(): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Creeu el connector PostCSS prune-unused-custom-properties.

## Type Declaration

## Retorna

[`Plugin`](https://postcss.org/api/#plugin)

Un [connector](https://postcss.org/api/#plugin) de PostCSS.

### postcss

> **postcss**: `true`

Marcador requerida del connector de PostCSS.

## Exemple

**Executeu-lo com a una passada PostCSS autònoma**

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";

const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
// only the --instui-* custom properties reachable from real declarations survive
```
