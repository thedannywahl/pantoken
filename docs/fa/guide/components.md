# کامپوننت‌ها

`@pantoken/components` استایل‌های کامپوننت مبتنی بر کلاس را ساخته‌شده از توکن‌های Instructure ارائه می‌دهد. stylesheet را وارد کنید و مارک‌آپ خود را تگ بزنید — هیچ فریم‌ورکی لازم نیست.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> عناصر سفارشی را ترجیح می‌دهید؟ `@pantoken/web-components` همین استایل‌ها را به‌صورت `<instui-button>`، `<instui-alert>`، `<instui-badge>`، `<instui-avatar>`، `<instui-progress>` و بیشتر بسته‌بندی می‌کند — رجوع کنید به [نقشهٔ بسته](/api/).

## قراردادها

قواعد CSS در این بسته بر پایهٔ نسخهٔ تعدیل‌شده‌ای از [RSCSS](https://ricostacruz.com/rscss/index.html) هستند.

مودیفایرها به‌صورت **کلید-مقدار** هستند — `-<prop>-<val>`، هم‌راستا با نام‌های prop در InstUI — بنابراین خودشان معنی را می‌رسانند: `-color-secondary`، `-size-sm`، `-shape-circle`، `-icon-plus`. پراپ‌های بولی فقط نام پراپ هستند و وجودشان به‌معنای `true` (`-has-shadow`، `-clickable`) است؛ یک بولی که به‌صورت پیش‌فرض روشن است و خاموش شود وارونه می‌شود (`-without-background`، `-without-border`). اندازه‌ها هر دو نوشتار کوتاه و بلند را می‌پذیرند (`-size-sm` = `-size-small`). هرگاه یک نام از InstUI منحرف شود، کلاس معنایی InstUI هنوز کار می‌کند ولیDeprecated است (مثلاً `-variant-info` → از `-color-info` استفاده کنید).

### مثال

کامپوننت React از Instructure UI:

```jsx
<Alert variant="success" transition="fade" hasShadow renderCustomIcon={megaphone}>
  This is the alert content.
</Alert>
```

کامپوننت‌های pantoken:

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

برای پراپ `timeout` در InstUI، مقدار unitless `--timeout` را به‌صورت خاصیت سفارشی میلی‌ثانیه‌ای تنظیم کنید و تعامل Alert را بارگذاری کنید. مقدار مثبت زمان‌بندی بستن را تعیین می‌کند؛ `0` (پیش‌فرض) هشدار را در محل نگه می‌دارد. کلاس‌های `instui-transition -fade-entered` از utility `transition` را برای افکت fade InstUI اضافه کنید؛ برای حذف فوری آن‌ها را حذف کنید. تعامل وضعیت `-fade-exiting` را پیش می‌برد و قبل از حذف یک رویداد قابل‌لغو و حبابی `dismiss` را شلیک می‌کند، بنابراین یک اپلیکیشن می‌تواند `preventDefault()` را فراخوانی کند تا هشدار را نگه دارد.

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

نوارهای پیشرفت مقیاس‌های دلخواه را از طریق `--min` (پیش‌فرض `0`), `--value`، و `--max` (پیش‌فرض `100`) می‌پذیرند، با الیاس‌های منسوخ `--value-now` و `--value-max`. افزودن `-should-animate` انتقال نیم‌ثانیه‌ای InstUI را هرگاه مقدار تغییر کند اعمال می‌کند. `.value` در کنار `.bar` به‌عنوان فرزند روت قرار می‌گیرد؛ افزودن `-render-value-inside` آن را به‌جای قرار روی ترک، روی آن رندر می‌کند و به ابتدای آن تراز می‌کند (برای خوانایی در برابر رنگ متر آن را استایل دهید). از یک `<progress>` بومی برای بازهٔ صفر‌مبنای native استفاده کنید و زمانی که minimum غیرصفر است از `<meter>` استفاده کنید؛ وب‌کامپوننت‌ها بین آن‌ها از روی صفت `min` انتخاب می‌کنند. InstUI حالت indeterminate ندارد، بنابراین یک `<progress>` که صفت `value` را ندارد حدسِ pantoken است: `progress-bar` `.bar` را به‌صورت یک قطعهٔ لغزنده انیمیت می‌کند و `progress-circle` حلقه‌اش را با یک قوس ثابت می‌چرخاند، هر دو `.value` را پنهان می‌کنند.

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

دایره‌های پیشرفت همان مقیاس‌های دلخواه را از طریق `--min`، `--value` و `--max` می‌پذیرند. `--value-now` و `--value-max` همچنان به‌عنوان الیاس‌های عملکردی منسوخ باقی مانده‌اند. افزودن `-should-animate` و بارگذاری بستهٔ تعامل focused، انیمیشن mount InstUI را بازتولید می‌کند؛ `--animation-delay` تأخیری بدون واحد به میلی‌ثانیه است. نگارش‌های منسوخ `-should-animate-on-mount` و `-shold-animate-on-mount` همچنان به‌صورت الیاس‌های عملکردی عمل می‌کنند.

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

## پیشوند کلاس

هر کلاس به‌طور پیش‌فرض با فضای نام `instui-` نام‌گذاری می‌شود. یک stylesheet با پیشوند دلخواه خود بسازید — یا بدون پیشوند — با ارسال `prefix` به هر builder. هر مقدار falsy (`null`، `undefined`، `""`، یا حذف آن) پیشوند را کاملاً حذف می‌کند، بنابراین می‌توانید `class="heading -level-h1"` به‌جای `class="instui-heading -level-h1"` بنویسید:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

مودیفایرهای dash‌-پیش‌رو (`.-color-secondary`, `.-level-h1`) در هر صورت بدون تغییر باقی می‌مانند. stylesheetهایی که بسته عرضه می‌کند پیشوند `instui` را نگه می‌دارند.

## پایه

`base.css` یک reset انتخابی است که تنظیمات پیش‌فرض سند را از توکن‌ها اعمال می‌کند: `box-sizing`، یک reset `body`، سطح صفحه، رنگ متن پایه و فونت، `color-scheme` (تا توکن‌ها و کنترل‌های بومی با تم همگام شوند)، و یک لینک پایه. آن را یک‌بار بارگذاری کنید، پیش از شیت‌های کامپوننت و پروز، وقتی pantoken مالک صفحه است.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

وقتی کامپوننت‌ها را درون میزبانی جاسازی می‌کنید که خودش `html` و `body` را تم می‌کند آن را رد کنید — reset سطح صفحه را رنگ می‌کند، پس نمی‌خواهید با میزبان در تنازع باشد. همهٔ چیزهایی که تنظیم می‌کند از سلکتورهای کم‌اهمیت `:where()` استفاده می‌کنند، بنابراین قوانین خودتان همیشه برنده می‌شوند.

`base.css` فونت برند را _اعمال_ می‌کند (`font-family: var(--instui-font-family-base)`، با جایگزین‌های سیستمی)؛ برای _بارگذاری_ آن، `fonts.css` انتخابی را وارد کنید — قواعد `@font-face` برای Atkinson Hyperlegible Next، اشاره به woff2های بسته را دارند. جداست چون فونت‌ها حدود 350 کیلوبایت هستند و میزبانی خودِ فونت‌ها یک انتخاب آگاهانه است.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## محتوای خوانندهٔ صفحه‌خوان (Screen reader)

<p>پیامی پنهان بعد از این جمله هست.<span class="instui-screen-reader-content">فقط صفحه‌خوان‌ها این را اعلان می‌کنند.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` عنصری را از دید پنهان می‌کند در حالی که آن را در درخت دسترسی‌پذیری نگه می‌دارد — برای برچسب‌ها و متن‌های وضعیت که تکنولوژی کمکی باید بخواند اما طراحی نباید نشان دهد.

## ابزارک‌ها (Utilities)

`utilities.css` لایهٔ انتخابی از کلاس‌های فرامرزی است: یک ابتدایی `View`، فاصله‌بندی روی مقیاس توکن، و بازنویسی‌های رنگ معنایی. بر خلاف کلاس‌های `-modifier` ویژهٔ کامپوننت‌ها، این‌ها از **دو خط تیره** (`--mod`) استفاده می‌کنند تا هرگز با نام‌های مودیفایر یک کامپوننت برخورد نکنند، و به هر عنصر — خالص یا ترکیب‌شده روی یک کامپوننت — اعمال می‌شوند.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">سطح accent-blue با متن on-color.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">وسط‌چین با mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` معادل `View` در InstUI است. این پایه‌ای است که روی آن فاصله و رنگ لایه‌بندی می‌کنید، و مودیفایرهای کلید-مقدار برای پراپ‌های بصری خودش را حمل می‌کند تا نیازی به استفاده از ابزارک‌ها نداشته باشید: `-background-*` (سطوح آن)، `-border-radius-{small,medium,large,circle,pill}`، `-border-width-{small,medium,large}` + `-border-color-*`، `-shadow-{resting,above,topmost}`، `-display-*`، `-position-*`، `-overflow-x-*`/`-overflow-y-*`، و `-cursor-*` — این‌ها مودیفایرهای تک‌خطهٔ خود `view` هستند، مستقل از ابزارک‌های دو‌خطی زیر. پراپ‌های دارای مقدار آزاد (عرض/ارتفاع/فاصله) به صورت inline style می‌مانند؛ `margin`/`padding` از ابزارک‌های فاصله استفاده می‌کنند.

**فاصله‌بندی** — کلاس‌های هر طرف روی مقیاس فاصله. آن‌ها را به‌صورت `{m|p}{side}-{step}` بخوانید: `m` برای margin یا `p` برای padding (یا واژه‌های کامل `margin`/`padding`), یک سمت منطقی اختیاری، سپس یک گام. پس `.--m-lg` و `.--margin-lg` یکسانند، همان‌طور که `.--pt-md` و `.--paddingt-md` یکسانند.

- سمت‌ها: none (همه)، `t`/`b` (شروع/پایان بلاک)، `s`/`e` (شروع/پایان درون‌خطی)، `x`/`y` (محور درون‌خطی/بلاک). سمت‌های منطقی در چیدمان راست‌به‌چپ نیز درست باقی می‌مانند.
- گام‌ها: `0`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, به‌علاوه `auto` که فقط برای margin است.

آن‌ها را برای shorthand `margin="small auto large"` InstUI ترکیب کنید: `class="--mt-sm --mx-auto --mb-lg"`.

**رنگ** — بازنویسی‌های معنایی که روی پالت می‌مانند: `.--bg-<name>` (پس‌زمینه)، `.--text-<name>` (رنگ متن)، و `.--border-<name>` (رنگ حاشیه). هر `<name>` یک توکن رنگ معنایی است — منظورها (`base`, `brand`, `muted`, `success`, `warning`, `error`, `info`, `inverse`, `on-color`, `strong`, …) به‌علاوه پالت `accent-*` (`accent-blue`, `accent-green`, و غیره). نام فقط زمانی وجود دارد که توکن در آن خانواده موجود باشد، بنابراین `text-brand` یک کلاس نیست — متن توکن برند ندارد. راهی برای رسیدن به یک primitive یا هگز دلخواه وجود ندارد، و هر بازنویسی از تم پیروی می‌کند.

**خانوادهٔ توکن‌ها** — هر خانواده‌ای که یک توکن یک خواص را نمایندگی می‌کند یک کلاس به ازای هر توکن دارد، نام‌گذاری شده پس از توکن. آن‌ها را آزادانه ترکیب کنید:

- `.--font-family-heading`, `.--font-family-code`, … → `font-family`
- `.--font-weight-body-strong`, `.--font-weight-interactive`, … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`, `.--border-radius-full`, … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`, `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (و `-depth1`…`-card`) → `box-shadow`

هر کدام تنها خواص خود را تنظیم می‌کنند، بنابراین `border-width`/`border-radius` به یک رنگ `border-*` و یک سبک حاشیه نیاز دارند تا واقعاً حاشیه کشیده شود. این‌ها از نام کامل توکن (`.--border-radius-md`) استفاده می‌کنند، در حالی که helperهای رنگ و فاصلهٔ بالا از الیاس‌های کوتاه (`.--bg-brand`, `.--mt-lg`) استفاده می‌کنند — الیاس‌ها میانبرهای ارگونومیک هستند؛ کلاس‌های توکن لغوی و جامع‌اند.

**طرح‌بندی (Layout)** — `.--display-<value>` (`block`, `inline-block`, `inline`, `flex`, `inline-flex`, `none`) و `.--text-align-<value>` (`start`, `center`, `end`, `justify`) خواص فرامرزی `display` و `textAlign` را برای InstUI پوشش می‌دهند (View, Button, Metric, Tabs, …) به‌صورت کلاس‌های قابل ترکیب — پس آن‌ها مودیفایرهای اختصاصی هر کامپوننت نیستند.

هر کلاس دو‌خطی بر شیب‌بندی بر یک مودیفایر تک‌خطه با همان نام غلبهٔ قطعی دارد، صرف‌نظر از ترتیب وارد کردن stylesheet — مکانیزم را در [قراردادهای نویسندگی](/conventions/authoring) ببینید.

همهٔ اینجا صرفاً CSS است که از توکن‌های `--instui-*` تغذیه می‌کند، پس از طریق لایهٔ توکن با InstUI همگام می‌ماند. برای `componentsCss` و سازندگان هر‌کامپوننت به [مرجع API](/api/) مراجعه کنید.

## پوشش‌ها: دیالوگ و پاپ‌اور

کامپوننت‌های overlay از ابتدایی‌های پلتفرم بومی استفاده می‌کنند، بنابراین با کمی یا بدون JavaScript رفتار دسترس‌پذیری دارند.

**Modal** — `.instui-modal` را روی یک `<dialog>` بومی قرار دهید. آن به‌طور خودکار focus trap، بستن با `Esc` و یک `::backdrop` را می‌گیرد؛ بک‌دراپ با همان توکن `--instui-component-mask-background-color` که `.instui-mask` استفاده می‌کند کم‌رنگ می‌شود (برای یخ‌زدگی از `-blur` اضافه کنید). با invoker commands باز و بسته کنید — نیازی به اسکریپت نیست:

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

**Context view / popover** — `.instui-context-view` را روی یک عنصر `[popover]` قرار دهید و با `popovertarget` آن را جابه‌جا کنید. در لایهٔ بالا قرار می‌گیرد و با کلیک بیرونی یا `Esc` به‌صورت light-dismiss بسته می‌شود، باز هم بدون اسکریپت:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**Drawer layout** — `.instui-drawer-layout` را روی یک روت لایه با فرزندان `.tray` و `.content` قرار دهید. صفت `open` (یا `-open`) را برای آشکارسازی سینی اضافه کنید، و از `placement="end"` (یا `-placement-end`) برای مستقر کردن آن در سمت inline-end استفاده کنید — جای‌گذاری از طریق خواص منطقی `inset-inline-*`/`flex-direction` حل می‌شود، بنابراین تحت `dir="rtl"` به‌طور خودکار برمی‌گردد بدون قواعد اضافی. بستهٔ تعامل focused مسیردهی فرمان Invoker را اضافه می‌کند و حالت overlay را (`should-overlay-tray`) وقتی عرض از `--drawer-layout-min-width` عبور کند جابه‌جا می‌کند (پیش‌فرض `--instui-breakpoints-sm`، سپس `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**Mask** — `.instui-mask` برای overlayهای در‌جریان (مثلاً یک spinner روی یک کارت) استفاده می‌شود؛ `::backdrop` یک modal حالتِ پوشش را پوشش می‌دهد.

هر دو الگو همچنین به‌صورت عناصر سفارشی رفتاری در `@pantoken/web-components` بسته‌بندی شده‌اند: `<instui-modal open>` (یک `<dialog>` که توسط صفت `open` رانده می‌شود) و `<instui-context-view>` (یک پاپ‌اور بومی).

پشتیبانی مرورگر: API پاپ‌اور و `popovertarget` در Baseline 2024 هستند؛ فرمان‌های invoker (`command`/`commandfor`) در Baseline 2025 قرار دارند، پس در مرورگرهای قدیمی‌تر دکمه‌ها را به `dialog.showModal()` وصل کنید به‌عنوان یک fallback یک‌خطه. موقعیت‌یابی پاپ‌اور کنار ماشه‌اش از موقعیت‌یابی anchor در CSS استفاده می‌کند در جاهایی که پشتیبانی شود (Chromium); در سایر نقاط در لایهٔ بالا مرکز می‌شود.

## فرم‌ها

**FormField** — `.instui-form-field` یک wrapper CSS-Grid است که یک label، کنترل و هر پیام را چیدمان می‌دهد. آن را روی یک `<label>` قرار دهید تا label به‌صورت بومی با کنترلش مرتبط شود. این سه ناحیهٔ گرید دارد — `label`, `controls`, `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (پیش‌فرض) نواحی را روی هم قرار می‌دهد؛ `-layout-inline` label را کنار کنترل می‌گذارد (با `-label-align-{start,end}` و `-v-align-{top,middle,bottom}` تنظیم کنید). `-readonly` رنگ label را تغییر می‌دهد.

ستارهٔ **الزامی** وقتی ظاهر می‌شود که فیلد توسط _یا_ کلاس `-required` یا یک کنترل بومی `required` درون آن لازم شده باشد — بنابراین می‌توانید فقط `required` را روی ورودی بگذارید و علامت نمایش یابد. این تزئینی است (یک `::after` روی label، خارج از درخت دسترسی)؛ آن را با یادداشتی مانند "فیلدهای علامت‌دار \* ضروری‌اند" جفت کنید مگر این‌که فرم خودش واضح باشد.

**FormFieldGroup** — `.instui-form-field-group` فیلدهای مرتبط را در یک `<fieldset>` با یک توضیح `<legend>` گروه‌بندی می‌کند. این صرفاً چیدمان است (توکن اختصاصی ندارد): پیش‌فرض فیلدها را روی هم قرار می‌دهد؛ `-layout-columns`/`-layout-inline` آن‌ها را به ستون‌های پاسخگو جریان می‌دهد، با `-row-spacing-*`/`-col-spacing-*` و `-v-align-*` برای تنظیم گرید.

**RadioInputGroup** — `.instui-radio-input-group` همان گروه‌بندی `<fieldset>`/`<legend>` است، ویژهٔ رادیوها. چون رادیوهای فرزند یک `name` را به‌اشتراک می‌گذارند، انتخاب به‌طور بومی تک‌انتخابی است — بنابراین مجموعه‌ای از دکمه‌های toggle به‌عنوان یک کنترل رفتار می‌کنند، نه دکمه‌های جدا. `-variant-simple` (پیش‌فرض) رادیوهای استاندارد را چیدمان می‌کند (`-layout-columns`/`-inline` آن‌ها را به ردیف می‌چینند); `-variant-toggle` دکمه‌های فرزند `.instui-radio.-variant-toggle` را به یک کنترل segmented واحد وصل می‌کند (حاشیه‌های جمع‌شده، انتهای بیرونی گرد):

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

**Messages** — `.instui-form-field-messages` کانتینر است؛ هر `.instui-form-field-message` یک `-type-*` می‌گیرد: `-type-hint` (طوسی، پیش‌فرض)، `-type-error` (متن قرمز + یک گلیف هشدار دایره‌ای)، `-type-success` (متن سبز + یک گلیف تیک دایره‌ای)، و `-type-screenreader-only` (برش‌خوردهٔ بصری، اما هنوز اعلان می‌شود). گلیف‌ها در `currentColor` رنگ می‌گیرند، پس همیشه با رنگ پیام همسان‌اند. `-type-new-error` یک الیاس منسوخ از `-type-error` است. کانتینر را با `aria-describedby` به کنترل وصل کنید، و هنگام وجود خطا `aria-invalid` را روی کنترل تنظیم کنید.

درون یک FormField، یک پیام `-type-error` پس از اعتبارسنجی سمت مشتری ظاهر می‌شود: تا زمانی که کنترل فیلد `:user-invalid` (بومی، پس از تعامل کاربر) نباشد پنهان می‌ماند — یا با قرار دادن `-invalid` روی `.instui-form-field` آن را مجبور کنید (برای خطای سمت سرور). یک `.instui-form-field-messages` مستقل (نه در یک فیلد) تحت تأثیر قرار نمی‌گیرد. حلقهٔ فوکوس کنترل نیز مطابق است: خطر هنگام `:user-invalid`/`-invalid`، موفقیت روی `-success`.

**کنترل‌های متنی** — `.instui-text-input` (بومی `<input>`), `.instui-text-area` (بومی `<textarea>`, قابل تغییر اندازه)، و `.instui-simple-select` (بومی `<select>` با caret) ظاهر یکسان و همان حالات را دارند: `-invalid` (حاشیهٔ خطا)، `-success` (حاشیهٔ موفقیت)، `-readonly`, `:disabled` بومی، و `-size-{sm,md,lg}`. برای آیکون پیش/پس‌رو (InstUI's `renderBeforeInput`/`renderAfterInput`), ورودی را در `.instui-input-group` بپیچید و یک اسلات `.before`/`.after` اضافه کنید (یک گلیف `-icon-*`); `-should-not-wrap` آن را در یک خط نگه می‌دارد. `.instui-number-input` آن نما به‌اضافهٔ یک ستون spinner +/- `.arrows` است (بومی `type="number"`; دکمه‌ها را به `stepUp()`/`stepDown()` وصل کنید). `.instui-range-input` یک `input[type="range"]` استایل‌شده است که مقدارش در یک حباب معکوس `.instui-range-input-value` رندر می‌شود. برای یک combobox غنی با یک پاپ‌اور لیست‌باکس، به `@instructure/ui` مراجعه کنید — این کتابخانه کنترل‌های بومی را پوشش می‌دهد.

**Select استایل‌شده (آزمایشی)** — یک `select.css` انتخابی همان عنصر `.instui-simple-select` را ارتقا می‌دهد: پانل باز و هر گزینه را با حالت hover و selected با مدل CSS Customizable Select استایل می‌کند.

> [!WARNING]
> `select.css` به `appearance: base-select` / `::picker(select)` تکیه دارد، که **آزمایشی** است (Chrome 135+، هنوز Baseline نشده). این به‌عنوان یک شیت انتخابی جدا عرضه می‌شود و هر قانون پشت `@supports (appearance: base-select)` قرار دارد، بنابراین در مرورگرهای پشتیبانی‌نشده هیچ کاری انجام نمی‌دهد — کنترل `.instui-simple-select` فقط همان select بومی ساده باقی می‌ماند. فقط اگر نسخهٔ بهبود‌یافتهٔ dropdown را می‌خواهید و از پشتیبانی محدود آن رضایت دارید آن را بارگذاری کنید.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
