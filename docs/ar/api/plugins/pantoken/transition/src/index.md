[pantoken](../../../../index.md) / transition

# transition

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-transition` — الرموز `--instui-transition-duration`/`--instui-transition-timing`
خلف أداة InstUI `Transition`.

ال CSS نفسه (القاعدة الأساسية `.instui-transition` بالإضافة إلى فئات الحالة `fade`/`scale`/`slide-*`)
يعيش الآن في أداة `transition` الخاصة به `@pantoken/components`؛ هذا المكون الإضافي فقط يمزج رموز المدة/التوقيت في IR رمز لمستهلكي خط أنابيب `@pantoken/css` + `@pantoken/tokens` ذو المستوى الأقل مباشرة.

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { transition } from "@pantoken/plugin-transition";

const tokens = buildTokens({ theme: "rebrand", plugins: [transition()] });
// → includes --instui-transition-duration: 300ms, --instui-transition-timing: ease-in-out
```

## Interfaces

- [TransitionOptions](interfaces/TransitionOptions.md)

## Functions

- [transition](functions/transition.md)

## References

### default

يعيد تسمية وإعادة تصدير [transition](functions/transition.md)
