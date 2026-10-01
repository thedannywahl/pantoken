# الإضافات

يمد ملحق pantoken مخرجات الرموز أو CSS دون تفريع الحزمة. يتم بناؤه باستخدام `definePlugin` من `@pantoken/plugin-kit`، ثم يمرر إلى `buildTokens` أو `toCss`.

## تأليف ملحق

أعطِ `definePlugin` الخطافات التي تنفذها. يُعيد ملحقًا عاديًا، موسومًا بالقدرات المستنتجة من تلك الخطافات. يمكن للملحق توسيع IR (`tokens`, `icons`), أو مخرجات CSS (`css`), أو كليهما.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## التسجيل المستند إلى القدرات

يقوم `buildTokens` و `toCss` بتشغيل `checkPlugins` على الملحقات التي تمررها. يحذّر — لا يُطلق استثناء — عندما لا يمتلك الملحق خطافًا متطابقًا للمرحلة التي سُجل فيها، لذلك يتم تخطي ملحق خاص بالرموز فقط عندما يُمرَّر إلى `toCss` مع ملاحظة بدلاً من الصمت وعدم القيام بأي شيء.

## تركيب الملحقات

ابنِ فوق ملحق آخر باستخدام `extendPlugin`، أو ادمج الأقران باستخدام `mergePlugin`:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

تُركَّب خطافات نفس المرحلة: يقوم `tokens` بتشغيل الأساس ثم الإضافة، ويُدمج `css` الإسهامين، ويشغل `icons` كلاهما.

## تحقق من مخرجات ملحقك

شغّل فحوصات الانحراف المشتركة من `@pantoken/utils` على مخرجات ملحقك في اختباره، بحيث يفشل الخطأ الطباعي أو إعادة تسمية رمز بسرعة ومحليًا:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## الملحقات المجمعة

