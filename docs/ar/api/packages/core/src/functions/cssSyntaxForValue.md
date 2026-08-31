[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# Function: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

شم خاصية CSS `@property` `syntax` التي يجب أن يسجل توكن معين تحتها. لا تخريطات Tokens Studio
`type`s 1:1 إلى بناء جملة CSS، لذلك يتم فحص القيمة. يعود `"*"` (عالمي) لـ
أي شيء ليس توكنًا واحدًا مكتوبًا بشكل مستقل حسابيًا.

## Parameters

### value

`string`

قيمة ملموسة (لا `var()` / `light-dark()`).

## Returns

`string`

واصف بناء جملة `@property`.

## Examples

**قيم التوكن الواحد المكتوبة**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("#03893D"); // → "<color>"
cssSyntaxForValue("2px"); // → "<length>"
cssSyntaxForValue("50%"); // → "<percentage>"
cssSyntaxForValue("400"); // → "<integer>"
```

**الوحدات النسبية للخط والقيم المعقدة تعود إلى عالمي**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("1rem"); // → "*" (rem isn't computationally independent)
cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
cssSyntaxForValue("currentColor"); // → "*"
```
