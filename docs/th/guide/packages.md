# แผนที่แพ็กเกจ

pantoken เป็น monorepo ของแพ็กเกจขนาดเล็กที่มุ่งจุดประสงค์เดียว จัดกลุ่มเป็นบัคเก็ต ติดตั้งตัวที่เหมาะกับงานของคุณ หรือจะติดตั้งแพ็กเกจรวม `pantoken` แล้วนำเข้าจาก subpaths ของมัน (เช่น `pantoken/css`, `pantoken/react`, `pantoken/tailwind`) ก็ได้

## แกนหลัก

โมเดลร่วมและตัวแปลงที่ทุกอย่างอื่นสร้างขึ้นบน

| Package                                                 | What it does                                                                                                          |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | TypeScript types แบบไม่มี dependency: รูปร่าง `Token` และสัญญา plugin.                                                |
| [`@pantoken/core`](/api/packages/core/src/)             | แปลงโทเค็นและไอคอน upstream เป็น IR แบบ canonical และเรนเดอร์ CSS.                                                    |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR ที่ถูก resolve แล้วซึ่งบรรจุเป็น JSON แบบสแตติก ต่อธีม รวมทั้งแหล่ง Tokens Studio ดิบ.                             |
| [`@pantoken/utils`](/api/packages/utils/src/)           | ตัวแก้ไขโทเค็น, regex อ้างอิง, ตัวช่วยจัดการ case และสี, การตรวจสอบ drift, และตัว emitter สำหรับ token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | สร้างและประกอบแพลตฟอร์ม pantoken plugins ด้วย `definePlugin`.                                                         |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — ออกซอร์สต้นทางสำหรับ native และแพลตฟอร์มต่างๆ.                                         |

## รูปแบบ (Formats)

แปลงโทเค็นเป็นไฟล์รูปแบบต่างๆ

| Package                                                | Output                                                                                                                                                                                       |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS ที่ typed แบบ `@property` พร้อม `light-dark()` และไอคอนเป็น data-URI.                                                                                                                    |
| [`@pantoken/scss`](/api/formats/scss/src/)             | ตัวแปร SCSS ที่ resolve เป็นโหมดเดี่ยว.                                                                                                                                                      |
| [`@pantoken/less`](/api/formats/less/src/)             | ตัวแปร Less.                                                                                                                                                                                 |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | ตัวแปร Stylus.                                                                                                                                                                               |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | เอกสาร W3C Design Tokens (DTCG).                                                                                                                                                             |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR ในรูปแบบ JavaScript และ JSON (มีระบุไว้ภายใต้ Core ด้วย).                                                                                                                                 |
| [`@pantoken/icons`](/api/formats/icons/src/)           | มุมมองที่สะดวกสำหรับไอคอนโทเค็น.                                                                                                                                                             |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | ไอคอนเว็บฟอนต์ (TTF, WOFF2) พร้อม CSS ของมัน.                                                                                                                                                |
| [`@pantoken/components`](/api/formats/components/src/) | ไลบรารีคอมโพเนนต์ CSS แบบ InstUI-look (ปุ่ม, แจ้งเตือน, ตาราง, ฯลฯ) พร้อมรีเซ็ตฐาน, focus ring, การจัดรูปแบบ prose, utilities ข้ามพื้นที่ และฟอนต์แบรนด์ ดู [Components](/guide/components). |

## เรนเดอร์ (Renderers)

การผสานรวมกับเฟรมเวิร์กและเครื่องมือ

| Package                                                                                                                                          | For                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, และ token provider.                      |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | ไวร์เว็บคอมโพเนนต์เข้าแต่ละเฟรมเวิร์ก.                          |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | ออบเจ็กต์โทเค็นที่เป็นมิตรกับ StyleSheet (ไม่มี CSS variables). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` และ primitive ที่ styled, ไม่ขึ้นกับเฟรมเวิร์ก. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | การตั้งค่าโทเค็นสำหรับไซต์ Astro.                               |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | ไอคอนโทเค็นและ swatches ใน Markdown.                            |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | ปลั๊กอิน markdown-it สำหรับโค้ดไอคอนและ color swatches.         |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | ธีมที่ type-safe สำหรับ styled-components และ Emotion.          |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | ธีมสำหรับ Material UI.                                          |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | สะพาน CSS-variable สำหรับ Bootstrap และ shadcn/ui.              |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | การแทนค่าการตั้งค่า Sass และ overlay CSS สำหรับ Foundation.     |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | ธีมสำหรับ Docusaurus และ VitePress.                             |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | ธีม Mintlify `docs.json` (สี + พื้นหลัง).                       |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | ธีมสำหรับ Storybook.                                            |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS โกลบอลสไตล์ Instructure สำหรับคำแนะนำ Pendo.                |

## Bundlers

การผสานรวมกับเครื่องมือสร้าง

| Package                                             | For                                                |
| --------------------------------------------------- | -------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | ปลั๊กอิน Vite ที่มี virtual modules และการฉีด CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` สำหรับ Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | ปลั๊กอิน webpack.                                  |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | at-rule `@pantoken;`.                              |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | preset สำหรับ Tailwind.                            |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | preset สำหรับ Panda CSS.                           |

