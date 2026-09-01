[pantoken](../../../../index.md) / stacking

# stacking

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/plugin-stacking` — أعماق z-index مسمّاة.

تعرض `View` الخاصة بـ InstUI مقياس تكديس (`deepest`, `below`, `above`, `topmost`) حتى تتراكم الطبقات بشكل متوقع بدلاً من الاعتماد على أرقام سحرية مُعدَّلة يدوياً. هذا المكوّن الإضافي يُصدر رموز `--instui-stacking-&lt;level&gt;` محُلَّة إلى قيم z-index ملموسة مشتقة من رموز `--instui-component-view-stacking-*` المرفقة، للمستخدمين الذين يستعملون خط التجميع منخفض المستوى `@pantoken/css`/`@pantoken/tokens` مباشرة.
توجد الآن فئات المرافق المطابقة `.instui-stack-&lt;level&gt;` في المرافق الخاصة بـ `@pantoken/components` ضمن
المرافق `stacking` الخاصة بها.

## مثال

```ts
import { buildTokens } from "@pantoken/core";
import { stacking } from "@pantoken/plugin-stacking";

const tokens = buildTokens({ theme: "rebrand", plugins: [stacking()] });
// → includes --instui-stacking-topmost: …
```

## واجهات

- [StackingOptions](interfaces/StackingOptions.md)

## المتغيرات

- [STACKING\_LEVELS](variables/STACKING_LEVELS.md)

## الدوال

- [stacking](functions/stacking.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [stacking](functions/stacking.md)
