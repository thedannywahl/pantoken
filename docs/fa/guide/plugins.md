# افزونه‌ها

یک افزونه pantoken خروجی توکن یا CSS را بدون فورک کردن یک بسته گسترش می‌دهد. یکی را با `definePlugin` از `@pantoken/plugin-kit` می‌سازید، سپس آن را به `buildTokens` یا `toCss` پاس می‌دهید.

## نوشتن یک افزونه

به `definePlugin` هوک‌هایی که پیاده‌سازی می‌کنید را بدهید. آن یک افزونهٔ معمولی برمی‌گرداند که با قابلیت‌هایی که از آن هوک‌ها استنتاج شده‌اند برچسب‌گذاری شده است. یک افزونه می‌تواند IR را گسترش دهد (`tokens`, `icons`)، خروجی CSS را (`css`)، یا هر دو را.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## ثبت آگاه از قابلیت‌ها

`buildTokens` و `toCss` `checkPlugins` را روی افزونه‌هایی که پاس می‌دهید اجرا می‌کنند. هنگامی که افزونه‌ای هوک هماهنگ با مرحله‌ای که در آن ثبت شده ندارد، هشدار می‌دهد — هرگز خطا پرتاب نمی‌کند — بنابراین یک افزونهٔ فقط-توکن که به `toCss` پاس داده شود، به‌جای اینکه بی‌صدا هیچ کاری نکند، با یک یادداشت رد می‌شود.

## ترکیب افزونه‌ها

روی یک افزونهٔ دیگر با `extendPlugin` ساخت بسازید، یا همتایان را با `mergePlugin` ترکیب کنید:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

هوک‌های همان‌مرحله ترکیب‌پذیرند: `tokens` ابتدا پایه را اجرا می‌کند سپس افزودنی را، `css` دو مشارکت را ادغام می‌کند، و `icons` هر دو را اجرا می‌کند.

## اعتبارسنجی خروجی افزونه

چک‌های اشتراکِ drift مشترک را از `@pantoken/utils` روی خروجی افزونهٔ خود در تست آن اجرا کنید، تا یک اشتباه تایپی یا تغییر نام توکن سریع و محلی شکست بخورد:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## افزونه‌های بسته‌بندی‌شده

- `@pantoken/plugin-simple-icons` — برند کردن آیکن‌ها از simple-icons، ثبت‌شده به‌عنوان توکن‌های آیکن.
- `@pantoken/plugin-lucide-lab` — آیکن‌های Lucide Lab، ثبت‌شده به‌عنوان توکن‌های تصویر `--instui-icon-*`.
- `@pantoken/plugin-logos` — لوگوهای محصول Instructure به‌صورت SVG، URI داده، و توکن‌های تصویر `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — یک افزونهٔ PostCSS (نه افزونهٔ pantoken) که متغیرهای سفارشی استفاده‌نشده را از یک stylesheet حذف می‌کند.
- `@pantoken/plugin-custom-theme-colors` — یک صفحه را با تنظیم یک صفت (`data-pantoken-color`) روی یکی از 13 پالت بازبرند می‌کند، یا روی `custom` برای هر هگز برند. رجوع کنید به [رنگ‌های تم](#theme-colors).

ثبت‌نام Lucide Lab را می‌توان به‌صورت تنبل بارگذاری کرد، سپس به هوک توکن همگام‌سازی‌شده پاس داد:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

چند چیز که قبلاً افزونه بودند اکنون در `@pantoken/components` بسته‌بندی می‌شوند، چون بسیاری از کامپوننت‌ها آن‌ها را از جعبه نیاز دارند: سایه‌های elevation (`--instui-elevation-*`، در `components.css`)، حلقهٔ focus-outline (در `base.css` — هر عنصر قابل فوکوسی هنگام اینکه pantoken مالک صفحه است آن را دریافت می‌کند)، و فونت‌های برند Instructure (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` را اعمال می‌کند؛ `@pantoken/components/fonts.css` اختیاری `@font-face` woff2s را بارگذاری می‌کند).