## แพลตฟอร์ม (Platforms)

เป้าหมาย native และ site-generator ที่ถูกปล่อยโดย CLI หรือตัว API ของพวกมันเอง

| Package                                                                                        | Output                                       |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | ซอร์ส Swift พร้อมสเตับ manifest ของ SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | แหล่งทรัพยากร Android XML.                   |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                      |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts สำหรับ egui หรือ iced.           |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress block-theme `theme.json`.          |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.             |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | แอสเซ็ตธีม Drupal.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | ข้อมูลไซต์สำหรับ Hugo และ Jekyll.            |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | ค่าที่เหมาะสำหรับการฝังในอีเมล HTML.         |

## การออกแบบ (Design)

สำหรับเครื่องมือออกแบบ

| Package                                           | Output                                                   |
| ------------------------------------------------- | -------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | payload ของ Figma Variables.                             |
| [`@pantoken/swatches`](/api/design/swatches/src/) | ชุดสี (ASE, GPL, Sketch) พร้อมแผ่นตัวอย่าง SVG ที่ดูได้. |

## ปลั๊กอิน (Plugins)

การแปลงแบบเลือกได้ที่ขยายผลลัพธ์โทเค็นหรือ CSS ดู [Plugins](/guide/plugins)

| Package                                                                               | What it adds                                                     |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | ความลึก z-index ที่ตั้งชื่อเป็นโทเค็น `--instui-stacking-*`.     |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | ขอบ outline สำหรับการดีบักการจัดวาง `-with-visual-debug`.        |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | ไอคอนแบรนด์จาก simple-icons.                                     |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | โลโก้ผลิตภัณฑ์ Instructure เป็น SVG, data URI, และ image tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | ปลั๊กอิน PostCSS ที่ตัด custom properties ที่ไม่ได้ใช้.          |

## เครื่องมือ (Tools)

โครงสร้างพื้นฐานสำหรับการสร้าง เอกสาร และเดโมของ monorepo เอง ส่วนใหญ่เป็นภายใน แต่ส่วนประกอบแยกกันได้ ดังนั้นจึงมีเอกสารที่นี่และบางส่วนถูกปล่อยขึ้น npm แยก

| Package                                            | What it does                                                                                                                                                                  |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | สร้างแพ็กเกจเบเรลรวม `pantoken` และ `exports` จาก dependencies ของมัน.                                                                                                        |
| `@pantoken/validate-generated`                     | ประตูตรวจสอบ drift: ตรวจสอบว่า stylesheets ที่สร้างทั้งหมด resolve กับ token IR หรือไม่.                                                                                      |
| [`@pantoken/demo`](/api/tools/demo/src/)           | ตัวรันเดโมแบบ self-hosted: resolve สเปค `@demo` เป็น iframe และเรนเดอร์ HTML/CSS/JS แบบ same-origin ที่มีธีมโทเค็น.                                                           |
| `@cssdoc/core` (external)                          | ตัวสกัดเอกสาร CSS ทั่วไป (TSDoc สำหรับ CSS): แยก doc-comments + CSS AST เป็นโมเดลที่เอกสารใช้เป็นการอ้างอิง CSS API. อยู่ในรีโพของตัวเอง; ถูกนำมาใช้เป็น dependency แบบลิงก์. |

`@pantoken/validate-generated` เป็นสคริปต์ที่รันครั้งเดียว (ถูกเรียกโดย `pnpm run ready`), ดังนั้นจึงไม่มีหน้าจำนวน API; อันอื่นๆ มีหน้า

## AI

ทรัพยากรการตั้งค่า AI สำหรับผู้บริโภค ไฟล์เหล่านี้สำหรับโปรเจกต์ที่ใช้ pantoken ไม่ใช่สำหรับการพัฒนา pantoken เอง

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) ติดตั้ง `AGENTS.md`, `llms.txt`, และกฎผู้ช่วย/ตัวแก้ไข (Cursor, Copilot, Windsurf, Claude Code) ลงใน repository ของผู้บริโภค

## ปลั๊กอินสำหรับการพัฒนา (Dev plugins)

ปลั๊กอินที่ผู้เขียนสำหรับเครื่องมือที่ใช้ จัดกลุ่มตาม host แยกกันและสามารถปล่อยได้

| Package                                                                                  | Plugs into                                                                                 |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: แปลงแท็กบล็อก `@demo <provider>:<ref>` เป็นเฟนซ์เดโมที่ฝังได้.                    |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: สร้างใหม่แพ็กเกจ upstream ของ workspace (และ dependents) เมื่อซอร์สของพวกมันเปลี่ยน. |
