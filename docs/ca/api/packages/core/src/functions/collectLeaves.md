[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectLeaves

# Funció: collectLeaves()

> **collectLeaves**(`obj`, `path?`, `out?`): [`Leaf`](../interfaces/Leaf.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Recull cada fulla d'un arbre de Tokens Studio. Una fulla és un node amb un `.value`:
un valor de cadena produeix una fulla; un valor d'objecte compost (tipografia) produeix una fulla per
sub-propietat anomenada `&lt;token&gt;-&lt;subProperty&gt;`; els valors de matriu (llistes box-shadow) es salten.

## Paràmetres

### obj

`unknown`

### path?

`string`[] = `[]`

### out?

[`Leaf`](../interfaces/Leaf.md)[] = `[]`

## Retorna

[`Leaf`](../interfaces/Leaf.md)[]

## Exemple

```ts
import { collectLeaves } from "@pantoken/core";

const tree = {
  color: {
    white: { value: "#ffffff", type: "color" },
    hover: { value: "{color.white}", type: "color" },
  },
  typography: { body: { value: { fontFamily: "Lato", fontSize: "1rem", type: "typography" } } },
};

collectLeaves(tree).map((l) => [l.path.join("."), l.value]);
// → [
//   ["color.white", "#ffffff"],
//   ["color.hover", "{color.white}"],
//   ["typography.body.fontFamily", "Lato"],
//   ["typography.body.fontSize", "1rem"],
// ]
```
