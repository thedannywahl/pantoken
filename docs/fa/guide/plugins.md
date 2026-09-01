# پلاگین‌ها

یک پلاگین pantoken خروجی توکن یا CSS را بدون جدا کردن یک پکیج گسترش می‌دهد. یکی را با
`definePlugin` از `@pantoken/plugin-kit` می‌سازید، سپس آن را به `buildTokens` یا `toCss` منتقل می‌کنید.

## نوشتن یک پلاگین

به `definePlugin` هوک‌هایی که پیاده‌سازی می‌کنید را بدهید. آن یک پلاگین معمولی برمی‌گرداند که با قابلیت‌هایی که از روی آن هوک‌ها استنتاج شده‌اند، برچسب‌گذاری شده است. یک پلاگین می‌تواند IR را گسترش دهد (`tokens`, `icons`), خروجی CSS را (`css`), یا هر دو را.

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

`buildTokens` و `toCss` `checkPlugins` را روی پلاگین‌هایی که ارسال می‌کنید اجرا می‌کنند. هشدار می‌دهد — هرگز خطا پرتاب نمی‌کند — وقتی که یک پلاگین هوک متناسب با مرحله‌ای که در آن ثبت شده ندارد، بنابراین یک پلاگین فقط-توکن که به `toCss` ارسال شده است با یک یادداشت نادیده گرفته می‌شود به جای اینکه بی‌سروصدا کاری انجام ندهد.

## ترکیب پلاگین‌ها

روی یک پلاگین دیگر با `extendPlugin` بسازید، یا هم‌رده‌ها را با `mergePlugin` ترکیب کنید:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

هوک‌های همان‌مرحله ترکیب می‌شوند: `tokens` ابتدا پایه را اجرا می‌کند سپس افزودنی را، `css` دو مشارکت را ادغام می‌کند، و `icons` هر دو را اجرا می‌کند.

## اعتبارسنجی خروجی پلاگین خود

تست مشترک drift از `@pantoken/utils` را روی خروجی خود پلاگین در تست آن اجرا کنید، تا یک اشتباه تایپی یا تغییر نام توکن سریع و محلی شکست بخورد:

```ts
import { danglingReferences, unknownReferences } from "@pantoken/utils";
import { tokens } from "@pantoken/tokens";

// A self-contained contribution defines what it references, so nothing should dangle.
expect(danglingReferences(myPlugin().css!({ tokens, css: "" }).append ?? "")).toEqual([]);

// A contribution that only references tokens defined elsewhere: every target must be a real token.
expect(unknownReferences(myBridgeCss, tokens)).toEqual([]);
```

## پلاگین‌های بسته‌بندی‌شده

- `@pantoken/plugin-simple-icons` — آیکون‌ها را از simple-icons برند می‌کند، و به‌صورت توکن‌های آیکون ثبت می‌کند.
- `@pantoken/plugin-logos` — لوگوهای محصول Instructure را به‌عنوان SVG، داده-URI، و توکن‌های تصویر `--instui-logo-*` عرضه می‌کند.
- `@pantoken/plugin-prune-custom-props` — یک پلاگین PostCSS (نه یک پلاگین pantoken) که پراپرتی‌های سفارشی استفاده‌نشده را از یک stylesheet حذف می‌کند.

چند مورد که قبلاً پلاگین بودند اکنون در `@pantoken/components` عرضه می‌شوند، چون بسیاری از کامپوننت‌ها به‌صورت پیش‌فرض به آنها نیاز دارند: سایه‌های elevation (`--instui-elevation-*`, در `components.css`), حلقه‌ی focus-outline (در `base.css` — هر عنصر قابل فوکوس وقتی pantoken صفحه را مالک است آن را دریافت می‌کند)، و فونت‌های برند Instructure (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` را اعمال می‌کند؛ گزینه‌ی اختیاری `@pantoken/components/fonts.css` فایل‌های woff2 `@font-face` را بارگذاری می‌کند).

برای هر export از پلاگین‌ها به [مراجعه‌نامه API](/api/) مراجعه کنید.
