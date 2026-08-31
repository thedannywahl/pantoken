[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-visual-debug` — ال CSS للخاصية `withVisualDebug` من InstUI.

تأخذ البدائيات الحالة من InstUI (View, Flex, Grid, List, …) `withVisualDebug` لتحديد صندوق
وأطفاله أثناء تصحيح الخطأ في الحالة. ينبعث هذا المكون الإضافي من مُعدِّل واحد مع بادئة شرطة،
`-with-visual-debug`، يعمل على أي عنصر (مركب مع أي قاعدة، على سبيل المثال
`.instui-view -with-visual-debug`). لون الخطوط الموضحة هو خاصية مخصصة `--pantoken-visual-debug-color`
(الإعداد الافتراضي أرجواني ساطع) حتى يسهل إعادة الصبغة.

## Example

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## Interfaces

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## Variables

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## Functions

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## References

### default

يعيد تسمية وإعادة تصدير [visualDebug](functions/visualDebug.md)
