# پلاگین‌ها

یک پلاگین pantoken خروجی توکن یا CSS را بدون فورک کردن یک بسته گسترش می‌دهد. یکی را با `definePlugin` از `@pantoken/plugin-kit` می‌سازید، سپس آن را به `buildTokens` یا `toCss` می‌دهید.

## نوشتن یک پلاگین

به `definePlugin` هوک‌هایی را که پیاده‌سازی می‌کنید بدهید. این یک پلاگین معمولی برمی‌گرداند که با قابلیت‌هایی که از آن هوک‌ها استنتاج شده‌اند، برچسب‌گذاری شده است. یک پلاگین می‌تواند IR را گسترش دهد (`tokens`, `icons`), خروجی CSS را (`css`) یا هر دو را.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## ثبت آگاه از قابلیت

`buildTokens` و `toCss` `checkPlugins` را روی پلاگین‌هایی که می‌فرستید اجرا می‌کنند. هشدار می‌دهد — هرگز پرتاب نمی‌کند — وقتی یک پلاگین هیچ هوک مطابقت‌دهنده‌ای برای مرحله‌ای که در آن ثبت شده ندارد، بنابراین یک پلاگین فقط-توکن که به `toCss` داده شود با یک یادداشت رد می‌شود به‌جای اینکه به‌صورت بی‌صدا هیچ کاری نکند.

## ترکیب پلاگین‌ها

روی یک پلاگین پایه با `extendPlugin` بسازید، یا همتایان را با `mergePlugin` ترکیب کنید:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

هوک‌های هم‌مرحله ترکیب می‌شوند: `tokens` ابتدا پایه سپس الحاق را اجرا می‌کند، `css` دو مشارکت را ادغام می‌کند، و `icons` هر دو را اجرا می‌کند.

## اعتبارسنجی خروجی پلاگین خود

چک‌های اشتراکِ drift را از `@pantoken/utils` روی خروجی خود پلاگین در تست آن اجرا کنید، تا یک تایپو یا تغییر نام توکن سریع و محلی شکست بخورد:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## پلاگین‌های بسته‌بندی‌شده

