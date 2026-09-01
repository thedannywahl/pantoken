[pantoken](../../../../index.md) / primitives

# primitives

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

فئات أدوات اختيارية للوحات الألوان الأولية الخام الخاصة بـ pantoken (`--instui-primitive-*`).

تعرِّض الأدوات الدلالية في `@pantoken/components` عن قصد رموزًا دلالية فقط — تجاوز اللون هناك دائمًا دور (`bg-brand`)، وليس لوحة ألوان خام. هذه الحزمة هي مخرج الطوارئ: فئة واحدة لكل رمز بدائي للحالة النادرة التي يحتاج فيها المطوّر إلى اللوحة مباشرة. حمّلها بمفردها (`@pantoken/plugin-primitives/primitives.css`)، منفصلة عن الطبقة الدلالية.

## مثال

**بناء ورقة أنماط البدائيات**

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

## واجهات

- [PrimitiveTokenNames](interfaces/PrimitiveTokenNames.md)
- [PrimitivesOptions](interfaces/PrimitivesOptions.md)

## الدوال

- [primitivesCss](functions/primitivesCss.md)

## المراجع

### default

إعادة تسمية وإعادة تصدير [primitivesCss](functions/primitivesCss.md)
