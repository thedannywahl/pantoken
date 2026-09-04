# شروع

Pantoken توکن‌ها و آیکون‌های طراحی [Instructure UI](https://instructure.design) را می‌گیرد، یک‌بار حل‌وفصل می‌کند و آن مدل واحد را به بسته‌هایی برای پلتفرم‌های مختلف بازشکل می‌دهد: شیوه‌نامه‌های ساده، SCSS و Less، React و Vue و Svelte، Tailwind و Panda، بومی Swift و Kotlin، WordPress و Drupal، Figma و موارد دیگر.

کوچک‌ترین بسته‌ای که با کارتان سازگار است را نصب می‌کنید. همه‌چیز همچنین توسط بسته‌ی یکپارچه `pantoken` دوباره صادر می‌شود، بنابراین می‌توانید از آنجا شروع کنید و بعداً محدودتر انتخاب کنید.

## اسکَفولد یک پروژهٔ شروع‌کننده

سریع‌ترین روش برای امتحان pantoken: اسکَفولد کردن یک پروژهٔ شروع‌کننده که قبلاً نصب و پیکربندی شده است.

```sh
npx create-pantoken-app
```

پلتفرم‌ها: `components` (HTML/CSS ساده)، `react`، `vue`، `svelte`، `web-components`، `angular`. برای `--dir <path>` و استفادهٔ برنامه‌نویسی، به [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) مراجعه کنید.

از عامل کدنویسی AI استفاده می‌کنید؟ نیازی به نصب نیست — مستقیم به مهارت اشاره کنید:

```prompt
فایل create.pantoken.app/SKILL.md را بگیرید و طبق آن عمل کنید تا pantoken را در این پروژه راه‌اندازی کنید.
```

اگر دوست دارید قواعد عامل pantoken را به‌طور دائمی در مخزن متصل کنید (AGENTS.md، قواعد ویرایشگر، یک کپی محلی از این مهارت)، به‌جای آن `npx @pantoken/ai init` را اجرا کنید.

## مدل توکن‌ها

توکن‌ها متغیرهای سفارشی CSS با نام `--instui-<group>-<name>` هستند، برای مثال `--instui-color-background-brand` یا `--instui-spacing-space-md`. سه تم عرضه می‌شوند: `rebrand`
(پیش‌فرض، با `light-dark()` جایی که روشن و تیره تفاوت دارند)، `canvas`، و `canvasHighContrast`.
آیکون‌ها توکن‌های `<image>` (`--instui-icon-<name>`) هستند که از Lucide به‌علاوهٔ گلایف‌های سفارشی Instructure مشتق شده‌اند.

## استایل دادن به یک اپ وب

شیوه‌نامه را نصب و یک‌بار وارد کنید. این فایل هر `--instui-*` را تعریف می‌کند، بنابراین می‌توانید مستقیماً از آن‌ها در CSS خود ارجاع دهید.

```sh
npm i @pantoken/css
```

```ts
import "@pantoken/css/inject";
```

```css
.button {
  background: var(--instui-color-background-brand);
  padding: var(--instui-spacing-space-md);
}
```

## استفاده از آیکون‌ها در هر جایی

وب‌کامپوننت در هر فریم‌ورکی کار می‌کند، بدون نیاز به پورت کردن.

```sh
npm i @pantoken/web-components
```

```ts
import "@pantoken/web-components";
```

```html
<instui-icon name="check-mark"></instui-icon>
```

### توکن‌های CSS

آیکون‌ها متغیرهای سفارشی CSS هستند (`--instui-icon-<name>`). شیوه‌نامه را یک‌بار بارگذاری کنید و هر آیکون را به‌عنوان `mask-image` یا `background-image` ارجاع دهید — نیازی به وارد کردن جداگانهٔ هر آیکون نیست.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### جاوااسکریپت — آیکون واحد در مقابل مجموعهٔ کامل

`@pantoken/icons` دو صادرات نام‌گذاری‌شده را افشا می‌کند. از `iconsByName` استفاده کنید تا یک آیکون را بدون پیمایش آرایهٔ کامل بیرون بکشید:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

وقتی به مجموعهٔ کامل نیاز دارید (مثلاً برای ساخت یک انتخاب‌گر)، از `icons` استفاده کنید:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

هر دو صادرات در مقداردهی اولیهٔ ماژول IR کامل را بارگذاری می‌کنند — در این سطح درختِ شِیکینگ برای هر آیکون وجود ندارد. برای بارگذاری صرفاً سبک CSS سبک‌تر، از [CDN picker](/guide/cdn-picker) استفاده کنید تا یک URL ترکیبی فقط برای آیکون‌هایی که نیاز دارید تولید کند.

## تولید برای یک پلتفرم بومی

CLI منبع توکن را در یک مخزن هدف می‌نویسد. نیازی به نصب فراتر از رانِر نیست:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

برای هر هدف به [the pantoken CLI](/guide/cli) مراجعه کنید.

## نکات نویسندگی در VS Code

`@pantoken/pantoken` اکنون فایل‌های custom-data مخصوص VS Code را عرضه می‌کند تا پروژه‌های مصرف‌کننده بتوانند تکمیل کلاس و توکن را در HTML/CSS بدون نصب افزونهٔ خاص pantoken دریافت کنند.

1. بستهٔ یکپارچه را نصب کنید:

```sh
npm i @pantoken/pantoken
```

1. VS Code را از فضای کاری مصرف‌کننده‌تان به JSON دادهٔ سفارشی عرضه‌شده اشاره دهید:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. VS Code را ری‌لود کنید (یا "Developer: Reload Window" را اجرا کنید) تا دادهٔ جدید اعمال شود.

این پیشنهادها را برای توکن‌های کلاس `instui-*` (و توکن‌های کلاس `-modifier`) به‌علاوهٔ متغیرهای سفارشی `--instui-*` فعال می‌کند.

## گام بعدی کجاست

- [نقشهٔ بسته‌ها](/guide/packages) — چه بسته‌ای برای کدام کار مناسب است.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — نصب دارایی‌ها و قواعد عامل در یک مخزن مصرف‌کننده.
- [معماری](/guide/architecture) — اینکه مدل توکن، هسته و خروجی‌ها چگونه کنار هم قرار می‌گیرند.
- [مرجع API](/api/) — هر نماد صادرشده، که از منبع تولید شده است.
