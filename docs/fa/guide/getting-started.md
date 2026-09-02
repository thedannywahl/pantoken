# شروع سریع

pantoken توکن‌های طراحی و آیکن‌های Instructure UI را یک‌بار حل می‌کند و آن مدل واحد را به بسته‌هایی برای پلتفرم‌های متعدد تبدیل می‌کند: فایل‌های استایل ساده، SCSS و Less، React و Vue و Svelte، Tailwind و Panda، بومی Swift و Kotlin، WordPress و Drupal، Figma، و بیشتر.

بستهٔ کوچک‌تری که برای کارتان مناسب است را نصب کنید. همه چیز همچنین توسط بستهٔ یکپارچهٔ `pantoken` صادر مجدد شده است، بنابراین می‌توانید از آن شروع کنید و بعداً محدوده را کوچک کنید.

## راه‌اندازی یک پروژهٔ شروع‌کننده

سریع‌ترین راه برای امتحان pantoken: یک پروژهٔ شروع‌کننده بسازید که قبلاً pantoken نصب و پیکربندی شده باشد.

```sh
npx create-pantoken-app react
```

پلتفرم‌ها: `components` (HTML/CSS ساده)، `react`، `vue`، `svelte`، `web-components`، `angular`. برای `--dir <path>` و استفادهٔ برنامه‌نویسی به [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) مراجعه کنید.

از یک عامل کدنویسی AI استفاده می‌کنید؟ نیازی به نصب نیست — آن را مستقیماً به مهارت اشاره دهید:

```sh
claude "Fetch https://create.pantoken.app and follow it to set up pantoken in this project."
```

برای Gemini CLI، Cursor CLI، OpenAI Codex CLI، GitHub Copilot CLI، و Amazon Q Developer CLI به همین شکل کار می‌کند — `claude` را با `gemini`، `agent`، `codex`، `copilot -p`، یا `q chat` جابجا کنید. اگر ترجیح می‌دهید قوانین عامل pantoken را به‌طور دائمی در مخزن درج کنید (AGENTS.md، قوانین ویرایشگر، نسخهٔ محلی این مهارت)، به‌جای آن `npx @pantoken/ai init` را اجرا کنید.

## مدل توکن

توکن‌ها متغیرهای سفارشی CSS با نام `--instui-<group>-<name>` هستند، برای مثال `--instui-color-background-brand` یا `--instui-spacing-space-md`. سه تم همراه بسته هستند: `rebrand` (پیش‌فرض، با `light-dark()` جایی که روشن و تاریک متفاوت‌اند)، `canvas`، و `canvasHighContrast`. آیکن‌ها توکن‌های `<image>` (`--instui-icon-<name>`) هستند که از Lucide به‌علاوهٔ گلیف‌های سفارشی Instructure مشتق شده‌اند.

## استایل‌دهی به یک برنامهٔ وب

شیوه‌نامه را نصب کنید و یک‌بار آن را وارد کنید. این فایل همهٔ ویژگی‌های `--instui-*` را تعریف می‌کند، بنابراین می‌توانید مستقیماً از CSS خودتان به آن‌ها ارجاع دهید.

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

## استفاده از آیکن‌ها در هر جا

کامپوننت وب در هر چارچوبی کار می‌کند، بدون نیاز به پورت کردن.

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

آیکن‌ها متغیرهای سفارشی CSS هستند (`--instui-icon-<name>`). یک‌بار شیوه‌نامه را بارگذاری کنید و هر آیکن را به‌عنوان `mask-image` یا `background-image` ارجاع دهید — نیازی به وارد کردن هر آیکن به‌صورت جداگانه نیست.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### جاوااسکریپت — آیکن منفرد در مقابل مجموعهٔ کامل

`@pantoken/icons` دو صادرشدهٔ نام‌گذاری‌شده را افشا می‌کند. از `iconsByName` برای کشیدن یک آیکن بدون پیمایش کل آرایه استفاده کنید:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

وقتی به مجموعهٔ کامل نیاز دارید (مثلاً برای ساخت یک انتخابگر)، از `icons` استفاده کنید:

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

هر دو صادرشده در اولیه‌سازی ماژول IR کامل را بارگذاری می‌کنند — در این سطح پاکت درختی (tree-shaking) به ازای هر آیکن وجود ندارد. برای بارگذاری کم‌حجم فقط-CSS، از [CDN picker](/guide/cdn-picker) برای تولید یک URL ترکیبی فقط برای آیکن‌های مورد نیازتان استفاده کنید.

## تولید برای یک پلتفرم بومی

CLI منبع توکن را در یک مخزن هدف می‌نویسد. فراتر از رانر نیازی به نصب نیست:

```sh
npx pantoken generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

برای هر هدف به [the pantoken CLI](/guide/cli) مراجعه کنید.

## راهنمایی‌های نویسندگی در VS Code

`@pantoken/pantoken` اکنون فایل‌های custom-data مخصوص VS Code را همراه می‌آورد تا پروژه‌های مصرف‌کننده بتوانند تکمیل کلاس و توکن را در HTML/CSS بدون نصب افزونهٔ مخصوص pantoken دریافت کنند.

1. بستهٔ یکپارچه را نصب کنید:

```sh
npm i @pantoken/pantoken
```

1. VS Code را از فضای کاری مصرف‌کننده‌تان به JSON دادهٔ custom-data توزیع‌شده اشاره دهید:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. VS Code را مجدداً بارگیری کنید (یا "Developer: Reload Window" را اجرا کنید) تا دادهٔ جدید اعمال شود.

این پیشنهادات را برای توکن‌های کلاس `instui-*` (و توکن‌های کلاس `-modifier`) به‌علاوهٔ ویژگی‌های سفارشی `--instui-*` فعال می‌کند.

## قدم بعدی کجاست

- [نقشهٔ بسته‌ها](/guide/packages) — برای هر کار کدام بسته را باید انتخاب کرد.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — دارایی‌ها و قوانین عامل را در یک مخزن مصرف‌کننده نصب کنید.
- [معماری](/guide/architecture) — چگونگی تطبیق مدل توکن، هسته، و خروجی‌ها.
- [مراجع API](/api/) — هر نماد صادرشده، تولیدشده از منبع.
