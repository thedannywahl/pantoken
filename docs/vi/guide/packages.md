# Bản đồ gói

pantoken là một monorepo gồm các gói nhỏ, chuyên dụng được gom vào các bucket. Cài gói phù hợp với nhiệm vụ của bạn, hoặc cài gói hợp nhất `pantoken` và import từ các subpath của nó (ví dụ `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Core

Mô hình chia sẻ và transformer mà mọi thứ khác xây dựng trên.

| Package                                                 | Chức năng                                                                                                  |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Kiểu TypeScript không phụ thuộc: hình dạng `Token` và hợp đồng plugin.                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | Giải quyết các token và icon upstream thành IR chuẩn, và render CSS.                                       |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR đã được giải quyết đóng gói dưới dạng JSON tĩnh, theo theme, cùng với nguồn Tokens Studio thô.          |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Bộ giải token, regex tham chiếu, trợ giúp case và màu, kiểm tra drift, và bộ emitters token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Xây dựng và ghép các plugin pantoken với `definePlugin`.                                                   |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — phát sinh mã nguồn native và cho từng nền tảng.                             |

## Formats

Biến các token thành định dạng tệp.

| Package                                                | Đầu ra                                                                                                                                                                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS kiểu `@property` với `light-dark()` và icon dạng data-URI.                                                                                                                                                         |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Biến SCSS, được giải quyết thành một chế độ duy nhất.                                                                                                                                                                  |
| [`@pantoken/less`](/api/formats/less/src/)             | Biến Less.                                                                                                                                                                                                             |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Biến Stylus.                                                                                                                                                                                                           |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Một tài liệu W3C Design Tokens (DTCG).                                                                                                                                                                                 |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR dưới dạng JavaScript và JSON (cũng được liệt kê trong Core).                                                                                                                                                        |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Một giao diện tiện dụng cho các icon token.                                                                                                                                                                            |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Một font web icon (TTF, WOFF2) cùng với CSS của nó.                                                                                                                                                                    |
| [`@pantoken/components`](/api/formats/components/src/) | Thư viện component CSS theo giao diện InstUI (button, alert, table, và nhiều hơn nữa) cùng với reset cơ bản kèm focus ring, kiểu prose, utilities xuyên cắt, và font thương hiệu. Xem [Components](/guide/components). |

## Renderers

Tích hợp framework và công cụ.

| Package                                                                                                                                          | Dùng cho                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, và một token provider.                         |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Web component, được nối vào từng framework.                           |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Đối tượng token thân thiện với StyleSheet (không dùng CSS variables). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` và các primitive có style, không phụ thuộc framework. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Thiết lập token cho các site Astro.                                   |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon token và swatches trong Markdown.                                |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Plugin markdown-it cho mã icon và color swatches.                     |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Theme có kiểu an toàn cho styled-components và Emotion.               |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Theme cho Material UI.                                                |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Cầu nối CSS-variable cho Bootstrap và shadcn/ui.                      |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Ghi đè cài đặt Sass và overlay CSS cho Foundation.                    |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Theme cho Docusaurus và VitePress.                                    |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Một theme Mintlify `docs.json` (màu + nền).                           |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Theme cho Storybook.                                                  |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS toàn cục theo style Instructure cho hướng dẫn Pendo.              |

## Bundlers

Tích hợp công cụ build.

| Package                                             | Dùng cho                                        |
| --------------------------------------------------- | ----------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Plugin Vite với virtual modules và chèn CSS.    |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` cho Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Plugin webpack.                                 |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule.                           |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Preset Tailwind.                                |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Preset Panda CSS.                               |

## Platforms

Đầu ra cho native và site-generator, được CLI hoặc API riêng của chúng phát sinh.

| Package                                                                                        | Đầu ra                                   |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Mã Swift cộng với stub manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Tài nguyên Android XML.                  |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts cho egui hoặc iced.          |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Một `theme.json` theme cho WordPress.    |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Một `variables.json` cho Vanilla Forums. |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Tài sản theme cho Drupal.                |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Dữ liệu site cho Hugo và Jekyll.         |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Giá trị thân thiện cho HTML email.       |

## Design

Dành cho công cụ thiết kế.

| Package                                           | Đầu ra                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Payload Figma Variables.                                            |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Color swatches (ASE, GPL, Sketch) cùng với bảng mẫu SVG có thể xem. |

## Plugins

Các transform tùy chọn mở rộng token hoặc đầu ra CSS. Xem [Plugins](/guide/plugins).

| Package                                                                               | Thêm vào                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Độ sâu z-index đặt tên dưới dạng token `--instui-stacking-*`.      |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` outline để debug layout.                      |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Icon thương hiệu từ simple-icons.                                  |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logo sản phẩm Instructure dưới dạng SVG, data URI, và image token. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Plugin PostCSS bỏ các custom properties không dùng.                |

## Tools

Cơ sở hạ tầng build, docs, và demo cho chính monorepo. Phần lớn là nội bộ, nhưng các thành phần tách rời và một số được xuất lên npm riêng.

| Package                                            | Chức năng                                                                                                                                                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Sinh ra gói hợp nhất `pantoken` barrel và `exports` từ các dependency của nó.                                                                                                                        |
| `@pantoken/validate-generated`                     | Cổng drift: kiểm tra mọi stylesheet được tạo có thể được giải quyết so với token IR.                                                                                                                 |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Trình chạy demo live tự-host: giải quyết một spec `@demo` thành iframe và render HTML/CSS/JS cùng nguồn gốc, theo chủ đề token.                                                                      |
| `@cssdoc/core` (external)                          | Bộ trích xuất tài liệu CSS tổng quát (TSDoc cho CSS): phân tích doc-comments + AST CSS thành mô hình mà docs phát ra làm tham chiếu API CSS. Nằm trong repo riêng; tiêu thụ qua dependency liên kết. |

`@pantoken/validate-generated` là script chạy một lần (được gọi bởi `pnpm run ready`), nên không có trang API; các mục khác có.

## AI

Tài sản thiết lập AI dành cho người tiêu dùng. Dùng cho dự án sử dụng pantoken, không phải để phát triển pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) cài đặt `AGENTS.md`, `llms.txt`, và các quy tắc trợ lý/trình soạn thảo (Cursor, Copilot, Windsurf, Claude Code) vào repo tiêu dùng.

## Dev plugins

Plugins do chúng tôi viết cho các công cụ đang dùng, nhóm theo host. Chúng độc lập và có thể publish.

| Package                                                                                  | Cắm vào                                                                                     |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: biến thẻ block `@demo <provider>:<ref>` thành một demo fence có thể nhúng.         |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuild các package workspace upstream (và dependents) khi source của chúng thay đổi. |
