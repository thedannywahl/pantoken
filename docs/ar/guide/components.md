# المكونات

`@pantoken/components` يوزع أنماط مكونات مبنية على الفئات مشتقة من توكنات Instructure. استورد
ورقة الأنماط ووضع الوسوم في علامتك — لا حاجة لإطار عمل.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> تفضل العناصر المخصصة؟ `@pantoken/web-components` يغلف نفس هذه الأنماط كـ `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, والمزيد — راجع
> [خريطة الحزمة](/api/).

## الاتفاقيات

اتفاقيات CSS في هذه الحزمة مبنية على نسخة معدلة من [RSCSS](https://ricostacruz.com/rscss/index.html).

المعدِّلات هي **مفتاح-قيمة** — `-<prop>-<val>`، متوافقة مع أسماء خصائص InstUI — لذلك تقرأ
بحسب معناها: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. الخصائص البوليانية هي اسم الخاصية فقط،
وحضورها يعني `true` (`-has-shadow`, `-clickable`); الخاصية البوليانية الافتراضية-مفعلة عند إيقافها
تنعكس (`-without-background`, `-without-border`). الأحجام تقبل كلتا الصيغتين القصيرة والطويلة
(`-size-sm` = `-size-small`). عندما ينحرف اسم عن InstUI، تبقى فئة InstUI-الدلالية تعمل
لكنه مهجور (مثال `-variant-info` → استخدم `-color-info`).

### مثال

مكون React من Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

مكونات pantoken:

```html
<!-- direct instui props -->
<div
  class="instui-alert -variant-success instui-transition -fade-entered -has-shadow -render-custom-icon-megaphone"
>
  This is the alert content.
</div>

<!-- normalized color/icon props -->
<div
  class="instui-alert -color-success instui-transition -fade-entered -has-shadow -icon-megaphone"
>
  This is the alert content.
</div>
```

لخاصية `timeout` في InstUI، اضبط الخاصية المخصصة بلا وحدة `--timeout` بالمللي ثانية وحمِّل
تفاعل Alert. قيمة موجبة تحدد جدولة الإخفاء؛ `0` (الإعداد الافتراضي) يترك التنبيه في
المكان. أضف فئات `instui-transition -fade-entered` لـ `transition` المساعدة لفعل التلاشي في InstUI؛ استبعد
هذه الفئات للإزالة الفورية. يدير التفاعل حالة `-fade-exiting` ويطلق حدث `dismiss` قابل للإلغاء ومتدفق قبل الإزالة، بحيث يمكن للتطبيق استدعاء `preventDefault()` لإبقاء
التنبيه مركباً.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/utilities.css"
/>
<div
  class="instui-alert -color-info instui-transition -fade-entered"
  style="--timeout: 5000"
  role="alert"
>
  This alert dismisses after five seconds.
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/alert.iife.js"></script>
```

شريط التقدم يقبل مقاييس عشوائية عبر `--min` (افتراضيًا `0`), `--value`, و `--max`
(افتراضيًا `100`), مع الأسماء المستعارة المهجورة `--value-now` و `--value-max`. أضف `-should-animate`
لتطبيق انتقال نصف ثانية في InstUI كلما تغيرت قيمة. `.value` يجلس إلى جانب `.bar` ك
طفل للجذر؛ أضف `-render-value-inside` لعرضه فوق المسار ومحاذاته إلى بدايته بدلًا من ذلك
(نسقه لتكون القراءة واضحة مقابل لون المقياس). استخدم `<progress>` أصلي لنطاق يبدأ من صفر و `<meter>` عندما لا يكون الحد الأدنى صفراً؛ عناصر الويب تختار بينهما
تلقائيًا من السمة `min`. InstUI ليس لديها حالة غير محددة، لذا فإن `<progress>`
التي تفتقد سمة `value` هي تخمين مخصص من pantoken: `progress-bar` يحرك `.bar` ك
مقطع منزلق و `progress-circle` يدور حلقته بزاوية ثابتة، وكلاهما يخفي `.value`.

```html
<label>
  Uploading Document:
  <progress
    class="instui-progress -color-brand -should-animate"
    style="--value: 40; --max: 60"
    value="40"
    max="60"
  >
    40 of 60
  </progress>
</label>
```

