# مكونات

`@pantoken/components` يوزع أنماط المكونات القائمة على الأصناف المبنية من رموز Instructure. استورد ورقة الأنماط ووضع الوسوم على علامتك — لا حاجة لإطار عمل.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> تفضّل العناصر المخصصة؟ `@pantoken/web-components` يغلف هذه الأنماط نفسها كـ `<instui-button>`,
> `<instui-alert>`, `<instui-badge>`, `<instui-avatar>`, `<instui-progress>`, والمزيد — انظر
> [خريطة الحزم](/guide/packages).

## الاتفاقيات

تستند اتفاقيات CSS في هذه الحزمة إلى نسخة معدلة من [RSCSS](https://ricostacruz.com/rscss/index.html).

المعدلات هي **مفتاح-قيمة** — `-<prop>-<val>`, متوافقة مع أسماء خصائص InstUI — لذلك تقرأ بنفسها: `-color-secondary`, `-size-sm`, `-shape-circle`, `-icon-plus`. الخصائص المنطقية هي اسم الخاصية فقط، حيث يدل وجودها على `true` (`-has-shadow`, `-clickable`); الخاصية المنطقية ذات القيمة الافتراضية المفعلَة عند إطفائها تعكسها (`-without-background`, `-without-border`). الأحجام تقبل كل من الصيغ القصيرة والطويلة (`-size-sm` = `-size-small`). عندما ينحرف اسم عن InstUI، يظل الصف ذو الدلالة InstUI يعمل لكنه مُهمل (مثال `-variant-info` → استخدم `-color-info`).

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

لخاصية `timeout` في InstUI، اضبط الخاصية المخصصة خالية الوحدة `--timeout` بالمللي ثانية وحمّل تفاعل Alert. القيمة الموجبة تحدد جدول الإزالة؛ `0` (الافتراضي) يترك التنبيه في مكانه. أضف فئات `instui-transition -fade-entered` من أداة `transition` لتأثير التلاشي في InstUI؛ اتركها للحذف الفوري. التفاعل يدير حالة `-fade-exiting` ويطلق حدثًا قابلًا للإلغاء ومتدفقًا `dismiss` قبل الإزالة، لذا يمكن للتطبيق استدعاء `preventDefault()` للإبقاء على التنبيه مركبًا.

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

تقبل قضبان التقدّم مقاييس عشوائية عبر `--min` (`0` افتراضيًا)، `--value`، و`--max`
(`100` افتراضيًا)، مع الأسماء المُلغاة `--value-now` و`--value-max`. أضف `-should-animate`
لتطبيق انتقال نصف ثانية من InstUI عند تغيير القيمة. `.value` يقف جنبًا إلى جنب مع `.bar` كطفل للجذر؛ أضف `-render-value-inside` لعرضه فوق المسار، محاذيًا لبدايته،
بدلاً من ذلك (نَمّقه لقراءته على لون المقياس). استخدم `<progress>` أصليًا لنطاق يبدأ من صفر و`<meter>` عندما يكون الحد الأدنى غير صفري؛ تختار مكونات الويب بينهما تلقائيًا من السمة `min`. لا يملك InstUI حالة غير محددة، لذلك `<progress>`
التي تفتقد السمة `value` هي تخمين خاص بـ pantoken: `progress-bar` تحرك `.bar` كجزء منزلق و`progress-circle` يدور حلقته بقوس ثابت، كلاهما يخفي `.value`.

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

تقبل دوائر التقدّم نفس المقاييس العشوائية عبر `--min`, `--value`, و`--max`.
تظل `--value-now` و `--value-max` كأسماء وظيفية مُهملة. أضف `-should-animate` وحمّل حزمة التفاعل المركّز لإعادة إنشاء حركة التركيب في InstUI؛ `--animation-delay` هو
تأخير خالٍ من الوحدة بالمللي ثانية. تظل صيغ `-should-animate-on-mount` و
`-shold-animate-on-mount` المهملة كأسماء وظيفية.

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

## بادئة الأصناف

كل صنف مُسجل باسم مساحة اسم `instui-` افتراضيًا. ابنِ ورقة أنماط ببادئتك الخاصة — أو بدون بادئة — عن طريق تمرير `prefix` لأي مُنشئ. أي قيمة زائفة (`null`, `undefined`, `""`, أو حذفها) تزيل البادئة بالكامل، لذا يمكنك تأليف `class="heading -level-h1"` بدلاً من `class="instui-heading -level-h1"`:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

تظل المعدلات ذات الشرطتين المسبوقتين بشرطة (`.-color-secondary`, `.-level-h1`) دون تغيير إما. أوراق الأنماط الموزعة مع الحزمة تحتفظ ببادئة `instui`.

## الأساس

`base.css` هو إعادة ضبط اختيارية تضبط الافتراضات العالمية للمستند من الرموز: `box-sizing`, إعادة ضبط `body`, سطح الصفحة، لون النص الأساسي والخط، `color-scheme` (حتى تتبع رموز `light-dark()` والضوابط الأصلية السمة)، ورابط أساسي. حمّله مرة واحدة، قبل أوراق المكونات والمقالات، عندما يكون pantoken هو صاحب الصفحة.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

تجنّبه عند تضمين المكونات داخل مضيف يقوم بالفعل بتهيئة `html` و `body` — إعادة التعيين تلوّن سطح الصفحة، لذا لا تريدها أن تتعارض مع المضيف. كل ما تضبطه يستخدم محددات `:where()` منخفضة التحديد، لذلك قواعدك الخاصة دائمًا تفوز.

`base.css` يُطبّق_ خط العلامة (`font-family: var(--instui-font-family-base)`, مع بدائل نظامية)؛ لتحميله، استورد `fonts.css` الاختياري — قواعد `@font-face` لخط Atkinson Hyperlegible
Next، مشيرة إلى ملفات woff2 الموزعة في الحزمة. هي منفصلة لأن الواجهات بحجم ~350 كيلوبايت واستضافة الخطوط بنفسك قرار متعمَّد.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## محتوى قارئ الشاشة

<p>هناك رسالة مخفية بعد هذه الجملة.<span class="instui-screen-reader-content">قراءة شاشة فقط تعلن هذا.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` يخفي عنصرًا بصريًا مع الإبقاء عليه في شجرة الوصول — للعناوين ونصوص الحالة التي يجب أن تقرأها التكنولوجيا المساعدة لكن التصميم لا يظهرها.

## الأدوات المساعدة

`utilities.css` هو طبقة اختيارية من الفئات العابرة: بدائية `View`، تباعد على مقياس الرموز، وتجاوزات لونية دلالية. على عكس فئات `-modifier` للمكون، تستخدم هذه **شرطة مزدوجة** (`--mod`) لذا لا تتصادم أبدًا مع أسماء معدِّلات المكونات، وتطبّق على أي عنصر — عاريًا أو مركبًا على مكون.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">سطح accent-blue مع نص على اللون.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">مركزي باستخدام mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` هو `View` في InstUI. إنه الأساس الذي تبني عليه التباعد واللون، ويحمل معدِّلات مفتاح-قيمة لخصائصه البصرية حتى لا تضطر لاستخدام الأدوات المساعدة:
`-background-*` (أسطحه)، `-border-radius-{small,medium,large,circle,pill}`,
`-border-width-{small,medium,large}` + `-border-color-*`, `-shadow-{resting,above,topmost}`,
`-display-*`, `-position-*`, `-overflow-x-*`/`-overflow-y-*`, و `-cursor-*` — هذه هي معدِّلات الشرط الواحد الخاصة بـ `view`، غير المتعلقة بالأدوات المزدوجة أدناه. خصائص القيمة الحرة
(العرض/الارتفاع/الحشوة) تبقى أنماطًا داخلية؛ `margin`/`padding` تستخدم أدوات التباعد.

**التباعد** — فئات لكل جانب على مقياس التباعد. اقرأها كـ `{m|p}{side}-{step}`: `m` للهوامش أو `p` للحشوة (أو الكلمات الكاملة `margin`/`padding`), جانب منطقي اختياري، ثم خطوة. لذا `.--m-lg` و `.--margin-lg` متساويتان، وكذلك `.--pt-md` و `.--paddingt-md`.

- الجوانب: none (الكل)، `t`/`b` (بداية/نهاية الكتلة)، `s`/`e` (بداية/نهاية السطر)، `x`/`y` (محور السطر/الكتلة). الجوانب المنطقية تبقى صحيحة في تخطيطات من اليمين إلى اليسار.
- الخطوات: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, بالإضافة إلى `auto` للهوامش فقط.

ركّبها لاختصار `margin="small auto large"` في InstUI:
`class="--mt-sm --mx-auto --mb-lg"`.

**اللون** — تجاوزات دلالية تبقى ضمن اللوحة: `.--bg-<name>` (الخلفية),
`.--text-<name>` (لون النص)، و `.--border-<name>` (لون الحد). كل `<name>` هو
رمز لوني دلالي — النوايا (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`,
`inverse`, `on-color`, `strong`, …) بالإضافة إلى لوحة `accent-*` (`accent-blue`, `accent-green`, وهكذا). الاسم موجود فقط إذا كان الرمز موجودًا في تلك العائلة، لذلك `text-brand` ليست فئة — النص لا يملك رمز علامة تجارية. لا توجد طريقة للوصول إلى بدائي أو هيكس عشوائي، وكل تجاوز يتبع السمة.

**عائلات الرموز** — كل عائلة "رمز واحد، خاصية واحدة" تحصل على صنف لكل رمز، مسمًى باسم الرمز. ركبها بحرية:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (و `-depth1`…`-card`) → `box-shadow`

كل منها يضبط خاصيته الوحيدة، لذا `border-width`/`border-radius` تحتاجان إلى لون `border-*` ونمط حد فعلي للرسم. هذه تستخدم اسم الرمز الكامل (`.--border-radius-md`), بينما مساعدو اللون والتباعد أعلاه يستخدمون الأسماء المختصرة (`.--bg-brand`, `.--mt-lg`) — الأسماء المختصرة هي اختصارات مريحة؛ فئات الرموز حرفية وشاملة.

**التخطيط** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`,
`none`) و `.--text-align-<value>` (`start`, `center`, `end`, `justify`) تغطي خصائص `display` و `textAlign` العابرة في InstUI (View, Button, Metric, Tabs, …) كفئات قابلة للتركيب —
لذلك هذه ليست معدِّلات لكل مكون.

كل فئة بشرطتين تفوز في التتابع حتمًا على معدِّل مكوّن أحادي الشرط بنفس الاسم، بغض النظر عن ترتيب استيراد أوراق الأنماط — انظر [اتفاقيات التأليف](/conventions/authoring)
لآلية ذلك.

كل شيء هنا مدفوع بـ CSS نقية بواسطة رموز `--instui-*`، لذا يتتبع InstUI عبر طبقة الرموز. راجع [مرجع API](/api/) لـ `componentsCss` ومنشئي كل مكون.

## الطبقات العلوية: الحوار والمنبّه

تستخدم مكونات الطبقات العلوية بدائل النظام الأصلية، لذا تتصرف بإمكانيات وصول جيدة مع قليل من JavaScript أو بدونه.

**مودال** — ضع `.instui-modal` على `<dialog>` أصلي. يمنحها حبس التركيز، `Esc` للإغلاق، و
`::backdrop` مجانًا؛ الخلفية تُعتِم بنفس رمز `--instui-component-mask-background-color`
كما `.instui-mask` (أضف `-blur` لتجميده). افتحه وأغلقه بأوامر المستدعي — لا سكربت:

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

**عرض السياق / popover** — ضع `.instui-context-view` على عنصر `[popover]` وبدّله بـ
`popovertarget`. يركب الطبقة العليا ويُغلق بالنقر الخارجي أو `Esc`، مرة أخرى بدون سكربت:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**تخطيط الدرج** — ضع `.instui-drawer-layout` على جذع التخطيط مع أطفال `.tray` و `.content`.
أضف السمة `open` (أو `-open`) لكشف الدرج، واستخدم `placement="end"`
(أو `-placement-end`) لتثبيته على الجانب النهائي الخطي — يتم حل الموضع عبر خصائص منطقية `inset-inline-*`/`flex-direction`، لذلك ينعكس تلقائيًا تحت `dir="rtl"` بدون قواعد إضافية. تضيف حزمة التفاعل المركّز توجيه أوامر Invoker وتبدّل وضع الطبقة العلوية
(`should-overlay-tray`) عندما يتجاوز العرض `--drawer-layout-min-width` (الافتراضي
`--instui-breakpoints-sm`, ثم `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**قناع** — `.instui-mask` يبقى للطبقات داخل التدفق (مؤشر تحميل فوق بطاقة)؛ `::backdrop` الخاص بالمودال يغطي الحالة المودال.

كلا النمطين ملفوفان أيضًا كعناصر مخصصة سلوكية في `@pantoken/web-components`:
`<instui-modal open>` (وهو `<dialog>` تقوده سمة `open`) و `<instui-context-view>` (popover أصلي).

دعم المتصفحات: واجهة popover و `popovertarget` هما Baseline 2024؛ أوامر المستدعي
(`command`/`commandfor`) هي Baseline 2025، لذا في المتصفحات الأقدم اربط الأزرار إلى `dialog.showModal()`
كحل بديل بسطر واحد. وضع popover بجانب المُشغّل يستخدم تحديد المرساة CSS حيثما يدعمه (Chromium)؛ وإلا فإنه يتمركز في الطبقة العليا.

## النماذج

**حقل النموذج** — `.instui-form-field` هو غلاف CSS-Grid يضع تسمية، عنصر التحكم، وأي
رسائل. ضعه على `<label>` حتى ترتبط التسمية بعنصر التحكم أصليًا. له ثلاث مناطق شبكة — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (افتراضي) يكدّس المناطق؛ `-layout-inline` يضع التسمية بجانب عنصر التحكم (اضبط
بـ `-label-align-{start,end}` و `-v-align-{top,middle,bottom}`). يُعيد `-readonly` تلوين التسمية.

الـ **نجمة المطلوبة** تظهر عندما يكون الحقل مطلوبًا بواسطة _إما_ فئة `-required` _أو_ عنصر
تحكم أصلي `required` بداخله — لذا يمكنك ببساطة ضبط `required` على الإدخال وتظهر العلامة.
هي زخرفية (عنصر `::after` على التسمية، خارج شجرة الوصول)؛ اقترنها بملاحظة مثل
"الحقول الموسومة بـ * مطلوبة" ما لم يكن النموذج واضحًا بذاته.

**مجموعة حقول النموذج** — `.instui-form-field-group` تجمع الحقول ذات الصلة في `<fieldset>` مع وصف `<legend>`. هي تخطيط بحت (بدون رموز مخصصة): التكديس الافتراضي للحقل؛ `-layout-columns` / `-layout-inline` تسيلها إلى أعمدة استجابة، مع `-row-spacing-*` /
`-col-spacing-*` و `-v-align-*` لضبط الشبكة.

**مجموعة مدخلات الراديو** — `.instui-radio-input-group` هو نفس التجميع `<fieldset>`/`<legend>`,
متخصص للراديوهات. لأن الراديوهات الفرعية تشارك `name`، فالاختيار أصليًا اختيار واحد —
لذا مجموعة أزرار التبديل تتصرف كعنصر تحكم واحد، وليس أزرارًا منفصلة. `-variant-simple` (الافتراضي) يضع
الراديوهات القياسية (`-layout-columns`/`-inline` تسيلها في صف)؛ `-variant-toggle` يربط
أزرار `.instui-radio.-variant-toggle` الفرعية في تحكم مجزأ واحد (حدود مُدمجة، نهايات دائرية):

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

**الرسائل** — `.instui-form-field-messages` هو الحاوية؛ كل `.instui-form-field-message` يأخذ `-type-*`: `-type-hint` (رمادي، افتراضي)، `-type-error` (نص أحمر + رمز دائرة-تحذير)، `-type-success`
(نص أخضر + رمز دائرة-صح)، و `-type-screenreader-only` (مقصوص بصريًا، ما يزال يُعلن).
الرموز تلوّن في `currentColor`، لذا دائمًا تتطابق مع لون الرسالة. `-type-new-error` هو
اسم مُغلق لـ `-type-error`. اربط الحاوية بالعنصر التحكم باستخدام `aria-describedby`, وضع
`aria-invalid` على عنصر التحكم عند وجود خطأ.

داخل FormField، رسالة `-type-error` تلي التحقق من صحة من جهة العميل: تظل مخفية حتى يصبح
عنصر التحكم `:user-invalid` (أصليًا، بعد تفاعل المستخدم) — أو تجبرها باستخدام `-invalid`
على `.instui-form-field` (لحالة خطأ من جهة الخادم). `.instui-form-field-messages` مستقل (ليس في
حقل) غير متأثر. حلقة التركيز لعنصر التحكم تتبع وفقًا لذلك: خطر عند `:user-invalid`/`-invalid`,
نجاح عند `-success`.

**عناصر التحكم النصية** — `.instui-text-input` (أصلية `<input>`), `.instui-text-area` (أصلية `<textarea>`,
قابلة لتغيير الحجم)، و `.instui-simple-select` (أصلية `<select>` مع مؤشر) تشترك في مظهر واحد ونفس
الحالات: `-invalid` (حد خطأ)، `-success` (حد نجاح), `-readonly`, الأصلية `:disabled`, و
`-size-{sm,md,lg}`. لأيقونة بادئة/متابعة (خصائص InstUI `renderBeforeInput`/`renderAfterInput`), غلف
الإدخال بـ `.instui-input-group` وأضف فتحة `.before`/`.after` (رمز `-icon-*`); `-should-not-wrap`
تحافظ عليه في سطر واحد. `.instui-number-input` هو الواجهة تلك زائد عمود عدّاد +/- `.arrows` (أصلي
`type="number"`; اربط الأزرار إلى `stepUp()`/`stepDown()`). `.instui-range-input` هو `input[type="range"]` مصمّم تُعرض قيمته في فقاعة معكوسة `.instui-range-input-value`. لقائمة منسّقة غنية مع popover صندوق قائمة، استخدم `@instructure/ui` — هذه المكتبة تغطي الضوابط الأصلية.

**قائمة اختيار مصممة (تجريبي)** — `select.css` اختياري يرقّي نفس عنصر `.instui-simple-select`: ينسّق قائمة الفتح (لوحة وكل خيار، مع حالات_hover و المحدد) باستخدام نموذج Select القابل للتخصيص عبر CSS.

> [!WARNING]
> `select.css` يعتمد على `appearance: base-select` / `::picker(select)`, وهما **تجريبيان**
> (Chrome 135+، غير مدعومان بالكامل بعد). يتم شحنهما كورقة أنماط اختيارية وكل قاعدة مُرابطة بواسطة `@supports (appearance: base-select)`, لذلك لا تفعل شيئًا في المتصفحات غير الداعمة — أداة `.instui-simple-select` تبقى مجرد select أصلي بسيط. حمّلها فقط إذا كنت تريد القائمة المحسّنة وتقبل الدعم المحدود.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
