[pantoken](../../../../index.md) / visual-debug

# visual-debug

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-visual-debug` — CSS لخاصية `withVisualDebug` في InstUI.

تتلقى البنيات الأساسية للتخطيط في InstUI (View, Flex, Grid, List, …) قيمة `withVisualDebug` لتحديد محيط الصندوق
والمكوّنات الفرعية أثناء تصحيح التخطيط. يُصدر هذا المكوّن الإضافي مُعدّلاً واحداً مسبوقاً بشرطة,
`-with-visual-debug`, يعمل على أي عنصر (مركب مع أي أساس، على سبيل المثال
`.instui-view -with-visual-debug`). لون المحيط هو خاصية مخصصة من نوع `--pantoken-visual-debug-color`
(افتراضياً مغنِتا زاهية) لذا من السهل إعادة تلوينه.

## مثال

```ts
import { toCss } from "@pantoken/css";
import { byTheme } from "@pantoken/tokens";
import { visualDebug } from "@pantoken/plugin-visual-debug";

const css = toCss(byTheme("rebrand"), { plugins: [visualDebug()] });
// <div class="instui-view -with-visual-debug">…</div>
```

## واجهات

- [VisualDebugOptions](interfaces/VisualDebugOptions.md)

## المتغيرات

- [VISUAL\_DEBUG\_RULES](variables/VISUAL_DEBUG_RULES.md)

## الدوال

- [visualDebugRules](functions/visualDebugRules.md)
- [visualDebug](functions/visualDebug.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [visualDebug](functions/visualDebug.md)