دوائر التقدم تقبل نفس المقاييس العشوائية عبر `--min`, `--value`, و `--max`.
`--value-now` و `--value-max` تظلان أسماء مستعارة وظيفية مهجورة. أضف `-should-animate`
وحمِّل حزمة التفاعل المركزة لإعادة إنتاج رسوم تركيب InstUI؛ `--animation-delay` هو
تأخير بلا وحدة بالمللي ثانية. الهجاءات `-should-animate-on-mount` و
`-shold-animate-on-mount` تظل أسماء مستعارة وظيفية.

```html
<label for="upload-progress">Uploading Document</label>
<progress
  id="upload-progress"
  class="instui-progress-circle -should-animate"
  style="--value: 40; --max: 60; --animation-delay: 500"
  value="40"
  max="60"
>
  40 of 60
</progress>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/progress-circle.iife.js"></script>
```

## بادئة الفئة

كل فئة تكون مُسماة النطاق `instui-` افتراضيًا. ابنِ ورقة أنماط ببادئتك الخاصة — أو بدون — عن طريق
تمرير `prefix` لأي مُنشئ. أي قيمة خاطئة (`null`, `undefined`, `""`, أو حذفه) تزيل
البادئة تمامًا، لذلك يمكنك تأليف `class="heading -level-h1"` بدلًا من `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

المعدِّلات المسبوقة بالشرطة (-) (`.-color-secondary`, `.-level-h1`) لا تتغير في أي حال. قواعد الأنماط
الموزعة مع الحزمة تحتفظ بالبادئة `instui`.

## الأساس

`base.css` هو إعادة تعيين اختيارية تضبط الافتراضات العامة للمستند من التوكنات: `box-sizing`, إعادة تعيين `body`,
سطح الصفحة، لون النص الأساسي والخط، `color-scheme` (حتى `light-dark()` التوكنات
وعناصر التحكم الأصلية تتبع السمة)، ورابط أساسي. حمِّله مرة واحدة، قبل أوراق مكونات ونصوص المحتوى،
عندما تكون pantoken هي التي تملك الصفحة.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

تجنَّبه عند تضمين المكونات في مضيف يقوم بالفعل بتطبيق `html` و `body` —
إعادة التعيين تصبغ سطح الصفحة، لذا لا تريدها أن تتعارض مع المضيف. كل ما تضبطه يستخدم
محددات منخفضة الأسبقيّة `:where()`، لذلك قواعدك الخاصة تفوز دائمًا.

`base.css` _تطبق_ خط العلامة التجارية (`font-family: var(--instui-font-family-base)`, مع بدائل نظامية)؛ لتحميله، استورد `fonts.css` الاختياري — `@font-face` قواعد لخط Atkinson Hyperlegible
Next، مشيرة إلى ملفات woff2 المرفقة في الحزمة. هي منفصلة لأن الواجهات حوالي ~350 كيلوبايت و
استضافة الخطوط محليًا هو خيار واعٍ.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## محتوى قارئ الشاشة

<p>هناك رسالة مخفية بعد هذه الجملة.<span class="instui-screen-reader-content">فقط قارئات الشاشة تعلن هذا.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` يخفي عنصرًا بصريًا مع إبقائه في شجرة إمكانية الوصول
— للاسماء ونصوص الحالة التي يجب على تقنيات المساعدة قراءتها لكن التصميم لا يعرضها.

## الأدوات المساعدة

`utilities.css` هو طبقة اختيارية من فئات شاملة: بدائية `View`, تباعد على مقياس التوكن،
وتجاوزات لونية دلالية. على خلاف فئات مكونات `-modifier`, هذه تستخدم **شرطة مزدوجة**
(`--mod`) حتى لا تتصادم مع أسماء معدِّلات المكون ذات الشطب الواحد، وتطبق على أي
عنصر — عاريًا، أو مُركبًا على مكون.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">سطح بلون accent-blue مع نص على اللون.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">مُوسَّط مع mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` هو `View` في InstUI. إنه الأساس الذي تُطبَق عليه التباعدات واللون، ويحمل معدِّلات مفتاح-قيمة لخصائصه البصرية بحيث لا تحتاج للجوء إلى الأدوات المساعدة:
`-background-*` (سطوحه), `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, و `-cursor-*` — هذه هي معدِّلات الشطب-الواحد الخاصة بـ `view`,
غير مرتبطة بأدوات الشطب المزدوجة أدناه. الخاصيات ذات القيمة الحرة
(العرض/الارتفاع/الموضع) تبقى أنماطاً داخلية؛ `margin`/`padding` تستخدم أدوات التباعد.

