[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectLeaves

# Function: collectLeaves()

> **collectLeaves**(`obj`, `path?`, `out?`): [`Leaf`](../interfaces/Leaf.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

جمع كل ورقة من شجرة Tokens Studio. الورقة هي عقدة بها `.value`:
قيمة السلسلة تحقق ورقة واحدة؛ قيمة كائن مركبة (الطباعة) تحقق ورقة واحدة لكل
خاصية فرعية باسم `&lt;token&gt;-&lt;subProperty&gt;`؛ قيم المصفوفات (قوائم box-shadow) يتم تخطيها.

## Parameters

### obj

`unknown`

### path?

`string`[] = `[]`

### out?

[`Leaf`](../interfaces/Leaf.md)[] = `[]`

## Returns

[`Leaf`](../interfaces/Leaf.md)[]

## Example

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