- `@pantoken/plugin-simple-icons` — آیکون‌های brand از simple-icons، به‌عنوان توکن‌های آیکون ثبت‌شده.
- `@pantoken/plugin-lucide-lab` — آیکون‌های Lucide Lab، به‌عنوان توکن‌های تصویر `--instui-icon-*` ثبت‌شده.
- `@pantoken/plugin-logos` — لوگوهای محصولات Instructure به‌صورت SVG، داده URI، و توکن‌های تصویر `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — یک پلاگین PostCSS (نه پلاگین pantoken) که پراپرتی‌های سفارشی استفاده‌نشده را از یک stylesheet حذف می‌کند.
- `@pantoken/plugin-custom-theme-colors` — یک صفحه را با تنظیم یک صفت (`data-pantoken-color`) به یکی از 13 پالت یا به `custom` برای هر هگز برند دوباره برند می‌کند. ببینید [رنگ‌های تم](#theme-colors).
- `@pantoken/plugin-custom-components` — کنترل‌های سفارشی پشتیبانی‌شده توسط توکن شامل SegmentedControl و SkeletonLoader.

### کنترل قطعه‌ای (Segmented control)

برای دو تا پنج نما یا فیلتر مرتبط از یک کنترل قطعه‌ای استفاده کنید. هر گزینه یک رادیوی بومی برچسب‌خورده در یک گروه نام‌گذاری‌شده است؛ یکی را در ابتدا checked علامت بزنید. از تب‌ها یا منوی کشویی استفاده کنید اگر گزینه‌ها به‌راحتی جا نمی‌شوند، و برای عملیات‌ها از گروه دکمه‌ها استفاده کنید نه انتخاب‌ها. سبک `-size-md` پیش‌فرض است، با `-size-sm` و `-size-lg` برای زمینه‌های فشرده‌تر و برجسته‌تر.

`@pantoken/plugin-custom-components/segmented-control.css` را برای کنترل و دکمه‌های overflow آن وارد کنید. وقتی قطعه‌ای به یک نماد نیاز دارد، از کلاس `-icon-*` روی برچسب قطعه استفاده کنید؛ کمک‌کننده تعامل همچنین کلاس `-icon-*` را از ورودی بومی به نقاش برچسب منتقل می‌کند. به fieldset یک `aria-label` توصیفی یا یک legend قابل مشاهده بدهید. کمک‌کننده اعلان بومی رادیو را حفظ می‌کند، ناوبری صفحه‌کلید را اضافه می‌کند، و به‌دلخواه هر بار فشار فلش یک قطعه بریده‌شده را آشکار می‌کند. از کنترل‌های شروع/پایان منطقی و برچسب‌های دکمه دسترس‌پذیر در هر دو جهت استفاده کنید:

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

`@pantoken/interactions/segmented-control.iife.js` را برای ثبت وقتی DOM آماده است وارد کنید، یا از `initSegmentedControl(fieldset, { size: "md", isOverflown: true })` از `@pantoken/interactions` فراخوانی کنید و هنگام برداشتن آن `cleanup()` را صدا بزنید. CSS و انتخاب‌های رادیوی بومی بدون JS کار می‌کنند؛ فلش‌های overflow به رفتار نیاز دارند. آیتم انتخاب‌شده از سایهٔ طراحی دو لایه از رنگ‌های semantic drop-shadow استفاده می‌کند؛ این یک سایهٔ آیتم-فعال متمایز است نه یک ترکیب `--instui-elevation-*` موجود. دکمه‌های overflow از توکن‌های component elevation3 بالادست از طریق `--pantoken-segmented-overflow-shadow` استفاده می‌کنند.

### بارگذاری اسکلتی (Skeleton loading)

زیر مسیر `skeleton-loader.css` یک شکل تزئینی Text، Avatar، یا Image را سبک می‌کند. Text از `-size-xxs` تا `-size-xxl` را می‌پذیرد؛ Avatar و Image در اندازه متوسط هستند. هر `.skeleton-row` اختیاری یک خط متن اضافه می‌کند بدون تغییر اندازه. shimmerِ CSS بعد از سه جاروی 1.5 ثانیه‌ای متوقف می‌شود و وقتی کاربر Motion کاهش‌یافته را ترجیح می‌دهد ثابت می‌ماند. این قبل از بارگذاری JavaScript کار می‌کند.

شکل‌ها را تنها در جایی قرار دهید که محتوای وابسته به کوئری ظاهر خواهد شد، نه روی ناوبری سروری، فیلترها، سرفصل‌ها، یا کنترل‌هایی که سرور از قبل می‌داند. اسکلت یک معیار پیشرفت یا وضعیت مشغول عمل نیست. در طول تازه‌سازی پس‌زمینه، محتوای موجود را قابل مشاهده نگه دارید؛ برای عملیات‌ها از spinner یا وضعیت مشغول دکمه استفاده کنید.

برنامهٔ والد مسئول حالت‌های loading، loaded، empty و error مارک‌آپ است. یک ناحیه وضعیت خالی در هر صفحه و یک alert خالی جداگانه در HTML سرور فراهم کنید، هر دو بیرون از ناحیهٔ محتوای مشغول:

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

هنگامی که حالت درخواست تغییر می‌کند، رفتار سطح والد را فراخوانی کنید. این `aria-busy` و دو اعلان از پیش‌وجود‌داشته را به‌روزرسانی می‌کند، اما هرگز محتوا را جایگزین نمی‌کند یا فوکوس را جابه‌جا نمی‌کند:

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

اگر به‌جای واردات مستقیم از بستهٔ تعاملاتِ هر-کامپوننت استفاده می‌کنید، یک رویداد `pantoken:skeleton-state` روی عنصر `[data-skeleton-region]` با `detail: { state: "loading" | "loaded" | "empty" | "error", message: string }` dispatch کنید. برای درخواست‌های سریع، تاخیرِ _نمایش_ placeholder‌ها را 200–500ms اعمال کنید؛ رفتار به‌طور مستقل اعلان loading را 400ms به تأخیر می‌اندازد. در بارگذاری‌های غیرفعال صفحه، فوکوس را همان‌جا رها کنید. تنها زمانی فوکوس را به نتیجهٔ تازه‌بارگذاری‌شده منتقل کنید که خود کاربر این درخواست را خواسته باشد. نود وضعیت نتایج و حالت‌های خالی را اعلام می‌کند؛ نود alert شکست‌ها را اعلام می‌کند. `aria-busy`, `role="status"`, و `role="alert"` را روی یک عنصر ترکیب نکنید.

ثبت Lucide Lab را می‌توان به‌صورت lazy بارگذاری کرد، سپس به هوک توکن همگام (synchronous) پاس داد:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

چند مورد که قبلاً پلاگین بودند اکنون در `@pantoken/components` بسته‌بندی می‌شوند، چون خیلی از کامپوننت‌ها آن‌ها را از جعبه نیاز دارند: سایه‌های elevation (`--instui-elevation-*`, در `components.css`), حلقهٔ focus-outline (در `base.css` — هر عنصر فوکوس‌پذیر وقتی pantoken مالک صفحه است آن را دریافت می‌کند)، و فونت‌های برند Instructure (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` را اعمال می‌کند؛ `@pantoken/components/fonts.css` اختیاری `@font-face` woff2s را بارگیری می‌کند).

