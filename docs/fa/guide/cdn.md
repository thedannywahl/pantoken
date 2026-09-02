# CDN و توزیع

pantoken هر بسته را در npm منتشر می‌کند، بنابراین می‌توانید توکن‌ها، کامپوننت‌ها و وب‌کامپوننت‌ها را مستقیماً
از یک CDN بگیرید — بدون مرحله ساخت، بدون باندلر. این صفحه URL ترکیبی CSS (با یک سازنده تعاملی)
و همچنین drop-in های وب‌کامپوننت را پوشش می‌دهد.

## پایه توکن

هر کامپوننت pantoken از ویژگی‌های سفارشی `--instui-*` در یک شیت توکن روی صفحه می‌خواند. دو
ورژن عرضه می‌شوند:

- `@pantoken/css/dist/style.lean.css` — پایه CDN پیشنهادی. هر توکن به جز مجموعه کامل آیکون‌ها را حمل می‌کند، بنابراین حدود 23 KB فشرده gzip است.
- `@pantoken/css/dist/style.css` — شیت کامل، شامل حدود ~1,777 توکن گلیف آیکون
  (`--instui-icon-*`). حدود 140 KB فشرده gzip. این را بارگذاری کنید اگر گسترده از آیکون‌ها از طریق
  `var(--instui-icon-*)` استفاده می‌کنید.

مقیاس elevation و متغیرهای focus-ring در هر دو شیت قرار دارند، بنابراین سایه‌ها و حلقه فوکوس با
فقط بارگذاری foundation کار می‌کنند.

## کامپوننت‌ها و آیکون‌ها را انتخاب کنید

[گزیننده تعاملی CDN](/guide/cdn-picker) URLهای jsDelivr ترکیبی برای CSS و قطعات جاوااسکریپت بسته‌ها را می‌سازد. آن را باز کنید، آنچه نیاز دارید را علامت بزنید و خروجی تولیدشده را کپی کنید.

- تب **Components** — شیپ‌استایل‌های تک‌تک کامپوننت‌ها یا بشکه کامل `components.css` را انتخاب کنید. در صورت نیاز، ریست پایه یا ابزارهای spacing/color را اضافه کنید.
- تب **JS** — قطعه ایمپورت ESM برای `@pantoken/interactions` را کپی کنید.
- تب **Icons** — آیکون‌های جداگانه از مجموعه InstUI (~1,800 آیکون) یا از Simple Icons (~3,300 گلیف برند) را انتخاب کنید. گزیننده یک URL ترکیبی جدا برای فایل‌های CSS آیکون‌ها خروجی می‌دهد تا فقط آیکون‌هایی که واقعاً استفاده می‌کنید را بارگذاری کنید.
- تب **Web Components** — قطعات `@pantoken/web-components` (ثبت انتخابی ESM یا بوت‌استرپ اسکریپت کلاسیک) را بسازید.

هر فایل کامپوننت کوچک است — بیشتر آن‌ها حدود 2 KB هستند. یک کامپوننت که آیکون‌ها را رندر می‌کند (`alert`, `checkbox`,
و چند مورد دیگر) به آن گلیف‌ها نیاز دارد، بنابراین سازنده `@pantoken/components/dist/component-icons.css` را اضافه می‌کند (حدود
0.5 KB فشرده gzip — 11 آیکونی که مجموعه کامپوننت استفاده می‌کند) هرگاه شیت lean را انتخاب کنید. شیت کامل
قبلاً آن‌ها را دارد.

### ترتیب بارگذاری و فونت‌ها

ابتدا پایه توکن را بارگذاری کنید، سپس ریست پایه اختیاری، سپس فایل‌های کامپوننت، و در نهایت ابزارها — آن‌ها ابزارهای بازنویسی‌اند، بنابراین تنها زمانی قاعده یک کامپوننت را بازنویسی می‌کنند که در cascade بعد از آن قرار گیرند. URL ترکیبی بالا قبلاً آن‌ها را برای شما مرتب کرده است. فونت‌ها یک استثنا هستند:
`@pantoken/components/dist/fonts.css` به فایل‌های فونت با مسیر نسبی اشاره می‌کند، بنابراین combine نمی‌تواند
آن‌ها را بازنویسی کند — آن را به عنوان `<link>` جداگانه بارگذاری کنید:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/components/dist/fonts.css" />
```

### همه با هم

در گزیننده **All components** را تیک بزنید تا آن را به بشکه تغییر دهد، یا خودتان مستقیم به آن اشاره کنید (حدود 141 KB
فشرده gzip) همراه با شیت توکن:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/combine/npm/@pantoken/css/dist/style.css,npm/@pantoken/components/dist/components.css"
/>
```

## وب‌کامپوننت‌ها

`@pantoken/web-components` المنت‌های سفارشی `<instui-*>` مستقل از فریم‌ورک را ثبت می‌کند. آن‌ها CSS خود را درون‌خطی می‌کنند، اما همچنان توکن‌ها را از یک شیت روی صفحه می‌خوانند، بنابراین یک پایه توکن نیز بارگذاری کنید.

### ماژول‌های ES (پیشنهادی)

یک CDN ESM وابستگی‌های بسته را برای شما حل می‌کند. این هر المنت را ثبت می‌کند:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script type="module">
  import "https://esm.sh/@pantoken/web-components";
</script>
```

از شیت توکن کامل (یا شیت lean به‌علاوه `component-icons.css`) استفاده کنید تا عناصر رندرکننده آیکون مانند
`<instui-alert>` گلیف‌های خود را پیدا کنند.

برای ثبت فقط برخی عناصر — و وابستگی‌های تو در تو آن‌ها — `register` را ایمپورت کنید و `only` را پاس دهید:

```html
<script type="module">
  import { register } from "https://esm.sh/@pantoken/web-components";
  // Pulls in date-input and calendar automatically.
  register(customElements, { only: ["date-time-input"] });
</script>
```

### تگ اسکریپت کلاسیک

برای یک drop-in بدون ماژول، بیلد IIFE را بارگذاری کنید. این وابستگی‌هایش را باندل می‌کند و در بارگذاری هر المنت را خودکار ثبت می‌کند، و یک global `PantokenWebComponents` را در دسترس قرار می‌دهد:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@pantoken/css/dist/style.css" />
<script src="https://cdn.jsdelivr.net/npm/@pantoken/web-components/dist/web-components.iife.js"></script>
```

این از مسیر ESM بزرگ‌تر است — `@pantoken/components` و `@pantoken/icons` را درون‌خطی می‌کند — بنابراین فقط زمانی که نتوانید از ماژول‌ها استفاده کنید به آن مراجعه کنید.

## پین کردن نسخه‌ها

URLهای بالا — و آن‌هایی که گزیننده می‌نویسد — آخرین نسخه منتشر شده را دنبال می‌کنند. برای محیط تولید یک نسخه major (یا دقیق) را پین کنید — برای مثال `@pantoken/css@0` — تا ارتقا شما را غافلگیر نکند.
