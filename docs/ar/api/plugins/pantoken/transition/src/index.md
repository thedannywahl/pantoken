[pantoken](../../../../index.md) / transition

# transition

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-transition` — الرموز `--instui-transition-duration`/`--instui-transition-timing`
التي تقف وراء أداة InstUI `Transition`.

يعيش CSS نفسه (قاعدة `.instui-transition` الأساسية بالإضافة إلى فئات الحالة `fade`/`scale`/`slide-*`)
في أداة `transition` الخاصة بـ `@pantoken/components` الآن؛ هذا المكوّن الإضافي يقوم فقط بتضمين رمزي مدة/توقيت
في تمثيل IR للرموز للمستهلكين الذين يستخدمون خط أنابيب المستوى الأدنى `@pantoken/css` +
`@pantoken/tokens` مباشرة.

## مثال

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

## واجهات

- [TransitionOptions](interfaces/TransitionOptions.md)

## الدوال

- [transition](functions/transition.md)

## المراجع

### default

يعيد تسمية ويعيد تصدير [transition](functions/transition.md)
