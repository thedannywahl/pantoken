# المكونات الإضافية

يمد ملحق pantoken مخرجات الرموز أو CSS دون تفريع حزمة. تُبنى باستخدام `definePlugin` من `@pantoken/plugin-kit`، ثم تمرره إلى `buildTokens` أو `toCss`.

## تأليف ملحق

زود `definePlugin` بالخطافات التي تُنفذها. يعيد ملحقًا عاديًا، مُعلَّمًا بالإمكانات المستنتجة من تلك الخطافات. يمكن للملحق توسيع IR (`tokens`, `icons`), مخرجات CSS (`css`), أو كليهما.

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

يشغل `buildTokens` و `toCss` `checkPlugins` على الملحقات التي تمررها. يُظهر تحذيرًا — ولا يرمي استثناء — متى لم يكن للملحق خطاف مطابق للمرحلة التي تم تسجيله فيها، لذا يُتخطى ملحق يخص الرموز فقط عند تمريره إلى `toCss` مع ملاحظة بدلاً من أن يفعل شيئًا بصمت.

## تركيب الملحقات

بُنِ على رأس ملحق آخر باستخدام `extendPlugin`، أو اجمع الأقران مع `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

تتألف خطافات نفس المرحلة: يشغل `tokens` الأساس ثم الإضافة، يدمج `css` المساهمتين، ويشغل `icons` كلاهما.

## تحقق من مخرجات ملحقك

شغّل اختبارات الانحراف المشتركة من `@pantoken/utils` على مخرجات ملحقك في اختباره، بحيث يفشل خطأ إملائي أو إعادة تسمية رمز بسرعة محليًا:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## الملحقات المجمعة

- `@pantoken/plugin-simple-icons` — يعنْوِن الأيقونات من simple-icons، مسجلة كرموز أيقونة.
- `@pantoken/plugin-lucide-lab` — أيقونات Lucide Lab، مسجلة كـ `--instui-icon-*` رموز صورة.
- `@pantoken/plugin-logos` — شعارات منتجات Instructure كـ SVGs، URI بيانات، و `--instui-logo-*` رموز صورة.
- `@pantoken/plugin-prune-custom-props` — ملحق PostCSS (ليس ملحق pantoken) الذي يحذف الخصائص المخصصة غير المستخدمة من ورقة الأنماط.
- `@pantoken/plugin-custom-theme-colors` — يعيد تسمية العلامة التجارية لصفحة عن طريق ضبط سمة واحدة (`data-pantoken-color`) إلى واحدة من 13 لوحة ألوان، أو إلى `custom` لأي hex علامة تجارية. انظر [ألوان الموضوع](#theme-colors).
- `@pantoken/plugin-custom-components` — عناصر تحكم مخصصة مدعومة بالرموز بما في ذلك SegmentedControl و SkeletonLoader.

### التحكم المجزأ

استخدم التحكم المجزأ لعرضين إلى خمسة عروض أو مرشحات ذات صلة. كل خيار هو زر راديو أصلي معنون في مجموعة مسماة واحدة؛ عيّن واحدًا محددًا في البداية. استخدم علامات التبويب أو قوائم منسدلة إذا لم تتسع الخيارات بشكل مريح، واستخدم مجموعات الأزرار للإجراءات بدلاً من الاختيارات. نمط `-size-md` هو الافتراضي، مع `-size-sm` و `-size-lg` للسياقات الأضيق والأكثر بروزًا.

استورد `@pantoken/plugin-custom-components/segmented-control.css` للتحكم وأزرار الفائض الخاصة به. استخدم فئة `-icon-*` على تسمية الشريحة عندما تحتاج الشريحة إلى رمز؛ المساعد التفاعلي أيضًا يروّج فئة `-icon-*` من مدخلها الأصلي إلى ملوّن التسمية. أعط الحقل وصفًا `aria-label` وصحفة مرئية. يحافظ المساعد على إعلان الراديو الأصلي، ويضيف تنقّل عبر لوحة المفاتيح، ويكشف اختياريًا عن شريحة مقطوعة واحدة لكل ضغطة سهم. استخدم عناصر تحكم منطقية للبداية/النهاية وعلامات أزرار قابلة للوصول في كلا الاتجاهين:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="viewport">
    <button class="overflow-start" type="button" aria-label="Previous views" hidden></button>
    <div class="track">
      <label><input type="radio" name="course-view" checked /> Grid</label>
      <label><input type="radio" name="course-view" /> List</label>
    </div>
    <button class="overflow-end" type="button" aria-label="Next views" hidden></button>
  </div>
</fieldset>
```

