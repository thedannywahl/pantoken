# شروع به کار

Pantoken توکن‌ها و آیکن‌های طراحی [Instructure UI](https://instructure.design) را می‌گیرد، یک‌بار آن‌ها را رزولوشن می‌کند و آن مدل واحد را به بسته‌هایی برای پلتفرم‌های متعدد بازشکل می‌دهد: استایل‌شیت‌های ساده، SCSS و Less، React و Vue و Svelte، Tailwind و Panda، بومی Swift و Kotlin، WordPress و Drupal، Figma، و غیره.

کوچک‌ترین بسته‌ی مناسب برای کار خود را نصب کنید. همه چیز همچنین توسط بستهٔ یکپارچه‌ی `pantoken` صادر مجدد می‌شود، بنابراین می‌توانید از آنجا شروع کرده و بعداً محدودتر انتخاب کنید.

## راه‌اندازی پروژهٔ آغازین

سریع‌ترین راه برای امتحان pantoken: یک پروژهٔ آغازین اسکلِفولد کنید که از پیش نصب و متصل شده باشد.

```sh
npx create-pantoken-app
```

پلتفرم‌ها: `components` (HTML/CSS ساده)، `react`, `vue`, `svelte`, `web-components`, `angular`. برای `--dir <path>` و استفادهٔ برنامه‌نویسی شده، به [`@pantoken/scaffold`](https://www.npmjs.com/package/@pantoken/scaffold) مراجعه کنید.

از یک عامل کدنویسی هوش مصنوعی استفاده می‌کنید؟ نصب لازم نیست — آن را مستقیماً به مهارت اشاره دهید:

```prompt
فایل create.pantoken.app/SKILL.md را دریافت کرده و طبق آن پانتوکن را در این پروژه راه‌اندازی کنید.
```

اگر ترجیح می‌دهید قوانین عامل pantoken را به‌طور دائم در ریپو سیم کنید (AGENTS.md، قوانین ویرایشگر، یک کپی محلی از این مهارت)، به‌جای آن `npx @pantoken/ai init` را اجرا کنید.

## مدل توکن

توکن‌ها ویژگی‌های سفارشی CSS با نام `--instui-<group>-<name>` هستند، برای مثال `--instui-color-background-brand` یا `--instui-spacing-space-md`. سه تم عرضه می‌شوند: `rebrand`
(پیش‌فرض، با `light-dark()` جایی که روشن و تاریک متفاوت‌اند)، `canvas`، و `canvasHighContrast`.
آیکن‌ها توکن‌های `<image>` (`--instui-icon-<name>`) هستند که از Lucide به‌علاوهٔ گلایف‌های سفارشی Instructure مشتق شده‌اند.

## استایل‌دهی به یک برنامهٔ وب

استایل‌شیت را نصب کرده و یک‌بار وارد کنید. این فایل هر `--instui-*` را تعریف می‌کند، بنابراین می‌توانید مستقیماً از CSS خود به آن‌ها ارجاع دهید.

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

آیکن‌ها ویژگی‌های سفارشی CSS هستند (`--instui-icon-<name>`). استایل‌شیت را یک‌بار بارگذاری کنید و هر آیکن را به‌عنوان `mask-image` یا `background-image` ارجاع دهید — نیازی به ایمپورت جداگانه برای هر آیکن نیست.

```css
.my-icon {
  mask-image: var(--instui-icon-check-mark);
}
```

### جاوااسکریپت — آیکن تنها در مقابل مجموعهٔ کامل

`@pantoken/icons` دو صادر نام‌گذاری شده را در اختیار می‌گذارد. از `iconsByName` استفاده کنید تا یک آیکن را بدون پیمایش آرایهٔ کامل بیرون بکشید:

```ts
import { iconsByName } from "@pantoken/icons";

const icon = iconsByName.get("check-mark"); // only one lookup
icon?.svg; // inline SVG markup
```

از `icons` زمانی استفاده کنید که به مجموعهٔ کامل نیاز دارید (مثلاً برای ساخت یک پیکر):

```ts
import { icons } from "@pantoken/icons";

icons.length; // ~1,800
icons.filter((i) => i.source === "lucide");
```

هر دو صادر در زمان مقداردهی اولیهٔ ماژول IR کامل را بارگذاری می‌کنند — در این سطح برای هر آیکن درخت‌زدایی صورت نمی‌گیرد. برای بارگذاری سبکتر فقط با CSS، از [CDN picker](/guide/cdn-picker) استفاده کنید تا یک URL ترکیبی برای تنها آیکن‌هایی که نیاز دارید تولید کند.

## تولید برای یک پلتفرم بومی

CLI سورس توکن را در یک ریپوی هدف می‌نویسد. هیچ نصب دیگری فراتر از رانر نیاز نیست:

```sh
npx @pantoken/cli generate swift --out ./ios/Tokens --icons arrow-left,check-mark
```

برای هر هدف به [the pantoken CLI](/guide/cli) مراجعه کنید.

## نکات نویسندگی در VS Code

`@pantoken/pantoken` اکنون فایل‌های دادهٔ سفارشی VS Code را عرضه می‌کند تا پروژه‌های downstream بتوانند بدون نصب یک افزونهٔ اختصاصی pantoken، تکمیل کلاس و توکن را در HTML/CSS دریافت کنند.

1. بستهٔ یکپارچه را نصب کنید:

```sh
npm i @pantoken/pantoken
```

1. VS Code را در workspace مصرف‌کنندهٔ خود به JSON دادهٔ سفارشی عرضه‌شده اشاره دهید:

```json
{
  "html.customData": ["./node_modules/@pantoken/pantoken/dist/html-custom-data.json"],
  "css.customData": ["./node_modules/@pantoken/pantoken/dist/css-custom-data.json"]
}
```

1. VS Code را ری‌لود کنید (یا "Developer: Reload Window" را اجرا کنید) تا دادهٔ جدید اعمال شود.

این پیشنهادها را برای توکن‌های کلاس `instui-*` (و توکن‌های کلاس `-modifier`) به‌علاوهٔ ویژگی‌های سفارشی `--instui-*` فعال می‌کند.

## گام بعدی کجاست

- [نقشهٔ بسته‌ها](/api/) — کدام بسته را برای چه کاری برداریم.
- [@pantoken/ai](/api/ai/pantoken-ai/src/) — دارایی‌ها و قوانین عامل را در یک ریپو مصرف‌کننده نصب کنید.
- [معماری](/guide/architecture) — چگونه مدل توکن، هسته، و خروجی‌ها با هم جور می‌شوند.
- [مرجع API](/api/) — هر نماد صادر شده، تولید شده از سورس.