**التباعد** — فئات لكل جانب على مقياس التباعد. اقْرَأها كـ `{m|p}{side}-{step}`: `m` للهوامش أو `p` للتعبئة (أو الكلمات الكاملة `margin`/`padding`), جانب منطقي اختياري، ثم خطوة. لذا `.--m-lg` و `.--margin-lg` متساويتان، كما `.--pt-md` و `.--paddingt-md`.

- الجوانب: none (الكل), `t`/`b` (بداية/نهاية الكتلة), `s`/`e` (بداية/نهاية السطر), `x`/`y` (محور السطر/الكتلة). الجوانب المنطقية تبقى صحيحة في تخطيطات من اليمين إلى اليسار.
- الخطوات: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, بالإضافة إلى `auto` للهوامش فقط.

ركِّبها لاختصار `margin="small auto large"` في InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**اللون** — تجاوزات دلالية تبقى ضمن لوحة الألوان: `.--bg-<name>` (خلفية),
`.--text-<name>` (لون النص), و `.--border-<name>` (لون الحد). كل `<name>` هو
توكن لون دلالي — النوايا (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) بالإضافة إلى لوحة `accent-*` (`accent-blue`, `accent-green`, وهكذا). الاسم موجود فقط إذا وُجد التوكن في تلك العائلة، لذا `text-brand` ليست فئة — النص ليس له توكن علامة تجارية. لا توجد طريقة للوصول إلى بدائيات أو هكس عشوائي، وكل تجاوز يتبع السمة.

**عائلات التوكن** — كل عائلة "توكن واحد، خاصية واحدة" تحصل على فئة لكل توكن، مسماة باسم التوكن. اُركِّبها بحرية:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (و `-depth1`…`-card`) → `box-shadow`

كل واحدة تضبط فقط الخاصية الواحدة، لذا `border-width`/`border-radius` تحتاجان إلى لون `border-*` ونمط حد فعلي لرسم حد. هذه تستخدم الاسم الكامل للتوكن (`.--border-radius-md`), بينما مساعدو اللون والتباعد أعلاه يستخدمون ألقابًا قصيرة (`.--bg-brand`, `.--mt-lg`) — الألقاب اختصارات عملية؛ فئات التوكن حرفية وشاملة.

**التخطيط** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) و `.--text-align-<value>` (`start`, `center`, `end`, `justify`) تغطي خصائص `display` و `textAlign` العابرة عبر InstUI (View, Button, Metric, Tabs, …) كفئات مركبة —
إذن هذه ليست معدِّلات لكل مكون.

كل فئة الشطب-المزدوج تفوز في الانحدار حتميًا على معدِّل مكوّن بنفس الاسم ذي الشطب-الواحد، بغض النظر عن ترتيب استيراد أوراق الأنماط — راجع [اتفاقيات التأليف](/conventions/authoring)
لآلية ذلك.

كل شيء هنا مُدار بواسطة CSS النقي المدفوع بتوكنات `--instui-*`, لذا يتتبع InstUI عبر طبقة التوكن. راجع [مرجع API](/api/) لـ `componentsCss` وبناة كل مكوّن.

## الواجهات: الحوار والمنبثق

مكونات الواجهة تستخدم بدائيات المنصة الأصلية، لذا تتصرف بشكل وصولي مع قليل أو بدون
جافاسكريبت.

**النافذة المنبثقة (Modal)** — ضع `.instui-modal` على `<dialog>` أصلي. تحصل على حجز التركيز، إغلاق `Esc`، و
`::backdrop` مجانًا؛ خلفية التعتيم تُظلم بنفس توكن `--instui-component-mask-background-color`
كما `.instui-mask` (أضف `-blur` لتجميدها). افتحها وأغلقها بأوامر المستدعِي — لا حاجة لسكريبت:

