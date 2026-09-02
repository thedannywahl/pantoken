# CDN & التوزيع

pantoken ينشر كل حزمة إلى npm، لذا يمكنك سحب التوكنات، المكوّنات، ومكوّنات الويب مباشرةً من CDN — بدون خطوة بناء، بدون bundler. تغطي هذه الصفحة رابط جمع CSS (مع مُنشئ تفاعلي)، بالإضافة إلى إدخالات مكوّنات الويب.

## أساس التوكن

كل مكوّن من pantoken يقرأ `--instui-*` خصائص مُخصصة من ورقة توكن على الصفحة. يتم شحن نمطين:

- `@pantoken/css/dist/style.lean.css` — الأساس الموصى به من CDN. يحمل كل التوكنات عدا مجموعة الأيقونات الكاملة، لذا حجمه حوالي 23 كيلوبايت مضغوط gzip.
- `@pantoken/css/dist/style.css` — الورقة الكاملة، بما في ذلك كل ~1,777 رمز أيقونة غليف توكن (`--instui-icon-*`). حوالي 140 كيلوبايت مضغوط gzip. حمّل هذه إذا كنت تشير إلى الأيقونات بشكل واسع عبر `var(--instui-icon-*)`.

مقياس الظلال ومتغيرات حلقة التركيز موجودان في كلتا الورقتين، لذلك تعمل الظلال وحلقة التركيز مع تحميل الأساس فقط.

## اختر مكوّناتك وأيقوناتك

يبني [منتقي CDN التفاعلي](/guide/cdn-picker) روابط التجميع jsDelivr لـ CSS ومقتطفات لحزم JavaScript. افتحه، حدّد ما تحتاجه، وانسخ النتيجة المولّدة.

- علامة التبويب **Components** — اختر ملفات أنماط مكوّن فردي أو برميل `components.css` الكامل. أضف إعادة التعيين الأساسية أو أدوات المسافة/الألوان إذا احتجت إليها.
- علامة التبويب **JS** — انسخ مقتطف استيراد ESM لـ `@pantoken/interactions`.
- علامة التبويب **Icons** — اختر أيقونات فردية من مجموعة InstUI (~1,800 أيقونة) أو من Simple Icons (~3,300 رمز علامة تجارية). يُنتج المُنتقي رابط تجميع منفصل لملفات CSS الخاصة بالأيقونات حتى تتمكن من تحميل الأيقونات التي تستخدمها فقط.
- علامة التبويب **Web Components** — ابنِ مقتطفات `@pantoken/web-components` (تسجيل انتقائي ESM أو تمهيد نصي كلاسيكي).

كل ملف مكوّن صغير — معظمها حوالي 2 كيلوبايت. المكوّن الذي يعرض أيقونات (`alert`, `checkbox`,
وقليلون آخرون) يحتاجون تلك الغليفات، لذا يضيف المُنشئ `@pantoken/components/dist/component-icons.css` (حوالي
0.5 كيلوبايت مضغوط gzip — 11 أيقونة يستخدمها مجموعة المكوّنات) كلما اخترت الورقة الخفيفة. الورقة الكاملة تحتوي عليها بالفعل.

### ترتيب التحميل والخطوط

حمّل أساس التوكن أولاً، ثم إعادة التعيين الأساسية الاختيارية، ثم ملفات المكوّنات، وأخيراً الأدوات — فهي أدوات تجاوز، لذا فهي تتجاوز في الواقع قاعدة المكوّن فقط عندما تهبط بعدها في التتابع. رابط التجميع أعلاه يرتبها بالفعل نيابةً عنك. الخطوط هي الاستثناء الوحيد:
`@pantoken/components/dist/fonts.css` تشير إلى ملفات الخطوط بمسار نسبي، لذا لا يستطيع الجمع إعادة كتابتها — حمّلها كـ `<link>` مستقل:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### كل شيء مرة واحدة

حدد **All components** في المُنتقي لتبديله إلى البرميل، أو أشر إليه بنفسك (حوالي 141 كيلوبايت
مضغوط gzip) جنبًا إلى جنب مع ورقة التوكن:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## مكوّنات الويب

`@pantoken/web-components` يسجل عناصر مخصصة `<instui-*>` خالية من إطار العمل. تُضمّن CSS الخاصة بها، لكنها لا تزال تقرأ التوكنات من ورقة على الصفحة، لذلك حمّل أساس التوكن أيضاً.

### وحدات ES (مُوصى به)

يوفر CDN ESM تبعيات الحزمة نيابةً عنك. هذا يسجّل كل عنصر:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

استخدم ورقة التوكن الكاملة (أو الورقة الخفيفة زائد `component-icons.css`) حتى تتمكن عناصر عرض الأيقونات مثل
`<instui-alert>` من حل غليفاتها.

لتسجيل بعض العناصر فقط — واعتمادياتها المتداخلة — استورد `register` ومرّر `only`:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### وسم نصي كلاسيكي

لإدخال بدون وحدات، حمّل بناء IIFE. يجمع تبعياته ويسجّل كل
عنصر تلقائياً عند التحميل، كاشفاً عن متغيّر عام `PantokenWebComponents`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

هو أكبر من مسار ESM — يُضمّن `@pantoken/components` و `@pantoken/icons` — لذا استخدمه
فقط عندما لا تستطيع استخدام الوحدات.

## تثبيت الإصدارات

الروابط أعلاه — وتلك التي يكتبها المُنتقي — تتتبع الإصدار الأخير. ثبّت إصدارًا رئيسيًا (أو دقيقًا)
للبيئة الإنتاجية — على سبيل المثال `@pantoken/css@0` — حتى لا يفاجئك ترقية.
