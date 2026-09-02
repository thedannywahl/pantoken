# نقشهٔ بسته‌ها

pantoken یک مونورپو از بسته‌های کوچک و تک‌منظوره است که در «باکت»ها گروه‌بندی شده‌اند. بسته‌ای را نصب کنید که
با کار شما سازگار است، یا بستهٔ یکپارچهٔ `pantoken` را نصب کرده و از زیرمسیرهای آن وارد کنید (برای مثال
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## هسته

مدل مشترک و مبدلِ پایه‌ای که سایر موارد روی آن ساخته می‌شوند.

| Package                                                 | What it does                                                                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | تایپ‌های TypeScript بدون وابستگی: شکل `Token` و قرارداد افزونه.                                             |
| [`@pantoken/core`](/api/packages/core/src/)             | رزولوشن توکن‌ها و آیکون‌های upstream به IR کاننیکال، و رندر CSS.                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR رزولوشده به‌صورت JSON ایستا، به‌ازای هر تم، به‌علاوهٔ سورس خام Tokens Studio.                            |
| [`@pantoken/utils`](/api/packages/utils/src/)           | حل‌کنندهٔ توکن، regexهای ارجاع، کمکی‌های حالت و رنگ، بررسی‌های drift، و emit‌کننده‌های token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | ساخت و ترکیب پلاگین‌های pantoken با `definePlugin`.                                                         |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — تولید سورس‌های بومی و پلتفرم.                                                |

## فرمت‌ها

تبدیل توکن‌ها به یک فرمت فایل.

| Package                                                | Output                                                                                                                                                                                                |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS نوع‌دار با `@property` و آیکون‌های data-URI.                                                                                                                                                      |
| [`@pantoken/scss`](/api/formats/scss/src/)             | متغیرهای SCSS، رزولوشن‌شده به یک حالت واحد.                                                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | متغیرهای Less.                                                                                                                                                                                        |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | متغیرهای Stylus.                                                                                                                                                                                      |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | یک سند W3C Design Tokens (DTCG).                                                                                                                                                                      |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR به‌صورت JavaScript و JSON (همچنین زیر بخش هسته فهرست شده).                                                                                                                                         |
| [`@pantoken/icons`](/api/formats/icons/src/)           | نمایی ارگونومیک از توکن‌های آیکون.                                                                                                                                                                    |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | یک فونت وب آیکون (TTF, WOFF2) به‌علاوهٔ CSS آن.                                                                                                                                                       |
| [`@pantoken/components`](/api/formats/components/src/) | یک کتابخانهٔ مؤلفهٔ CSS با ظاهر InstUI (دکمه، هشدار، جدول و غیره) به‌علاوهٔ یک ریست پایه با حلقهٔ فوکوس، استایل‌های prose، ابزارهای بین‌بخش، و فونت‌های برند. ببینید [Components](/guide/components). |

## رندرها

ادغام با فریم‌ورک‌ها و ابزارها.

| Package                                                                                                                                          | For                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | هوک‌های React, `<Icon>`, و یک ارائه‌دهندهٔ توکن.             |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | کامپوننت وب، متصل‌شده به هر فریم‌ورک.                        |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | آبجکت‌های توکن سازگار با StyleSheet (بدون متغیرهای CSS).     |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` و پرمیمیت‌های استایل‌شده، مستقل از فریم‌ورک. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | پیکربندی توکن برای سایت‌های Astro.                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | توکن‌های آیکون و پالت‌ها در Markdown.                        |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | یک پلاگین markdown-it برای کدهای آیکون و نمونه‌های رنگ.      |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | یک تم type-safe برای styled-components و Emotion.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | یک تم Material UI.                                           |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | پل‌های متغیر CSS برای Bootstrap و shadcn/ui.                 |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | یک override تنظیمات Sass و پوشش CSS برای Foundation.         |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | تم‌ها برای Docusaurus و VitePress.                           |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | یک تم Mintlify `docs.json` (رنگ‌ها + پس‌زمینه).              |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | یک تم Storybook.                                             |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS سراسری به‌سبک Instructure برای راهنماهای Pendo.          |

## باندلرها

ادغام با ابزارهای ساخت.

| Package                                             | For                                              |
| --------------------------------------------------- | ------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | یک پلاگین Vite با ماژول‌های مجازی و تزریق CSS.   |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` برای Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | یک پلاگین webpack.                               |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | دستور at-rule `@pantoken;`.                      |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | یک preset برای Tailwind.                         |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | یک preset برای Panda CSS.                        |

## پلتفرم‌ها

اهداف بومی و تولیدشده برای مولدهای سایت، تولیدشده توسط CLI یا API خودشان.

| Package                                                                                        | Output                                          |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | سورس Swift به‌علاوهٔ یک stub برای SwiftPM.      |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | منابع XML اندروید.                              |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                         |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                   |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | constهای Rust برای مثال برای egui یا iced.      |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | یک `theme.json` قالب بلاک وردپرس.               |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | یک `variables.json` برای Vanilla Forums.        |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | دارایی‌های تم Drupal.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | داده‌های سایت برای Hugo و Jekyll.               |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | مقادیر مناسب برای نمایش درون‌خطی در ایمیل HTML. |

## طراحی

برای ابزارهای طراحی.

| Package                                           | Output                                                                 |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | یک payload برای Figma Variables.                                       |
| [`@pantoken/swatches`](/api/design/swatches/src/) | سواچ‌های رنگ (ASE, GPL, Sketch) به‌علاوهٔ صفحهٔ نمونهٔ SVG قابل‌نمایش. |

## پلاگین‌ها

تبدیلات اختیاری که خروجی توکن یا CSS را گسترش می‌دهند. ببینید [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                          |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | عمق‌های z-index نام‌گذاری‌شده به‌صورت توکن‌های `--instui-stacking-*`. |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | حاشیهٔ خط‌کشِ debugِ طرح‌بندی `-with-visual-debug`.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | آیکون‌های برند از simple-icons.                                       |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | لوگوهای محصولات Instructure به‌صورت SVG، data URI و توکن‌های تصویری.  |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | یک پلاگین PostCSS که custom propertyهای استفاده‌نشده را حذف می‌کند.   |

## ابزارها

زیرساخت ساخت، مستندسازی و دمو برای خودِ مونورپو. بیشتر آن داخلی است، اما قطعات مستقل‌اند، پس اینجا مستندسازی شده‌اند و بعضی‌ها جداگانه به npm منتشر می‌شوند.

| Package                                            | What it does                                                                                                                                                                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | تولید بشکهٔ یکپارچهٔ `pantoken` و `exports` از وابستگی‌های آن.                                                                                                                                                           |
| `@pantoken/validate-generated`                     | دروازهٔ drift: بررسی می‌کند که هر stylesheet تولیدشده با IR توکن‌ها رزولوشن شود.                                                                                                                                         |
| [`@pantoken/demo`](/api/tools/demo/src/)           | رانر دمو زندهٔ خود میزبانی‌شده: یک مشخصهٔ `@demo` را به iframe رزولوشن می‌کند و HTML/CSS/JS خام هم‌مبدأ، با تم توکن را رندر می‌کند.                                                                                      |
| `@cssdoc/core` (external)                          | یک استخراج‌کنندهٔ مستندات CSS عمومی (TSDoc برای CSS): کامنت‌های doc و AST CSS را به مدلی تبدیل می‌کند که docs به‌عنوان مرجع CSS API منتشر می‌کنند. در یک مخزن جداگانه زندگی می‌کند؛ از طریق link dependency مصرف می‌شود. |

`@pantoken/validate-generated` یک اسکریپت یک‌بار-اجرا است (توسط `pnpm run ready` فراخوانی می‌شود)، بنابراین صفحهٔ API ندارد؛ سایرین صفحهٔ API دارند.

## هوش مصنوعی

دارایی‌های راه‌اندازی AI مناسب مصرف‌کننده. این‌ها برای پروژه‌هایی هستند که از pantoken استفاده می‌کنند، نه برای توسعهٔ خود pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) `AGENTS.md`, `llms.txt` و
  قوانین دستیار/ویرایشگر (Cursor, Copilot, Windsurf, Claude Code) را در یک مخزن مصرف‌کننده نصب می‌کند.

## پلاگین‌های توسعه‌دهنده

پلاگین‌هایی که برای ابزارهایی که با آن‌ها کار می‌کنیم می‌نویسیم، بر اساس میزبان گروه‌بندی شده‌اند. این‌ها مستقل و قابل انتشار هستند.

| Package                                                                                  | Plugs into                                                                                 |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: یک تگ بلوک `@demo <provider>:<ref>` را به یک fence دموی قابل جاسازی تبدیل می‌کند. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: بسته‌های workspace upstream را (و وابستگانشان) هنگام تغییر سورس دوباره می‌سازد.      |
