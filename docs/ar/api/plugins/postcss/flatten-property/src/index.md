[pantoken](../../../../index.md) / flatten-property

# flatten-property

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-flatten-property` — تحويل قواعس `@property` إلى إعلانات خاصية مخصصة عادية.

تسجل قواعس `@property` خصائص CSS مخصصة بنوع مع وصفات `syntax`، `inherits`، و `initial-value`. تحمل عبء بايت كبير — ~60 بايت من النموذج النشطي لكل خاصية — وغير ضروري عندما تكون ورقة الأنماط حزمة مستقلة حيث لا يوفر تسجيل النوع أي فائدة وقت التشغيل. يستبدل هذا المكون الإضافي كل كتلة `@property` بإعلان `--name: value` بسيط داخل محدد مختار، استعادة كل هذا العبء.

**ملاحظة دلالية:** إزالة `@property` تفقد تسجيل نوع CSS. الانتقالات/الرسوم المتحركة المكتوبة بنوع،
`@starting-style`، و CSS Typed OM تعتمد عليها. طبق فقط على الحزم حيث لا تكون تلك الدلالات مطلوبة.

## Example

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";
const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

## Interfaces

- [FlattenPropertyOptions](interfaces/FlattenPropertyOptions.md)

## Variables

- [flattenProperty](variables/flattenProperty.md)
