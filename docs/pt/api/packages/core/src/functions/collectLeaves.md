[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectLeaves

# Função: collectLeaves()

> **collectLeaves**(`obj`, `path?`, `out?`): [`Leaf`](../interfaces/Leaf.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Collect every leaf of a Tokens Studio tree. A leaf is a node with a `.value`:
a string value yields one leaf; a composite object value (typography) yields one leaf per
sub-property named `&lt;token&gt;-&lt;subProperty&gt;`; array values (box-shadow lists) are skipped.

## Parâmetros

### obj

`unknown`

### path?

`string`[] = `[]`

### out?

[`Leaf`](../interfaces/Leaf.md)[] = `[]`

## Retorna

[`Leaf`](../interfaces/Leaf.md)[]

## Exemplo

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