- `@pantoken/plugin-simple-icons` — يميّز أيقونات من simple-icons، مسجلة كرموز أيقونة.
- `@pantoken/plugin-lucide-lab` — أيقونات Lucide Lab، مسجلة كـ `--instui-icon-*` رموز صورة.
- `@pantoken/plugin-logos` — شعارات منتجات Instructure كملفات SVG، وURIs للبيانات، و `--instui-logo-*` رموز صورة.
- `@pantoken/plugin-prune-custom-props` — ملحق PostCSS (ليس ملحق pantoken) الذي يحذف الخاصيات المخصصة غير المستخدمة من ورقة الأنماط.
- `@pantoken/plugin-custom-theme-colors` — يعيد تسمية صفحة بتعيين سمة واحدة (`data-pantoken-color`) إلى إحدى 13 لوحة ألوان، أو إلى `custom` لأي هكس للعلامة التجارية. راجع [ألوان الموضوع](#theme-colors).
- `@pantoken/plugin-custom-components` — عناصر تحكم مخصصة مدعومة بالرموز بما في ذلك SegmentedControl و SkeletonLoader.

### التحكم المقطّع

استخدم التحكم المقطّع لعرضين إلى خمسة عروض أو مرشحات ذات صلة. كل خيار هو زر راديو أصلي معنون في مجموعة مسماة واحدة؛ علّم أحدها كمحدد مبدئيًا. استخدم علامات التبويب أو قائمة منسدلة إذا لم تتسع الخيارات بشكل مريح، واستخدم مجموعات الأزرار للإجراءات بدلاً من الخيارات. نمط `-size-md` هو الافتراضي، مع `-size-sm` و `-size-lg` للسياقات الأكثر إحكامًا وبروزًا.

استورد `@pantoken/plugin-custom-components/segmented-control.css` مع `@pantoken/components/icon-button.css` و `@pantoken/components/icon.css` إذا كنت تستخدم أزرار الفائض. أعطِ مجموعة الحقول `aria-label` وصفيًا أو أسطورة مرئية. تحافظ المساعدة على إعلان الراديو الأصلي، وتضيف تنقّل لوحة المفاتيح، وتكشف اختياريًا عن جزء واحد مقطوع لكل ضغطة سهم. استخدم عناصر تحكم بداية/نهاية منطقية وتسميات أزرار قابلة للوصول في كلا الاتجاهين:

```html
<fieldset class="instui-segmented-control" aria-label="Course view" data-overflown>
  <div class="segments">
    <label class="segment"><input type="radio" name="course-view" checked /> Grid</label>
    <label class="segment"><input type="radio" name="course-view" /> List</label>
  </div>
  <button
    class="overflow-start instui-icon-button -color-primary -icon-chevron-left"
    type="button"
    aria-label="Previous views"
    hidden
  ></button>
  <button
    class="overflow-end instui-icon-button -color-primary -icon-chevron-right"
    type="button"
    aria-label="Next views"
    hidden
  ></button>
</fieldset>
```

استورد `@pantoken/interactions/segmented-control.iife.js` للتسجيل عند جاهزية DOM، أو استدعِ `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` من `@pantoken/interactions` واستدعِ `cleanup()` عند إزالته. تعمل CSS وخيارات الراديو الأصلية دون JS؛ أسهم الفائض تحتاج السلوك. لا تتضمن رموز 2.1.0 ظلالًا للعناصر المحددة أو للأسهم. كلاهما يستخدم حاليًا ارتفاع الاستراحة المشترك عبر `--pantoken-segmented-selected-shadow` و `--pantoken-segmented-overflow-shadow`; استبدل تلك المتغيرات عندما تُعرف قيم التصميم الدقيقة.

### التحميل الهيكلي (Skeleton)

يُنسّق المسار الفرعي `skeleton-loader.css` شكلًا زخرفيًا من نوع Text أو Avatar أو Image. يقبل Text `-size-xxs` عبر `-size-xxl`; Avatar و Image بحجم متوسط. كل `.skeleton-row` اختياري يضيف سطر نص واحد دون تغيير الحجم. يتوقف اللمعان في CSS بعد ثلاث مرات مسح لمدة 1.5 ثانية ويظل ثابتًا عندما يفضّل المستخدم تقليل الحركة. يعمل قبل تحميل JavaScript.

ضع الأشكال فقط حيث سيظهر المحتوى المعتمد على الاستعلام، لا فوق التنقّل المعروف من الخادم أو المرشحات أو العناوين أو عناصر التحكم. الهيكل ليس مقياس تقدم أو حالة انشغال إجراء. احتفظ بالمحتوى الحالي مرئيًا أثناء التحديثات الخلفية؛ استخدم مؤشر دوران أو حالة انشغال زر للإجراءات.

تملك تطبيقات المستوى الأعلى علامات التحميل والتحميل الفارغ والخطأ. قدّم منطقة حالة فارغة واحدة لكل صفحة وتنبيه فارغ منفصل في HTML للخادم، كلاهما خارج منطقة المحتوى المنشغل:

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

استدعِ سلوك المستوى الأعلى عند تغيّر حالة الطلب. يقوم بتحديث `aria-busy` والإعلانين السابقين، لكنه لا يستبدل المحتوى أو ينقل التركيز:

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

إذا كنت تستخدم حزمة التفاعلات لكل مكوّن بدل الاستيراد المباشر، أرسل حدث `pantoken:skeleton-state` على عنصر `[data-skeleton-region]` مع `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }`. أمَهل تأخير عرض النماذج النائبة 200–500 مللي ثانية للطلبات السريعة؛ يقوم السلوك بتأخير إعلان التحميل بمقدار 400 مللي ثانية بشكل مستقل. في تحميلات الصفحة السلبية، اترك التركيز حيث كان. حرّك التركيز إلى نتيجة محمّلة جديدة فقط عندما يكون إجراء المستخدم نفسه قد طلبها. تُعلن عقدة الحالة عن النتائج والحالات الفارغة؛ تُعلن عقدة التنبيه عن الإخفاقات. لا تدمج `aria-busy` و `role="status"` و `role="alert"` على عنصر واحد.

يمكن تحميل سجل Lucide Lab بشكل كسول، ثم يمرّر إلى خطاف الرمز المتزامن:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

بعض الأشياء التي كانت ملحقات أصبحت الآن تُشحن في `@pantoken/components`، لأن العديد من المكونات تحتاجها جاهزة: ظلال الارتفاع (`--instui-elevation-*`، في `components.css`), حلقة مخطط التركيز (في `base.css` — يحصل عليها كل عنصر قابل للتركيز عندما يملك pantoken الصفحة)، وخطوط علامة Instructure التجارية (Atkinson Hyperlegible Next: يُطبّق `base.css` `--instui-font-family-base`; يقوم `@pantoken/components/fonts.css` الاختياري بتحميل woff2s الخاص بـ `@font-face`).

## ألوان الموضوع

يصدر `@pantoken/plugin-custom-theme-colors` كتلة `[data-pantoken-color="…"]` واحدة لكل لوحة ألوان (`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`, `aurora`). تُشير كل كتلة إلى بدائيات العلامة التجارية (`--instui-primitive-color-navy-*` و `-blue-*`) إلى اللوحة المختارة. كما تعيد اشتقاق أسطح العلامة التجارية التي طبخها المصدر إلى هكس حرفي، محتفظةً بألفا المخبوزة عبر `color-mix()`. تبقى ألوان الحالة الدلالية، اللهجات الزرقاء الصريحة، وظلال الارتفاع كما هي. جرّبها في
[عرض التخصيص القائم على البطاقات](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html).

```html
<html data-pantoken-color="sea"></html>
```

### لون علامة تجارية مخصّص

عيّن `data-pantoken-color="custom"` لإعادة تسمية العلامة التجارية من أي هكس، مثل اللون الأساسي الذي يكتبه مسؤول Canvas في محرر الموضوع. يستمد pantoken مقياسًا كاملاً من 10–200 `--instui-primitive-color-custom-*` منه:

1. **منحنى الإشارة.** يستهدف ضياء كل خطوة متوسط ضياء OKLCH للـ 13 لوحة في تلك الخطوة، مع تثبيت 0 عند الأبيض و210 عند الأسود. لذا تتطابق تباعد مقياس اللون المخصص مع تباعد اللوحات المشحونة.
2. **المرتكز.** تستقرّ القيمة المدخلة على الخطوة التي يكون هدف ضيائها الأقرب إلى ضيائها الخاص، ثم تُقفل على ذلك الضياء الدقيق. يصبح `#cccccc` `custom-40` عند `#c9c9c9`: قريب من المدخل، لكنه ليس دائمًا مطابقًا. "الأقرب" يعني أقرب خطوة على المنحنى، وليس أقرب لون في لوحة موجودة.
3. **الملء.** تحتفظ كل خطوة أخرى بصبغة المدخل. تتبع تشبعها منحنى التشبع المتوسط للوح كما نسبة إلى المرتكز، ويُخفَّض فقط عندما يقع اللون خارج sRGB.

يُقبل فقط `#rgb` و `#rrggbb`; أي شيء آخر يُطلق `TypeError`، لذلك لا يمكن لهكس من نموذج أن يحقن CSS.

عند وقت البناء، أصدر القاعدة كاملةً مع البدائيات المشتقة معلنة مسبقًا:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

لاختيار اللون في وقت التشغيل دون شحن مجموعة الرموز، احتسب المنحنى وقاعدة إعادة الخريطة مسبقًا أثناء البناء. ثم استخدم المدخل الخالي من الاعتماد `/scale` في المتصفح، وحدد فقط الـ 20 بدائية المشتقة:

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

تعمل أداة اختيار موضوع موقع التوثيق، ومحرر موضوع Canvas، والعرض أعلاه بهذه الطريقة.

انظر [مرجع API](/api/) لصادرات كل ملحق.
