[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectLeaves

# Ֆունկցիա: collectLeaves()

> **collectLeaves**(`obj`, `path?`, `out?`): [`Leaf`](../interfaces/Leaf.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Հավաքեք Tokens Studio tree-ի յուրաքանչյուր տերեւ: Տերեւը `.value`-ով հանգույց է՝ string արժեքը տալիս է մեկ տերեւ; composite object արժեքը (typography) տալիս է մեկ տերեւ `&lt;token&gt;-&lt;subProperty&gt;`-ով անվանված sub-property-ի համար; array արժեքները (box-shadow ցանկեր) բաց են թողնվել:

## Պարամետրեր

### obj

`unknown`

### path?

`string`[] = `[]`

### out?

[`Leaf`](../interfaces/Leaf.md)[] = `[]`

## Վերադարձվող արժեք

[`Leaf`](../interfaces/Leaf.md)[]

## Օրինակ

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
