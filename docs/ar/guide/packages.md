# خريطة الحزم

pantoken هو مستودع أحادي (monorepo) يضم حزمًا صغيرة ذات غرض واحد مجمعة في دلاء. ثبّت الحزمة التي
تتناسب مع مهمتك، أو ثبّت الحزمة الموحدة `pantoken` واستورد من المسارات الفرعية الخاصة بها (على سبيل المثال
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## النواة

النموذج المشترك والمحوّل الذي يبني عليه كل شيء آخر.

| Package                                                 | What it does                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | أنواع TypeScript بدون اعتمادات: شكل `Token` وعقدة الإضافات.                                                |
| [`@pantoken/core`](/api/packages/core/src/)             | يحلّل الرموز والأيقونات من المصدر إلى IR القانوني، ويُصدِر CSS.                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR المحلول مبوَّب كـ JSON ثابت، لكل سمة، بالإضافة إلى مصدر Tokens Studio الخام.                            |
| [`@pantoken/utils`](/api/packages/utils/src/)           | محلّل الرموز، تعابير Regex للمرجع، مساعدات للحالة والألوان، فحوصات الانحراف، ومصدّرات token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | بناء وتركيب إضافات pantoken باستخدام `definePlugin`.                                                       |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — يُصدِر مصدرًا أصليًا ومنصّات.                                               |

## الصيغ

تحويل الرموز إلى صيغة ملف.

| Package                                                | Output                                                                                                                                                                                              |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS معنون بنوع `@property` مع `light-dark()` وأيقونات بيانات-URI.                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | متغيرات SCSS، محلولة إلى وضع واحد.                                                                                                                                                                  |
| [`@pantoken/less`](/api/formats/less/src/)             | متغيرات Less.                                                                                                                                                                                       |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | متغيرات Stylus.                                                                                                                                                                                     |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | مستند W3C Design Tokens (DTCG).                                                                                                                                                                     |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR كـ JavaScript و JSON (مذكور أيضًا تحت النواة).                                                                                                                                                   |
| [`@pantoken/icons`](/api/formats/icons/src/)           | عرض مريح على رموز الأيقونات.                                                                                                                                                                        |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | خط أيقونات للويب (TTF, WOFF2) بالإضافة إلى CSS الخاص به.                                                                                                                                            |
| [`@pantoken/components`](/api/formats/components/src/) | مكتبة مكونات CSS بمظهر InstUI (زر، تنبيه، جدول، والمزيد) بالإضافة إلى إعادة تعيين أساسية مع حلقة تركيز، تنسيق prose، أدوات عرض عرضية، وخطوط العلامة التجارية. انظر [Components](/guide/components). |

## العارضون (Renderers)

تكاملات الأطر والأدوات.

| Package                                                                                                                                          | For                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | هوكات React، `<Icon>`، وموفر رموز (token provider).      |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | المكوّن الويب، مُوصَّل في كل إطار عمل.                   |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | كائنات رموز صديقة لـ StyleSheet (بدون متغيرات CSS).      |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` وأوليات منمّقة، مستقلة عن الإطار.        |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | إعداد الرموز لمواقع Astro.                               |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | رموز الأيقونات وعينات الألوان في Markdown.               |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | مكوّن إضافي لmarkdown-it لرموز الأيقونات وعينات الألوان. |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | موضوع نوعي (type-safe) لـ styled-components و Emotion.   |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | موضوع لـ Material UI.                                    |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | جسور متغيرة CSS لـ Bootstrap و shadcn/ui.                |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | تجاوز إعدادات Sass وتراكب CSS لـ Foundation.             |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | سمات لـ Docusaurus و VitePress.                          |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | سمة Mintlify `docs.json` (ألوان + خلفية).                |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | سمة Storybook.                                           |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS عام ذو طراز Instructure لأدلة Pendo.                 |

## البندلرز (Bundlers)

تكاملات أدوات البناء.

| Package                                             | For                                            |
| --------------------------------------------------- | ---------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | إضافة Vite مع وحدات افتراضية وحقن CSS.         |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` لـ Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | إضافة webpack.                                 |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | قاعدة at-rule `@pantoken;`.                    |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | إعداد مسبق (preset) لـ Tailwind.               |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | إعداد مسبق (preset) لـ Panda CSS.              |

## المنصات

أهداف أصلية ومولِّدة مواقع، يتم إصدارها عبر CLI أو واجهة برمجة التطبيقات الخاصة بها.

| Package                                                                                        | Output                                      |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | مصدر Swift بالإضافة إلى مسودّة ملف SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | موارد XML لنظام Android.                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                     |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                               |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | ثوابت Rust لـ egui أو iced.                 |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | قالب WordPress `theme.json`.                |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | منتدى Vanilla `variables.json`.             |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | أصول موضوع Drupal.                          |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | بيانات مواقع Hugo و Jekyll.                 |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | قيم ملائمة للإدراج في بريد HTML.            |

## التصميم

لأدوات التصميم.

| Package                                           | Output                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | حمولة متغيرات Figma.                                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | عيّنات ألوان (ASE, GPL, Sketch) بالإضافة إلى ورقة عيّنات SVG قابلة للعرض. |

## الإضافات (Plugins)

تحويلات اختيارية توسّع مخرجات الرموز أو CSS. انظر [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | أعماق z-index مسمّاة كـ توكنات `--instui-stacking-*`.        |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | حدّة تصحيح تخطيط `-with-visual-debug`.                       |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | رموز العلامات التجارية من simple-icons.                      |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | شعارات منتجات Instructure كـ SVGs، بيانات URIs، وتوكنات صور. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | إضافة PostCSS تحذف الخصائص المخصصة غير المستخدمة.            |

## الأدوات

بنية البناء، التوثيق، والبنية التحتية للعروض التوضيحية للمستودع نفسه. معظمها داخلي، لكن القطع معزولة بذاتها، لذا نوثّقها هنا وبعضها يُنشر إلى npm بمفرده.

| Package                                            | What it does                                                                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | يولّد حزمة البندولات الموحدة `pantoken` و `exports` من تبعياتها.                                                                                                          |
| `@pantoken/validate-generated`                     | بوابة الانحراف: تتحقق أن كل ورقة أنماط مولّدة تحلّ مقابل IR للرموز.                                                                                                       |
| [`@pantoken/demo`](/api/tools/demo/src/)           | مشغّل العرض التوضيحي المستضاف ذاتيًا: يحلّ `@demo` spec إلى إطار iframe ويُعرض HTML/CSS/JS عاري بنفس الأصل، بموضوع الرموز.                                                |
| `@cssdoc/core` (external)                          | مستخرج توثيق CSS عامًا (TSDoc، للـ CSS): يحلل تعليقات التوثيق + شجرة تحليل CSS إلى نموذج تصدره المستندات كمرجع API لـ CSS. يعيش في مستودع خاص به؛ يُستهلك عبر تبعية رابط. |

`@pantoken/validate-generated` هو سكربت يُشغل مرة واحدة (يتم استدعاؤه بواسطة `pnpm run ready`), لذا ليس له صفحة API
؛ أما الباقون فلهم صفحات.

## الذكاء الاصطناعي

أصول إعدادات الذكاء الاصطناعي الموجهة للمستهلك. هذه للمشروعات التي تستخدم pantoken، وليست لتطوير
pantoken نفسه.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) يثبت `AGENTS.md`, `llms.txt`, و
  قواعد المساعد/المحرر (Cursor, Copilot, Windsurf, Claude Code) في مستودع المستهلك.

## الإضافات التطويرية (Dev plugins)

إضافات نؤلفها للأدوات التي نبني بها، مجمّعة حسب المستضيف. هي قائمة بذاتها وقابلة للنشر.

| Package                                                                                  | Plugs into                                                                    |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: يحوّل وسم `@demo <provider>:<ref>` إلى سياج عرض توضيحي قابل للتضمين. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: يعيد بناء حزم مساحة العمل upstream (والتابعين لها) عند تغيّر مصدرها.    |