```html
<button class="instui-button" command="show-modal" commandfor="dlg">Open</button>
<dialog id="dlg" class="instui-modal">
  <div class="header">Title</div>
  <div class="body">…</div>
  <div class="footer">
    <button class="instui-button" command="close" commandfor="dlg">Close</button>
  </div>
</dialog>
```

**عرض السياق / popover** — ضع `.instui-context-view` على عنصر `[popover]` وقم بتبديله باستخدام
`popovertarget`. يركب الطبقة العلوية ويُغلق باللمس الخارجي أو `Esc`، مرة أخرى بدون سكريبت:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**تخطيط الدرج (Drawer layout)** — ضع `.instui-drawer-layout` على جذر التخطيط مع أطفال `.tray` و `.content`.
أضف السمة `open` (أو `-open`) لكشف الصينية، واستخدم `placement="end"`
(أو `-placement-end`) لإرسائها إلى جانب النهاية الخطية — يتم حل المكان عبر خصائص منطقية
`inset-inline-*`/`flex-direction`، لذا تنعكس تلقائيًا تحت `dir="rtl"` بدون
قواعد إضافية. حزمة التفاعل المركزة تضيف توجيه أوامر المستدعِي وتبدل وضع الواجهة
(`should-overlay-tray`) عندما يعبر العرض `--drawer-layout-min-width` (الافتراضي
`--instui-breakpoints-sm`, ثم `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**الستارة (Mask)** — `.instui-mask` تبقى للحالات داخل التدفق (مؤشر تحميل فوق بطاقة)؛ `::backdrop`
للحالة النموذجية.

كلا النمطين ملفوفان أيضًا كعناصر مخصصة سلوكية في `@pantoken/web-components`:
`<instui-modal open>` (مُدار بواسطة `<dialog>` عبر سمة `open`) و `<instui-context-view>` (popover أصلي).

دعم المتصفحات: واجهة popover و `popovertarget` هما Baseline 2024؛ أوامر المستدعِي
(`command`/`commandfor`) هي Baseline 2025، لذا في المتصفحات الأقدم اربط الأزرار بـ `dialog.showModal()`
كحل من سطر واحد. موضعة popover بجانب المشغل تستخدم موضع المرساة CSS حيثما يدعم (Chromium)؛ في غيرها تُوسّط في الطبقة العلوية.

## النماذج

**حقل النموذج (FormField)** — `.instui-form-field` هو غلاف CSS-Grid يرصّ تسلسل الوسم، عنصر التحكم، وأي
رسائل. ضعه على `<label>` حتى يرتبط الوسم بعنصر التحكم أصليًا. له ثلاث مناطق شبكة —
`label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (الافتراضي) يكدس المناطق؛ `-layout-inline` يضع الوسم بجانب عنصر التحكم (اضبط
بـ `-label-align-{start,end}` و `-v-align-{top,middle,bottom}`). `-readonly` يلون الوسم.

الـ **نجمة المطلوبة** تظهر عندما يكون الحقل مطلوبًا بواسطة _إما_ فئة `-required` _أو_ عنصر
`required` أصلي داخلها — لذا يمكنك فقط ضبط `required` على الإدخال وتُعرض العلامة.
هي زخرفية (عنصر `::after` على الوسم، خارج شجرة الوصول)؛ اقترنها بملاحظة مثل
"الحقول الموسومة \* مطلوبة" ما لم يكن النموذج واضحًا بذاته.

**مجموعة حقول النموذج (FormFieldGroup)** — `.instui-form-field-group` يجمع الحقول ذات الصلة في `<fieldset>` مع وصف `<legend>`.
هي تخطيط بحت (بدون توكنات مخصصة): التكديس الافتراضي للمجالات;
`-layout-columns` / `-layout-inline` تصفيها إلى أعمدة استجابة، مع `-row-spacing-*` /
`-col-spacing-*` و `-v-align-*` لضبط الشبكة.

**مجموعة إدخال الراديو (RadioInputGroup)** — `.instui-radio-input-group` هي نفس مجموعة `<fieldset>`/`<legend>`,
مكرَّسة للراديوهات. لأن الراديوهات الفرعية تشترك في `name`, الاختيار ناتج أصليًا بأنه اختيار واحد —
لذا مجموعة أزرار التبديل تتصرف كعنصر تحكم واحد، ليست أزرارًا متفرقة. `-variant-simple` (الافتراضي) يرصّ
الراديوهات القياسية (`-layout-columns`/`-inline` تصفيها إلى صف)؛ `-variant-toggle` يربط
أزرار `.instui-radio.-variant-toggle` الفرعية في تحكم مجزأ واحد (حدود متلاصقة،
نهايات مدورة):

```html
<fieldset class="instui-radio-input-group -variant-toggle">
  <legend>T-shirt size</legend>
  <label class="instui-radio -variant-toggle"
    ><input type="radio" name="size" checked /> Small</label
  >
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Medium</label>
  <label class="instui-radio -variant-toggle"><input type="radio" name="size" /> Large</label>
</fieldset>
```

**الرسائل** — `.instui-form-field-messages` هو الحاوية؛ كل `.instui-form-field-message` يأخذ
`-type-*`: `-type-hint` (رمادي، افتراضي), `-type-error` (نص أحمر + رمز دائرة-إنذار), `-type-success`
(نص أخضر + رمز دائرة-صح), و `-type-screenreader-only` (مقتطع بصريًا، لا يزال معلنًا).
الرموز تُطلى بـ `currentColor`, لذا دائمًا ما تطابق لون الرسالة. `-type-new-error` هو
لقب مهجور لـ `-type-error`. اربط الحاوية بالعنصر عبر `aria-describedby`, وضع
`aria-invalid` على العنصر عندما يكون هناك خطأ.

داخل FormField، رسالة `-type-error` تتبع التحقق من جانب العميل: تبقى مخفية حتى
يصبح عنصر التحكم `:user-invalid` (أصلي، بعد تفاعل المستخدم) — أو تجبرها باستخدام `-invalid`
على `.instui-form-field` (لحالة خطأ من الخادم). `.instui-form-field-messages` مستقلة (ليست داخل
حقل) غير متأثرة. حلقة تركيز العنصر تتبع نفس القاعدة: خطر عند `:user-invalid`/`-invalid`,
نجاح عند `-success`.

**عناصر النص** — `.instui-text-input` (أصلي `<input>`), `.instui-text-area` (أصلي `<textarea>`,
قابل لتغيير الحجم), و `.instui-simple-select` (أصلي `<select>` مع مؤشر) تتشارك مظهر واحد ونفس
الحالات: `-invalid` (حد الخطأ), `-success` (حد النجاح), `-readonly`, أصلي `:disabled`, و
`-size-{sm,md,lg}`. لرمز بادئ/لاحق (InstUI's `renderBeforeInput`/`renderAfterInput`), لف
الإدخال في `.instui-input-group` وأضف فتحة `.before`/`.after` (رمز `-icon-*`); `-should-not-wrap`
يحافظ عليها في سطر واحد. `.instui-number-input` هو الواجهة تلك زائد عمود أزرار زيادة/نقصان `.arrows` (أصلي
`type="number"`; اربط الأزرار بـ `stepUp()`/`stepDown()`). `.instui-range-input` هو
`input[type="range"]` منسق القيمة تُعرض في فقاعة عكسية `.instui-range-input-value`. للحصول على كومبوكس غني مع popover قائمة عناصر،
استخدم `@instructure/ui` — هذه المكتبة تغطي عناصر التحكم الأصلية.

**قائمة اختيار منسقة (تجريبية)** — `select.css` اختياري يرقّي نفس
عنصر `.instui-simple-select`: ينسق القائمة المفتوحة (لوحة الخيارات وكل خيار، مع حالات التمرير والمحدد).

> [!WARNING]
> `select.css` يعتمد على `appearance: base-select` / `::picker(select)`, وهو **تجريبي**
> (Chrome 135+، ليس بعد Baseline). يُوزع كصحيفة اختيارية منفصلة وكل قاعدة محمية
> وراء `@supports (appearance: base-select)`, لذا لا تفعل شيئًا في المتصفحات غير المدعومة — عنصر `.instui-simple-select` يبقى مجرد السِلك الأصلي.
> حمِّله فقط إذا أردت القائمة المحسنة وتقبل الدعم المحدود.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
