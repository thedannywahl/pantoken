# اجزاء

`@pantoken/components` سبک‌های کامپوننت مبتنی بر کلاس را که از توکن‌های Instructure ساخته شده‌اند عرضه می‌کند. شیت‌استایل را وارد کنید و مارک‌آپ خود را تگ بزنید — هیچ چارچوبی لازم نیست.

```ts
import "@pantoken/components/components.css";
```

> [!NOTE]
> عناصر سفارشی را ترجیح می‌دهید؟ `@pantoken/web-components` همین سبک‌ها را به عنوان `<instui-button>`، `<instui-alert>`، `<instui-badge>`، `<instui-avatar>`، `<instui-progress>` و غیره بسته‌بندی می‌کند — ببینید [نقشه بسته‌ها](/guide/packages).

## قراردادها

قواعد CSS در این بسته بر پایه نسخه‌ای اصلاح‌شده از [RSCSS](https://ricostacruz.com/rscss/index.html) هستند.

مودیفایرها به صورت **کلید-مقدار** هستند — `-<prop>-<val>`، همراستا با نام‌های پراپ InstUI — بنابراین خودخوان‌اند: `-color-secondary`، `-size-sm`، `-shape-circle`، `-icon-plus`. پراپ‌های بولی فقط نام پراپ هستند، حضورشان به معنی `true` (`-has-shadow`، `-clickable`); یک بولی که به طور پیش‌فرض روشن است و خاموش می‌شود معکوس می‌شود (`-without-background`، `-without-border`). اندازه‌ها هر دو نگارش کوتاه و بلند را می‌پذیرند (`-size-sm` = `-size-small`). هرگاه یک نام از InstUI منحرف شود، کلاس معنایی InstUI همچنان کار می‌کند اما منسوخ است (مثلاً `-variant-info` → استفاده کنید `-color-info`).

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

برای پراپ `timeout` در InstUI، خاصیت سفارشی بدون واحد `--timeout` را بر حسب میلی‌ثانیه تنظیم کنید و تعامل Alert را بارگذاری کنید. مقدار مثبت زمان‌بندیِ بستن را برنامه‌ریزی می‌کند؛ `0` (پیش‌فرض) هشدار را در محل نگه می‌دارد. کلاس‌های `instui-transition -fade-entered` از ابزارک `transition` را برای محو شدن InstUI اضافه کنید؛ آن‌ها را برای حذف فوری حذف کنید. تعامل وضعیت `-fade-exiting` را هدایت می‌کند و پیش از حذف یک رویداد قابل‌لغو و حباب‌شونده `dismiss` را شلیک می‌کند، بنابراین یک برنامه می‌تواند `preventDefault()` را فراخوانی کند تا هشدار را نگه دارد.

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

نوارهای پیشرفت مقیاس‌های دلخواه را از طریق `--min` (`0` به‌طور پیش‌فرض)، `--value`، و `--max` (`100` به‌طور پیش‌فرض) می‌پذیرند، با نام‌های مستعمل `--value-now` و `--value-max`. افزودن `-should-animate` باعث اعمال انتقال نیم ثانیه‌ای InstUI هنگام تغییر مقدار می‌شود. `.value` در کنار `.bar` به عنوان فرزند ریشه قرار می‌گیرد؛ اضافه کردن `-render-value-inside` آن را روی ترک رندر می‌کند و به جای آن به ابتدای آن تراز می‌کند (برای خوانایی در برابر رنگ متر آن را استایل دهید). برای بازه صفر‌مبنا از `<progress>` بومی استفاده کنید و هنگامی که مینیمم غیرصفر است `<meter>` را، اجزای وب بین آن‌ها را به طور خودکار از صفت `min` انتخاب می‌کنند. InstUI حالت نامعین ندارد، بنابراین یک `<progress>` که صفت `value` را ندارد یک حدس بهترینِ pantoken است: `progress-bar` `.bar` را به صورت یک قطعه کشویی انیمیت می‌کند و `progress-circle` حلقه‌اش را با یک قوس ثابت می‌چرخاند، هر دو `.value` را پنهان می‌کنند.

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

دایره‌های پیشرفت همان مقیاس‌های دلخواه را از طریق `--min`، `--value` و `--max` می‌پذیرند. `--value-now` و `--value-max` همچنان به عنوان نام‌های تابعی منسوخ باقی می‌مانند. افزودن `-should-animate` و بارگذاری بسته تعامل متمرکز برای بازتولید انیمیشن mountِ InstUI؛ `--animation-delay` تأخیر بدون واحد بر حسب میلی‌ثانیه است. نگارش‌های منسوخ `-should-animate-on-mount` و `-shold-animate-on-mount` همچنان نام‌های تابعی هستند.

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

هر کلاس به صورت پیش‌فرض با فضای نام `instui-` نامگذاری می‌شود. یک شیت‌استایل با پیشوند دلخواه — یا بدون پیشوند — بسازید با ارسال `prefix` به هر بیلدر. هر مقدار falsy ( `null`، `undefined`، `""`، یا حذف آن) پیشوند را به طور کامل حذف می‌کند، بنابراین می‌توانید `class="heading -level-h1"` را به جای `class="instui-heading -level-h1"` بنویسید:

```ts
import { componentsCss } from "@pantoken/components";

componentsCss({ prefix: "ui" }); // .ui-button
componentsCss({ prefix: null }); // .button, .alert — no prefix
```

مودیفایرهای پیش‌وند-داش ( `.-color-secondary`، `.-level-h1` ) در هر صورت تغییر نمی‌کنند. شیت‌استایل‌های عرضه‌شده توسط بسته پیشوند `instui` را نگه می‌دارند.

## پایه

`base.css` یک ریست اختیاری است که مقادیر پیش‌فرض سند را از توکن‌ها تنظیم می‌کند: `box-sizing`، یک ریست `body`، سطح صفحه، رنگ و قلم متن پایه، `color-scheme` (تا `light-dark()` توکن‌ها و کنترل‌های بومی تم را دنبال کنند)، و یک لینک پایه. آن را یکبار، قبل از شیت‌های کامپوننت و پروز، بارگذاری کنید وقتی pantoken صاحب صفحه است.

```ts
import "@pantoken/components/base.css";
import "@pantoken/components/components.css";
```

وقتی کامپوننت‌ها را در میزبانِی جاسازی می‌کنید که خودش `html` و `body` را تم می‌کند آن را رد کنید — ریست سطح صفحه را رنگ‌آمیزی می‌کند، پس نمی‌خواهید با میزبان در تضاد باشد. همه چیزهایی که تنظیم می‌کند از سلکتورهای `:where()` با اختصاص کم استفاده می‌کنند، بنابراین قوانین شما همیشه برنده‌اند.

`base.css` قلم برند را _اعمال_ می‌کند (`font-family: var(--instui-font-family-base)`، با فونت‌های پشتیبان سیستمی)؛ برای _بارگذاری_ آن، `fonts.css` اختیاری را وارد کنید — قوانین `@font-face` برای Atkinson Hyperlegible Next، اشاره به woff2های عرضه‌شده در بسته. جداست چون فونت‌ها حدود ~350 کیلوبایت هستند و خود-هاست کردن فونت‌ها انتخابی آگاهانه است.

```ts
import "@pantoken/components/base.css"; // applies the font (falls back to system without fonts.css)
import "@pantoken/components/fonts.css"; // loads the Atkinson Hyperlegible Next woff2s
```

## محتوای خواننده صفحه‌خوان

<p>یک پیام مخفی بعد از این جمله وجود دارد.<span class="instui-screen-reader-content">فقط صفحه‌خوان‌ها این را اعلام می‌کنند.</span></p>

```html
<span class="instui-screen-reader-content">Only screen readers announce this.</span>
```

`.instui-screen-reader-content` یک عنصر را به صورت بصری پنهان می‌کند در حالی که آن را در درخت دسترس‌پذیری نگه می‌دارد — برای لیبل‌ها و متن وضعیت که فناوری کمکی باید بخواند اما طراحی نباید نشان دهد.

## ابزارک‌ها

`utilities.css` یک لایه اختیاری از کلاس‌های فراگیر است: یک ابتدایی `View`، فاصله‌بندی براساس مقیاس توکن، و بازنویسی‌های رنگ معنایی. بر خلاف کلاس‌های کامپوننت `-modifier`، این‌ها از **دو خط تیره** (`--mod`) استفاده می‌کنند تا هرگز با نام‌های مودیفایر خودِ کامپوننت تصادم نکنند، و به هر عنصری — ساده یا روی یک کامپوننت — اعمال می‌شوند.

```ts
import "@pantoken/components/utilities.css";
```

<div class="instui-view --bg-accent-blue --text-on-color --p-md --mb-sm" style="border-radius: 6px;">
  <span class="instui-text --text-on-color">سطح با رنگ آبی تاکید با متن روی‌رنگ.</span>
</div>
<div class="instui-view --bg-muted --p-sm --mx-auto" style="max-width: 12rem; border-radius: 6px; text-align: center;">
  <span class="instui-text">مرکز یافته با mx-auto.</span>
</div>

```html
<div class="instui-view --bg-accent-blue --text-on-color --p-md">…</div>
<div class="instui-view --bg-muted --p-sm --mx-auto">…</div>
```

**View** — `.instui-view` که معادل `View` InstUI است. این پایه‌ای است که فاصله‌بندی و رنگ را روی آن لایه می‌کنید، و مودیفایرهای کلید-مقداری برای پراپ‌های بصری خودش دارد تا نیازی به استفاده از ابزارک‌ها نباشد: `-background-*` (سطوح آن)، `-border-radius-{small,medium,large,circle,pill}`، `-border-width-{small,medium,large}` + `-border-color-*`، `-shadow-{resting,above,topmost}`، `-display-*`، `-position-*`، `-overflow-x-*`/`-overflow-y-*`، و `-cursor-*` — این‌ها مودیفایرهای تک‌داش خودِ `view` هستند، مستقل از ابزارهای دو‌داش پایین. پراپ‌های مقدار آزاد (عرض/ارتفاع/اینست) در استایل‌های خطی می‌مانند؛ `margin`/`padding` از ابزارک‌های فاصله استفاده می‌کنند.

**فاصله‌بندی** — کلاس‌های سمت-به-طرف بر روی مقیاس فاصله. آن‌ها را به صورت `{m|p}{side}-{step}` بخوانید: `m` برای مارجین یا `p` برای پدینگ (یا کلمات کامل `margin`/`padding`)، یک طرف منطقی اختیاری، سپس یک گام. پس `.--m-lg` و `.--margin-lg` یکسان‌اند، و همچنین `.--pt-md` و `.--paddingt-md`.

- طرف‌ها: none (همه)، `t`/`b` (شروع/پایان بلاک)، `s`/`e` (شروع/پایان اینلاین)، `x`/`y` (محور اینلاین/بلاک). طرف‌های منطقی در چیدمان‌های راست-به-چپ درست می‌مانند.
- گام‌ها: `0`، `2xs`، `xs`، `sm`، `md`، `lg`، `xl`، `2xl`، بعلاوه `auto` فقط برای مارجین.

آن‌ها را برای شورتکات `margin="small auto large"` InstUI ترکیب کنید: `class="--mt-sm --mx-auto --mb-lg"`.

**رنگ** — بازنویسی‌های معنایی که روی پالت می‌مانند: `.--bg-<name>` (پس‌زمینه)، `.--text-<name>` (رنگ متن)، و `.--border-<name>` (رنگ حاشیه). هر `<name>` یک توکن رنگی معنایی است — نیات (`base`، `brand`، `muted`، `success`، `warning`، `error`، `info`، `inverse`، `on-color`، `strong`، …) به‌علاوه پالت `accent-*` (`accent-blue`، `accent-green`، و غیره). یک نام تنها زمانی وجود دارد که توکن در آن خانواده وجود داشته باشد، بنابراین `text-brand` یک کلاس نیست — متن توکن برند ندارد. راهی برای دسترسی به یک primitive یا هگز دلخواه وجود ندارد، و هر بازنویسی از تم پیروی می‌کند.

**خانواده توکن‌ها** — هر خانواده "یک توکن، یک خصوصیت" یک کلاس به ازای هر توکن دارد، نام‌گذاری شده بر اساس توکن. آن‌ها را آزادانه ترکیب کنید:

- `.--font-family-heading`، `.--font-family-code`، … → `font-family`
- `.--font-weight-body-strong`، `.--font-weight-interactive`، … → `font-weight`
- `.--line-height-*` → `line-height`
- `.--border-radius-md`، `.--border-radius-full`، … → `border-radius`
- `.--border-width-sm`/`-md`/`-lg` → `border-width`
- `.--opacity-base`، `.--opacity-disabled` → `opacity`
- `.--elevation-resting`/`-above`/`-topmost` (و `-depth1`…`-card`) → `box-shadow`

هر کدام تنها خصوصیت خود را تنظیم می‌کنند، بنابراین `border-width`/`border-radius` به یک رنگ `border-*` و یک سبک حاشیه نیاز دارند تا در واقع حاشیه را رسم کنند. این‌ها از نام کامل توکن‌ها (`.--border-radius-md`) استفاده می‌کنند، در حالی که helperهای رنگ و فاصله بالا از اختصارات کوتاه (`.--bg-brand`، `.--mt-lg`) استفاده می‌کنند — اختصارات برای ارگونومی‌اند؛ کلاس‌های توکن صریح و جامع هستند.

**چیدمان** — `.--display-<value>` (`block`، `inline-block`، `inline`، `flex`، `inline-flex`، `none`) و `.--text-align-<value>` (`start`، `center`، `end`، `justify`) پوشش‌دهنده پراپ‌های فراگیر `display` و `textAlign` InstUI (View, Button, Metric, Tabs، …) به صورت کلاس‌های قابل ترکیب هستند — بنابراین آن‌ها مودیفایرهای اختصاصی هر کامپوننت نیستند.

هر کلاس دو‌داش، قاعدتاً بر یک مودیفایر تک‌داش هم‌نام در cascade پیروز می‌شود، صرف‌نظر از ترتیب وارد کردن شیت‌استایل — مکانیزم را ببینید در [قراردادهای نویسندگی](/conventions/authoring).

همه چیز اینجا صرفاً CSS است که توسط توکن‌های `--instui-*` رانده می‌شود، بنابراین از طریق لایه توکن با InstUI همگام می‌شود. برای `componentsCss` و بیلدرهای هر-کامپوننت به [مرجع API](/api/) مراجعه کنید.

## اورلِی‌ها: دیالوگ و پاپ‌اور

کامپوننت‌های اورلِی از پرایمیتیوهای بومی پلتفرم استفاده می‌کنند، بنابراین با حداقل یا بدون جاوااسکریپت رفتار دسترس‌پذیر دارند.

**مودال** — `.instui-modal` را روی یک `<dialog>` بومی قرار دهید. آن تله کردن فوکوس، بستن با `Esc` و `::backdrop` را به‌صورت رایگان می‌گیرد؛ پشتی با همان توکن `--instui-component-mask-background-color` که `.instui-mask` است تیره می‌شود (برای یخ‌زدگی آن `-blur` را اضافه کنید). آن را با دستورات invoker باز و بسته کنید — بدون اسکریپت:

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

**Context view / popover** — `.instui-context-view` را روی یک عنصر `[popover]` قرار دهید و آن را با `popovertarget` جابه‌جا کنید. این روی لایه بالایی سوار می‌شود و با کلیک خارج یا `Esc` به‌صورت light-dismiss بسته می‌شود، باز هم بدون اسکریپت:

```html
<button class="instui-button" popovertarget="cv">Details</button>
<div id="cv" popover class="instui-context-view">…</div>
```

**طرح کشویی (Drawer layout)** — `.instui-drawer-layout` را روی ریشه چیدمان با فرزندان `.tray` و `.content` قرار دهید. صفت `open` (یا `-open`) را برای نمایان کردن تری اضافه کنید، و از `placement="end"` (یا `-placement-end`) برای داک کردن آن به سمت انتهای اینلاین استفاده کنید — مکان از طریق خصوصیات منطقی `inset-inline-*`/`flex-direction` حل می‌شود، لذا تحت `dir="rtl"` به‌طور خودکار برمی‌گردد بدون قوانین اضافی. بسته تعامل متمرکز مسیریابی دستورات Invoker را اضافه می‌کند و حالت اورلِی (`should-overlay-tray`) را وقتی عرض از `--drawer-layout-min-width` عبور می‌کند تغییر می‌دهد (پیش‌فرض `--instui-breakpoints-sm`، سپس `30rem`):

```html
<button class="instui-button" command="--toggle" commandfor="drawer">Toggle panel</button>
<div id="drawer" class="instui-drawer-layout" open>
  <aside class="tray">…</aside>
  <main class="content" role="region">…</main>
</div>
<script src="https://cdn.jsdelivr.net/npm/@pantoken/interactions/dist/drawer-layout.iife.js"></script>
```

**ماسک** — `.instui-mask` برای اورلِی‌های در جریان (مثل یک اسپینر روی یک کارت) باقی می‌ماند؛ `::backdrop` مودال موردِ پوشش را می‌پوشاند.

هر دو الگو همچنین به عنوان عناصر سفارشی رفتاری در `@pantoken/web-components` بسته‌بندی شده‌اند: `<instui-modal open>` (یک `<dialog>` که توسط صفت `open`ش رانده می‌شود) و `<instui-context-view>` (یک پاپ‌اور بومی).

پشتیبانی مرورگر: API پاپ‌اور و `popovertarget` پایه 2024 هستند؛ دستورات invoker (`command`/`commandfor`) پایه 2025 هستند، بنابراین در مرورگرهای قدیمی‌تر دکمه‌ها را به عنوان یک بازگشت یک‌خطه به `dialog.showModal()` متصل کنید. موقعیت‌دهی پاپ‌اور کنار تریگر از موقعیت‌دهی anchor CSS استفاده می‌کند در جایی که پشتیبانی می‌شود (Chromium)؛ در سایر جاها در لایه بالایی مرکز می‌شود.

## فرم‌ها

**FormField** — `.instui-form-field` یک wrapper شبکه‌ای CSS-Grid است که یک لیبل، کنترل و هر پیامی را چیده‌بندی می‌کند. آن را روی یک `<label>` قرار دهید تا لیبل به‌طور بومی با کنترلش مرتبط شود. این سه ناحیه گرید دارد — `label`، `controls`، `messages`:

```html
<label class="instui-form-field">
  <span class="label">Email address</span>
  <span class="controls"><input class="instui-text-input" type="email" required /></span>
  <div class="instui-form-field-messages">
    <span class="instui-form-field-message -type-hint">We'll never share it.</span>
  </div>
</label>
```

`-layout-stacked` (پیش‌فرض) نواحی را روی هم می‌چیند؛ `-layout-inline` لیبل را کنار کنترل قرار می‌دهد (با `-label-align-{start,end}` و `-v-align-{top,middle,bottom}` تنظیم کنید). `-readonly` رنگ لیبل را تغییر می‌دهد.

ستاره الزامی **required asterisk** زمانی ظاهر می‌شود که فیلد توسط _یا_ کلاس `-required` _یا_ یک کنترل بومی `required` درون آن لازم شده باشد — بنابراین می‌توانید فقط `required` را روی ورودی تنظیم کنید و علامت نمایش داده می‌شود. این تزئینی است (یک `::after` روی لیبل، خارج از درخت دسترس‌پذیری)؛ آن را با توضیحی مانند "فیلدهایی که با \* علامت‌گذاری شده‌اند ضروری‌اند" جفت کنید مگر فرم خودش واضح باشد.

**FormFieldGroup** — `.instui-form-field-group` فیلدهای مرتبط را در یک `<fieldset>` با شرح `<legend>` گروه‌بندی می‌کند. این صرفاً چیدمان است (توکن اختصاصی ندارد): پیش‌فرض فیلدها را روی هم می‌چیند؛ `-layout-columns` / `-layout-inline` آن‌ها را به ستون‌های پاسخگو جریان می‌دهد، با `-row-spacing-*` / `-col-spacing-*` و `-v-align-*` برای تنظیم گرید.

**RadioInputGroup** — `.instui-radio-input-group` همان گروه‌بندی `<fieldset>`/`<legend>` است، تخصصی برای رادیوها. چون رادیوهای فرزند یک `name` را به اشتراک می‌گذارند، انتخاب به‌صورت بومی تک‌گزینه‌ای است — بنابراین مجموعه‌ای از دکمه‌های توگل به عنوان یک کنترل رفتار می‌کنند، نه دکمه‌های مستقل. `-variant-simple` (پیش‌فرض) رادیوهای استاندارد را چیده‌بندی می‌کند (`-layout-columns`/`-inline` آن‌ها را به یک ردیف جریان می‌دهند)؛ `-variant-toggle` دکمه‌های فرزند `.instui-radio.-variant-toggle` را به یک کنترل segmented واحد وصل می‌کند (حاشیه‌های جمع‌شده، انتهای بیرونی گرد):

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

**پیام‌ها** — `.instui-form-field-messages` کانتینر است؛ هر `.instui-form-field-message` یک `-type-*` می‌گیرد: `-type-hint` (خاکستری، پیش‌فرض)، `-type-error` (متن قرمز + یک گلیف هشدار‌حلقه‌ای)، `-type-success` (متن سبز + یک گلیف تیک‌حلقه‌ای)، و `-type-screenreader-only` (بصری بریده‌شده، هنوز اعلام می‌شود). گلیف‌ها در `currentColor` رنگ‌آمیزی می‌شوند، بنابراین همیشه با رنگ پیام مطابقت دارند. `-type-new-error` یک نام مستعمل از `-type-error` است. کانتینر را با `aria-describedby` به کنترل وصل کنید، و `aria-invalid` را روی کنترل زمانی که خطا وجود دارد تنظیم کنید.

در داخل یک FormField، یک پیام `-type-error` پیروی از اعتبارسنجی سمت‌مشتری دارد: تا زمانی که کنترل فیلد `:user-invalid` نشده (بومی، پس از تعامل کاربر) پنهان می‌ماند — یا شما آن را با `-invalid` روی `.instui-form-field` مجبور می‌کنید (برای خطای سمت‌سرور). یک `.instui-form-field-messages` مستقل (غیر درون فیلد) تحت تأثیر قرار نمی‌گیرد. حلقه فوکوس کنترل نیز مطابق است: خطر وقتی `:user-invalid`/`-invalid`، موفقیت روی `-success`.

**کنترل‌های متنی** — `.instui-text-input` ( `<input>` بومی)، `.instui-text-area` ( `<textarea>` بومی، قابل تغییر اندازه)، و `.instui-simple-select` ( `<select>` بومی با caret) یک ظاهر و وضعیت‌های یکسان دارند: `-invalid` (حاشیه خطا)، `-success` (حاشیه موفق)، `-readonly`، `:disabled` بومی، و `-size-{sm,md,lg}`. برای ایکون پیش/پس ( `renderBeforeInput`/`renderAfterInput` InstUI)، ورودی را در `.instui-input-group` بپیچید و یک اسلات `.before`/`.after` اضافه کنید (یک گلیف `-icon-*`); `-should-not-wrap` آن را در یک خط نگه می‌دارد. `.instui-number-input` همان چهره به‌علاوه یک ستون اسپینر +/- `.arrows` است ( `type="number"` بومی؛ دکمه‌ها را به `stepUp()`/`stepDown()` وصل کنید). `.instui-range-input` یک `input[type="range"]` استایل‌شده است که مقدارش در یک حباب معکوس `.instui-range-input-value` رندر می‌شود. برای یک combobox غنی با پاپ‌اور لیست‌باکس، از `@instructure/ui` استفاده کنید — این کتابخانه کنترل‌های بومی را پوشش می‌دهد.

**سلکت انتخاب‌شده استایل‌شده (آزمایشی)** — یک `select.css` اختیاری همان عنصر `.instui-simple-select` را ارتقاء می‌دهد: پنل باز و هر گزینه را با حالات hover و selected با مدل CSS Customizable Select استایل می‌کند.

> [!WARNING]
> `select.css` به `appearance: base-select` / `::picker(select)` تکیه دارد، که **آزمایشی** است (Chrome 135+، هنوز Baseline نیست). به عنوان یک شیت جداگانه اختیاری عرضه می‌شود و هر قانون پشت `@supports (appearance: base-select)` گیت شده است، بنابراین در مرورگرهای پشتیبانی‌نشده کاری انجام نمی‌دهد — کنترل `.instui-simple-select` فقط همان سلکت بومی ساده باقی می‌ماند. فقط اگر می‌خواهید دراپ‌داون پیشرفته را و پذیرش پشتیبانی محدود را قبول دارید آن را بارگذاری کنید.

```ts
import "@pantoken/components/components.css";
import "@pantoken/components/select.css"; // opt-in, experimental: styles the open dropdown
```
