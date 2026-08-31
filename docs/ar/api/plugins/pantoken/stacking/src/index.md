[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-stacking` — أعماق z-index المسماة.

يكشف `View` من InstUI عن مقياس تكديس (`deepest`، `below`، `above`، `topmost`) بحيث تتراص الطبقات بطريقة يمكن التنبؤ بها بدلاً من أرقام سحرية مضبوطة يدوياً. يصدر هذا المكون رموز `--instui-stacking-&lt;level&gt;`، يتم حلها إلى قيم z-index ملموسة من رموز `--instui-component-view-stacking-*` المُشحونة، للمستهلكين الذين يستخدمون خط أنابيب `@pantoken/css`/`@pantoken/tokens` ذو المستوى الأقل مباشرة. تعيش فئات أدوات `.instui-stack-&lt;level&gt;` المطابقة الآن في أداة `stacking` الخاصة بـ `@pantoken/components`.

## Example

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```

## Interfaces

- [StackingOptions](interfaces/StackingOptions.md)

## Variables

- [STACKING\_LEVELS](variables/STACKING_LEVELS.md)

## Functions

- [stacking](functions/stacking.md)

## References

### default

إعادة تسمية وإعادة تصدير [stacking](functions/stacking.md)