استورد `@pantoken/interactions/segmented-control.iife.js` لتسجيل عند جاهزية DOM، أو استدعِ `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` من `@pantoken/interactions` وادعُ `cleanup()` عند إزالته. تعمل CSS وخيارات الراديو الأصلية بدون JS؛ أزرار الفائض تحتاج السلوك. يستخدم العنصر المحدد تصميم ظل بطبقتين من ألوان الظل الدلالية؛ إنه ظل عنصر نشط مميز بدلاً من مركب `--instui-elevation-*` الموجود. تستخدم أزرار الفائض رموز elevation3 الصادرة عبر `--pantoken-segmented-overflow-shadow`.

### تحميل الهيكل العظمي (Skeleton)

مسار `skeleton-loader.css` الجزئي ينسق شكلًا زخرفيًا واحدًا من Text أو Avatar أو Image. يقبل Text `-size-xxs` عبر `-size-xxl`; Avatar و Image بحجم متوسط. تضيف كل `.skeleton-row` اختياري سطر نص واحد دون تغيير الحجم. يتوقف لمعان CSS بعد ثلاث مرّات مدة كل منها 1.5 ثانية ويظل ثابتًا عند تفضيل المستخدم لتقليل الحركة. يعمل قبل تحميل JavaScript.

ضع الأشكال فقط حيث سيظهر المحتوى المعتمد على الاستعلام، وليس فوق تنقّل معروف من الخادم أو مرشحات أو عناوين أو عناصر تحكم. الهيكل العظمي ليس مقياس تقدم أو حالة انشغال عملية. اجعل المحتوى الموجود مرئيًا أثناء التحديثات في الخلفية؛ استخدم مؤشر دوران أو حالة انشغال زر للإجراءات.

التطبيق الأصل يملك علامات التحميل، المحمّلة، الفارغة، والخطأ. قدّم منطقة حالة فارغة واحدة لكل صفحة وتنبيهًا فارغًا منفصلًا في HTML الخادم، كلاهما **خارج** منطقة المحتوى المشغول:

```html
<div class="instui-skeleton-loading">
  <span class="instui-screen-reader-content" role="status" data-skeleton-status></span>
  <span class="instui-screen-reader-content" role="alert" data-skeleton-error></span>
  <section data-skeleton-region aria-busy="true">
    <div class="instui-skeleton-loader -type-text -size-md" aria-hidden="true">
      <div class="shape"></div>
      <div class="skeleton-row">
        <div class="shape"></div>
      </div>
    </div>
  </section>
</div>
```

ادعُ سلوك المستوى الأعلى عندما يتغير حالة الطلب. يقوم بتحديث `aria-busy` والإعلانين الموجودين مسبقًا، لكنه لا يستبدل المحتوى أو ينقل التركيز:

```ts
import { initSkeletonLoading } from "@pantoken/interactions";

const wrapper = document.querySelector<HTMLElement>(".instui-skeleton-loading")!;
const loading = initSkeletonLoading(wrapper.querySelector<HTMLElement>("[data-skeleton-region]")!, {
  status: wrapper.querySelector<HTMLElement>("[data-skeleton-status]")!,
  error: wrapper.querySelector<HTMLElement>("[data-skeleton-error]")!,
});

loading.setLoading("Loading courses"); // announces after 400ms, unless loading finishes first
loading.setLoaded("24 courses"); // swap in the real content separately
// For an empty result, use setEmpty("No courses found"); for failure, setError("Couldn't load courses. Retry").
loading.cleanup(); // when the owning region is removed
```

