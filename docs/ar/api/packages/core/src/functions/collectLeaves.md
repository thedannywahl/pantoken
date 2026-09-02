[pantoken](../../../../index.md) / [packages/core/src](../index.md) / collectLeaves

# دالة: collectLeaves()

> **collectLeaves**(`obj`, `path?`, `out?`): [`Leaf`](../interfaces/Leaf.md)[]

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

اجمع كل ورقة من شجرة Tokens Studio. الورقة هي عقدة تحتوي على `.value`:
قيمة نصية تنتج ورقة واحدة؛ قيمة كائن مركب (typography) تنتج ورقة واحدة لكل
خاصية فرعية باسم `&lt;token&gt;-&lt;subProperty&gt;`; يتم تخطي قيم المصفوفة (قوائم box-shadow).

## المعلمات

### obj

`unknown`

### path?

`string`[] = `[]`

### out?

[`Leaf`](../interfaces/Leaf.md)[] = `[]`

## القيم المرجعة

[`Leaf`](../interfaces/Leaf.md)[]

## مثال

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
