# الإضافات

تقوم إضافة pantoken بتمديد مخرجات الرموز أو CSS دون تفرُّع الحزمة. تُنشأ باستخدام `definePlugin` من `@pantoken/plugin-kit`، ثم تُمرَّر إلى `buildTokens` أو `toCss`.

## تأليف إضافة

امنح `definePlugin` الخطافات (hooks) التي تُنفّذها. يعيد إضافة عادية، مُعلّمة بالإمكانات المستنتجة من تلك الخطافات. يمكن للإضافة توسيع الـ IR (`tokens`, `icons`), مخرجات CSS (`css`), أو كلاهما.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## التسجيل الواعي بالإمكانات

تشغّل `buildTokens` و `toCss` `checkPlugins` على الإضافات التي تمرّرها. تُظهر تحذيراً — ولا ترمي استثناءً — عندما لا تمتلك الإضافة خطافة مطابقة للمرحلة التي سُجلت فيها، لذا تُتجاوز إضافة مخصصة للرموز فقط والتي تُمرَّر إلى `toCss` مع ملاحظة بدلاً من أن تبقى بلا تأثير بصمت.

## تركيب الإضافات

ابنِ فوق إضافة أخرى باستخدام `extendPlugin`، أو ادمج الأقران مع `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

تتألف خطافات نفس المرحلة معاً: يشغّل `tokens` القاعدة ثم الإضافة، يدمج `css` المساهمتين، ويشغّل `icons` كلاهما.

## التحقق من مخرجات الإضافة

شغّل فحوص الانحراف المشتركة من `@pantoken/utils` على مخرجات الإضافة داخل اختبارها، حتى يفشل خطأ مطبعي أو إعادة تسمية رمز بسرعة ومحلياً:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## الإضافات المجمعة

- `@pantoken/plugin-simple-icons` — علامات تجارية للأيقونات من simple-icons، مسجلة كرموز أيقونة.
- `@pantoken/plugin-lucide-lab` — أيقونات Lucide Lab، مسجلة كـ `--instui-icon-*` رموز صورة.
- `@pantoken/plugin-logos` — شعارات منتجات Instructure كـ SVGs، وبيانات URI، و `--instui-logo-*` رموز صورة.
- `@pantoken/plugin-prune-custom-props` — إضافة PostCSS (ليست إضافة pantoken) تزيل الخصائص المخصصة غير المستخدمة من ورقة الأنماط.
- `@pantoken/plugin-custom-theme-colors` — تعيد تسمية الصفحة من خلال تعيين سمة واحدة (`data-pantoken-color`) إلى إحدى 13 لوحة ألوان، أو إلى `custom` لأي لون هكس. انظر [ألوان الموضوع](#theme-colors).

يمكن تحميل سجل Lucide Lab بكسولة، ثم تمريره إلى خطافة الرموز المتزامنة:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

بعض الأشياء التي كانت سابقاً إضافات تُشحن الآن داخل `@pantoken/components`، لأن العديد من المكونات تحتاجها مباشرة: ظلال الارتفاع (`--instui-elevation-*`, في `components.css`), حلقة مخطط التركيز (في `base.css` — كل عنصر قابل للتركيز يحصل عليها عندما تملك pantoken الصفحة)، وخطوط علامة Instructure التجارية (Atkinson Hyperlegible Next: يطبّق `base.css` `--instui-font-family-base`; و `@pantoken/components/fonts.css` الاختياري يحمل ملفات woff2s لـ `@font-face`).

## ألوان السمة

يصدر `@pantoken/plugin-custom-theme-colors` كتلة `[data-pantoken-color="…"]` واحدة لكل لوحة ألوان
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). تُشير كل كتلة إلى بدائيات العلامة (`--instui-primitive-color-navy-*` و `-blue-*`)
على اللوحة المختارة. كما تعيد اشتقاق أسطح العلامة التي كان upstream قد سطاها إلى هكس حرفي، محافظةً على قيم الشفافية المُضمّنة عبر `color-mix()`. تظل ألوان الحالة الدلالية، اللمسات الزرقاء الصريحة، وظلال الارتفاع كما هي. جرّبها في
عرض التلوين القائم على العيّنات ([swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html)).

```html
<html data-pantoken-color="sea"></html>
```

### لون العلامة المخصص

اضبط `data-pantoken-color="custom"` لإعادة تسمية العلامة من أي هكس، مثل اللون الأساسي الذي يدخلَه مسؤول Canvas في محرر السمات. يستخلص pantoken مقياساً كاملاً من 10–200 `--instui-primitive-color-custom-*` من ذلك:

1. **منحنى المرجع.** هدف وضاءة كل خطوة هو متوسط وضاءة OKLCH للـ 13 لوحة عند تلك الخطوة، مع تثبيت 0 للأبيض و210 للأسود. لذا تتطابق تباعد درجات المقياس المخصص مع تباعد اللوحات المشحونة.
2. **المَرْساة.** تهبط الإدخالة على الخطوة التي تكون هدف وضائتها أقرب إلى وضاءتها الخاصة، ثم تُقفل على تلك الوضاءة بالضبط. يصبح `#cccccc` `custom-40` عند `#c9c9c9`: قريباً من الإدخال، لكن ليس
   دائماً متطابقاً. "الأقرب" تعني أقرب خطوة على المنحنى، لا أقرب لون في لوحة موجودة.
3. **الملء.** تحتفظ كل خطوة أخرى بدرجة اللون (hue) الخاصة بالإدخال. تتبع تشبعها منحنى التشبع المتوسط للوحات نسبةً إلى المَرْساة، ويُقلَّل فقط حيث يقع اللون خارج sRGB.

يُقبل فقط `#rgb` و `#rrggbb`; أي شيء آخر يرمي `TypeError`، لذا لا يمكن لهكس من نموذج أن يحقن CSS.

أثناء البناء، أخرج القاعدة بأكملها مع البدائيات المشتقة معلنة مسبقاً:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

لاختيار اللون عند وقت التشغيل دون شحن مجموعة الرموز، احسب المنحنى وقاعدة إعادة الخريطة عند وقت البناء. ثم استخدم الإدخال الخالي من التبعيات `/scale` في المتصفح، وعيّن فقط الـ 20 بدائية المشتقة:

```ts
// Build time
import {
  customColorReferenceCurve,
  customColorRemapCss,
} from "@pantoken/plugin-custom-theme-colors";

const curve = customColorReferenceCurve(); // JSON-safe
const remapCss = customColorRemapCss(); // ship alongside the palette stylesheet
```

```ts
// Browser
import { deriveScale } from "@pantoken/plugin-custom-theme-colors/scale";

const { anchorStep, steps } = deriveScale(input.value, curve);
style.textContent = `:root[data-pantoken-color="custom"] { ${[...steps]
  .map(([step, hex]) => `--instui-primitive-color-custom-custom${step}: ${hex};`)
  .join(" ")} }`;
document.documentElement.dataset.pantokenColor = "custom";
```

تعمل أداة اختيار السمة في موقع الوثائق، ومحرر سمات Canvas، والعرض التوضيحي أعلاه كلها بهذه الطريقة.

اطلع على [مرجع واجهة برمجة التطبيقات](/api/) لصادرات كل إضافة.
