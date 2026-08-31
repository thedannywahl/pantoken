[pantoken](../../../../index.md) / primitives

# primitives

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

فئات مساعدة اختيارية لوحة pantoken الأساسية الخام (`--instui-primitive-*`).

الأدوات الدلالية في `@pantoken/components` تكشف عن قصد فقط عن الرموز الدلالية — تجاوز لون هناك هو دائماً دور (`bg-brand`)، وليس بالمثل الخام. هذه الحزمة هي فتحة الهروب: فئة واحدة لكل رمز أساسي للحالة النادرة التي يحتاج فيها المطور إلى الوحة مباشرة. قم بتحميله بمفرده (`@pantoken/plugin-primitives/primitives.css`)، منفصلاً عن الطبقة الدلالية.

## Example

**بناء ورقة الأنماط الأساسية**

```ts
import { primitivesCss } from "@pantoken/plugin-primitives";
import { tokens } from "@pantoken/tokens";

const names = (p: string) => tokens.filter((t) => t.name.startsWith(p)).map((t) => t.name);
const css = primitivesCss({
  color: names("--instui-primitive-color-"),
  fontFamily: names("--instui-primitive-font-family-"),
  fontWeight: names("--instui-primitive-font-weight-"),
});
// .instui-bg-primitive-color-white { background: var(--instui-primitive-color-white); }
```

## Interfaces

- [PrimitiveTokenNames](interfaces/PrimitiveTokenNames.md)
- [PrimitivesOptions](interfaces/PrimitivesOptions.md)

## Functions

- [primitivesCss](functions/primitivesCss.md)

## References

### default

إعادة تسمية وإعادة تصدير [primitivesCss](functions/primitivesCss.md)