إذا كنت تستخدم حزمة التفاعلات لكل مكوّن بدل الاستيراد المباشر، أرسل حدث `pantoken:skeleton-state` على عنصر `[data-skeleton-region]` مع `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. أجّل _إظهار_ العناصر النائبة بمقدار 200–500ms للطلبات السريعة؛ السلوك يؤخر إعلان التحميل بمقدار 400ms مستقلًا. في التحميلات السلبية للصفحة، اترك التركيز حيث هو. حرّك التركيز إلى نتيجة محمّلة حديثًا فقط عندما طلب المستخدم ذلك بنفسه. تعلن عقدة الحالة عن النتائج والحالات الفارغة؛ تعلن عقدة التنبيه عن الإخفاقات. لا تدمج `aria-busy`, `role="status"`, و `role="alert"` على عنصر واحد.

يمكن تحميل سجل Lucide Lab كسِيل كسول، ثم يمرَّر إلى خطاف الرموز المتزامن:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

بعض الأشياء التي كانت تُوزَّع سابقًا كملاحق أصبحت الآن تُشحن في `@pantoken/components`، لأن العديد من المكونات تحتاجها بشكل افتراضي: ظلال الارتفاع (`--instui-elevation-*`, في `components.css`), حلقة حد التركيز (في `base.css` — كل عنصر قابل للتركيز يحصل عليها عندما تمتلك pantoken الصفحة)، وخطوط علامة Instructure التجارية (Atkinson Hyperlegible Next: يُطبّق `base.css` `--instui-font-family-base`; التحميل الاختياري `@pantoken/components/fonts.css` يحمل `@font-face` woff2s).

## ألوان الموضوع

يصدِر `@pantoken/plugin-custom-theme-colors` كتلة `[data-pantoken-color="…"]` واحدة لكل لوحة ألوان
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). تشير كل كتلة إلى بدائيات العلامة التجارية (`--instui-primitive-color-navy-*` و `-blue-*`)
على اللوحة المختارة. كما تعيد استنتاج الأسطح العلامة التجارية التي سلخها المصدر الأعلى إلى hex حرفي،
محافظةً على ألفا المطبخة عبر `color-mix()`. تبقى ألوان الحالة الدلالية، اللمسات الزرقاء الصريحة، وظلال الارتفاع كما هي. جرّبها في عرض التهيئة القائم على البِتْش [swatch-based theming demo](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### لون علامة تجارية مخصص

اضبط `data-pantoken-color="custom"` لإعادة تسمية العلامة التجارية من أي hex، مثل اللون الأساسي الذي يكتبه مسؤول Canvas في محرر السمات. يستخرج pantoken مقياسًا كاملاً من 10–200 `--instui-primitive-color-custom-*` منه:

1. **منحنى المرجع.** هدف درجة الإضاءة لكل خطوة هو متوسط درجة إضاءة OKLCH لِـ13 لوحة الألوان عند تلك الخطوة، مع تثبيت 0 عند الأبيض و210 عند الأسود. لذا مسافات المقياس المخصص تتطابق مع مسافات اللوحات المشحونة.
2. **المرساة.** يستقر الإدخال على الخطوة التي تكون درجة الإضاءة الهدف لها الأقرب لدرجته الخاصة، ثم يثبت إلى تلك الدرجة بالضبط. يصبح `#cccccc` `custom-40` عند `#c9c9c9`: قريبًا من الإدخال، لكن ليس دائمًا مطابقًا. "الأقرب" تعني أقرب خطوة على المنحنى، وليس أقرب لون موجود.
3. **الملء.** تحتفظ كل خطوة أخرى بصبغة الإدخال. تتبع تشبعها منحنى متوسط تشبع اللوحات نسبةً إلى المرساة، ويُقلَّل فقط حيث يقع لون خارج sRGB.

يُقبل فقط `#rgb` و `#rrggbb`; أي شيء آخر يرمي `TypeError`, لذا لا يمكن أن يحقن هكس من نموذج CSS.

أثناء وقت البناء، صدِر القاعدة بأكملها مع البدائيات المستنتَجة معلنة بالفعل:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

لاختيار اللون في وقت التشغيل بدون شحن مجموعة الرموز، احسب المنحنى وقاعدة إعادة الخريطة في وقت البناء. ثم استخدم المدخل الخالي من الاعتماد `/scale` في المتصفح، واضبط فقط 20 بدائيًا مشتقًا:

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

تعمل أداة اختيار السمات في موقع الوثائق، ومحرر سمات Canvas، والعرض التجريبي أعلاه بهذه الطريقة.

اطلع على [مرجع API](/api/) لصادرات كل ملحق.
