[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectLeaves

# Funktion: collectLeaves()

> **collectLeaves**(`obj`, `path?`, `out?`): [`Leaf`](../interfaces/Leaf.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Saml alle blade i et Tokens Studio-træ. Et blad er en knude med en `.value`:
en strengværdi giver ét blad; en sammensat objektværdi (typografi) giver ét blad pr.
underegenskap navngivet `&lt;token&gt;-&lt;subProperty&gt;`; matrixværdier (box-shadow-lister) springes over.

## Parametre

### obj

`unknown`

### path?

`string`[] = `[]`

### out?

[`Leaf`](../interfaces/Leaf.md)[] = `[]`

## Returnerer

[`Leaf`](../interfaces/Leaf.md)[]

## Eksempel

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