## رنگ‌های تم {#theme-colors}

`@pantoken/plugin-custom-theme-colors` برای هر پالت یک بلاک `[data-pantoken-color="…"]` صادر می‌کند
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). هر بلاک، پرایمیتیوهای برند (`--instui-primitive-color-navy-*` و `-blue-*`) را به پالت انتخابی اشاره می‌دهد. همچنین سطوح برند را که در بالادست به هگزهای صریح تبدیل شده بودند دوباره مشتق می‌کند، و آلفای baked آن‌ها را از طریق `color-mix()` حفظ می‌کند. رنگ‌های وضعیت معنایی، تاکیدهای آبی صریح، و سایه‌های elevation سر جای خود باقی می‌مانند. آن را در
[دموی تم‌بندی مبتنی بر سوایچ](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) امتحان کنید.

```html
<html data-pantoken-color="sea"></html>
```

### رنگ برند سفارشی

برای بازبرند کردن از هر هگزی، `data-pantoken-color="custom"` را تنظیم کنید، مثل رنگ اصلی که یک مدیر Canvas آن را در Theme Editor تایپ می‌کند. pantoken از آن یک مقیاس کامل 10–200 `--instui-primitive-color-custom-*` مشتق می‌کند:

1. **منحنی مرجع.** هدف روشنایی هر مرحله میانگین روشنایی OKLCH سیزده پالت در آن مرحله است، با 0 ثابت در سفید و 210 در سیاه. بنابراین فاصله‌گذاری مقیاس سفارشی با فاصله‌گذاری پالت‌های عرضه‌شده مطابقت دارد.
2. **لنگر.** ورودی روی مرحله‌ای قرار می‌گیرد که هدف روشنایی آن به روشنایی خود ورودی نزدیک‌تر است، سپس به آن روشنایی دقیق می‌چسبد. `#cccccc` در `#c9c9c9` تبدیل به `custom-40` می‌شود: نزدیک به ورودی، اما نه همیشه یکسان. «نزدیک‌ترین» به‌معنای نزدیک‌ترین مرحله روی منحنی است، نه نزدیک‌ترین رنگ موجود در یک پالت.
3. **پر کردن.** هر قدم دیگر رنگ ورودی را حفظ می‌کند. اشباع آن مطابق منحنی متوسط اشباع پالت‌ها نسبت به لنگر دنبال می‌شود، و تنها جایی کاهش می‌یابد که رنگ خارج از فضای sRGB بیفتد.

فقط `#rgb` و `#rrggbb` پذیرفته می‌شوند؛ هر چیز دیگری یک `TypeError` پرتاب می‌کند، بنابراین یک هگز از فرم نمی‌تواند CSS تزریق کند.

در زمان ساخت، کل قاعده را با پرایمیتیوهای مشتق‌شده از قبل اعلان‌شده صادر کنید:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

برای انتخاب رنگ در زمان اجرا بدون ارسال مجموعه توکن، منحنی و قاعده remap را در زمان ساخت پیش‌محاسبه کنید. سپس از ورودی مستقل از وابستگی `/scale` در مرورگر استفاده کنید، و تنها 20 پرایمیتیو مشتق‌شده را تنظیم کنید:

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

پیکر انتخاب تم سایت مستندسازی، ویرایشگر تم Canvas، و دموی بالا همگی به این شکل کار می‌کنند.

برای هر صادرات پلاگین به [مرجع API](/api/) مراجعه کنید.