## رنگ‌های تم {#theme-colors}

`@pantoken/plugin-custom-theme-colors` برای هر پالت یک بلوک `[data-pantoken-color="…"]` منتشر می‌کند
(`navy`, `blue`, `green`, `red`, `orange`, `grey`, `plum`, `violet`, `stone`, `sky`, `honey`, `sea`,
`aurora`). هر بلوک، مقادیر پایهٔ برند (`--instui-primitive-color-navy-*` و `-blue-*`) را به پالت انتخاب‌شده اشاره می‌دهد. همچنین سطوح برند که در بالا دستی به هگز صریح تبدیل شده بودند را مجدداً مشتق می‌کند، همگام با آلفای پخته‌شدهٔ آن‌ها از طریق `color-mix()`. رنگ‌های معنایی وضعیت، تاکیدات آبی صریح، و سایه‌های elevation همان‌جا باقی می‌مانند. آن را در [دموی تم‌بندی مبتنی بر swatch](https://stackblitz.com/edit/vitejs-vite-sg9oy7ln?file=index.html) امتحان کنید.

```html
<html data-pantoken-color="sea"></html>
```

### رنگ برند سفارشی

برای بازبرند کردن از هر هگز، `data-pantoken-color="custom"` را تنظیم کنید، مانند رنگ اولیه‌ای که یک مدیر Canvas در ویرایشگر تم وارد می‌کند. pantoken از آن یک مقیاس کامل 10–200 `--instui-primitive-color-custom-*` مشتق می‌کند:

1. **منحنی مرجع.** هدف روشنایی هر مرحله متوسط روشنایی OKLCH سیزده پالت در آن مرحله است، با 0 ثابت روی سفید و 210 روی سیاه. بنابراین فاصلهٔ مقیاس سفارشی با فاصلهٔ پالت‌های عرضه‌شده مطابقت دارد.
2. **لنگر.** ورودی روی مرحله‌ای قرار می‌گیرد که هدف روشنایی آن به روشنایی خود ورودی نزدیک‌تر است، سپس به آن روشنایی دقیق سنپ می‌شود. `#cccccc` در `#c9c9c9` به `custom-40` تبدیل می‌شود: نزدیک به ورودی، اما همیشه یکسان نیست. "نزدیک‌ترین" به معنای نزدیک‌ترین مرحله روی منحنی است، نه نزدیک‌ترین رنگ موجود در یک پالت.
3. **پرکردن.** هر قدم دیگر هیو (hue) ورودی را حفظ می‌کند. اشباع آن مطابق منحنی متوسط اشباع پالت‌ها نسبت به لنگر دنبال می‌کند، و تنها جایی کاهش می‌یابد که رنگ از فضای sRGB خارج شود.

فقط `#rgb` و `#rrggbb` پذیرفته می‌شوند؛ هر چیز دیگری `TypeError` را پرتاب می‌کند، بنابراین یک هگز از یک فرم نمی‌تواند به CSS تزریق شود.

در زمان ساخت، کل قاعده را با مقادیر مشتق‌شدهٔ قبلاً اعلام‌شده منتشر کنید:

```ts
import { customColorCss, customThemeColors } from "@pantoken/plugin-custom-theme-colors";

customThemeColors({ custom: "#e62429" }); // as a plugin, alongside the 13 palettes
customColorCss("#e62429"); // or the custom rule on its own
```

برای انتخاب رنگ در زمان اجرا بدون ارسال مجموعهٔ توکن‌ها، منحنی و قاعدهٔ remap را در زمان ساخت پیش‌محاسبه کنید. سپس از ورودی بدون‌وابستگی `/scale` در مرورگر استفاده کنید، و تنها 20 مقدار مشتق‌شده را تنظیم کنید:

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

انتخاب‌کنندهٔ تم سایت داکز، ویرایشگر تم Canvas، و دمو بالا همه به این روش کار می‌کنند.

رجوع کنید به [مرجع API](/api/) برای صادرات هر افزونه.
