# پلاگین‌ها

یک پلاگین pantoken خروجی توکن یا CSS را بدون ایجاد یک فورک از بسته گسترش می‌دهد. یکی را با `definePlugin` از `@pantoken/plugin-kit` می‌سازید، سپس آن را به `buildTokens` یا `toCss` می‌دهید.

## نوشتن یک پلاگین

به `definePlugin` هوک‌هایی که پیاده‌سازی می‌کنید را بدهید. این یک پلاگین معمولی برمی‌گرداند که با قابلیت‌هایی که از روی آن هوک‌ها استنباط شده‌اند برچسب‌خورده است. یک پلاگین می‌تواند IR را گسترش دهد (`tokens`, `icons`), خروجی CSS را (`css`), یا هر دو را.

```ts
import { definePlugin } from "@pantoken/plugin-kit";

export const brand = () =>
  definePlugin({
    name: "@acme/brand",
    tokens: (ctx) => [...ctx.tokens /* add records */],
    css: () => ({ append: ":root { /* … */ }" }),
  });
```

## ثبت‌نام آگاه از قابلیت‌ها

`buildTokens` و `toCss` `checkPlugins` را روی پلاگین‌هایی که می‌دهید اجرا می‌کنند. هشدار می‌دهد — اما هرگز خطا پرتاب نمی‌کند — وقتی پلاگینی هوک متناسب با مرحله‌ای که در آن ثبت شده ندارد، بنابراین یک پلاگین فقط-توکن که به `toCss` پاس داده شود با یک یادداشت رد می‌شود به‌جای اینکه بی‌صدا هیچ کاری نکند.

## ترکیب پلاگین‌ها

روی پلاگین دیگری با `extendPlugin` بسازید، یا همتایان را با `mergePlugin` ترکیب کنید:

```ts
import { extendPlugin, mergePlugin } from "@pantoken/plugin-kit";

const themed = extendPlugin(brand(), { css: () => ({ append: "/* extra */" }) });
const both = mergePlugin(brand(), icons());
```

هوک‌های هم‌مرحله ترکیب می‌شوند: `tokens` ابتدا پایه را سپس افزودنی را اجرا می‌کند، `css` دو مشارکت را ادغام می‌کند، و `icons` هر دو را اجرا می‌کند.

## اعتبارسنجی خروجی پلاگین

چک‌های مشترک drift را از `@pantoken/utils` روی خروجی پلاگین خود در تست آن اجرا کنید، تا یک اشتباه تایپی یا تغییر نام توکن سریع و محلی شکست بخورد:

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
- `@pantoken/plugin-logos` — لوگوهای محصول Instructure به‌صورت SVG، داده-URIها، و توکن‌های تصویر `--instui-logo-*`.
- `@pantoken/plugin-prune-custom-props` — یک پلاگین PostCSS (نه پلاگین pantoken) که ویژگی‌های سفارشی استفاده‌نشده را از یک stylesheet حذف می‌کند.

ثبت Lucide Lab را می‌توان به‌صورت lazy بارگذاری کرد، سپس آن را به هوک توکن همگام پاس داد:

```ts
import { buildTokens } from "@pantoken/core/build";
import { defaultRegistry, lucideLab } from "@pantoken/plugin-lucide-lab";

const registry = await defaultRegistry();
buildTokens({
  theme: "rebrand",
  plugins: [lucideLab({ registry, names: ["burger", "at-sign-circle"] })],
});
```

چند مورد که قبلاً پلاگین بودند اکنون در `@pantoken/components` عرضه می‌شوند، چون بسیاری از کامپوننت‌ها به‌صورت پیش‌فرض به آن‌ها نیاز دارند: سایه‌های elevation (`--instui-elevation-*`، در `components.css`), حلقهٔ focus-outline
(در `base.css` — هر عنصر قابل فوکوس آن را وقتی pantoken صفحه را در اختیار دارد دریافت می‌کند)، و فونت‌های برند Instructure (Atkinson Hyperlegible Next: `base.css` `--instui-font-family-base` را اعمال می‌کند؛ `@pantoken/components/fonts.css` اختیاری `@font-face` woff2ها را بارگذاری می‌کند).

برای خروجی‌های صادرشدهٔ هر پلاگین به [مرجع API](/api/) مراجعه کنید.
