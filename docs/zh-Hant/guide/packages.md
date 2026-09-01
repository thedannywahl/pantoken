# 套件地圖

pantoken 是一個由小型、單一用途套件組成的 monorepo，按群組（bucket）排列。安裝適合你任務的套件，或安裝統一的 `pantoken` 套件並從其子路徑匯入（例如 `pantoken/css`, `pantoken/react`, `pantoken/tailwind`）。

## 核心

所有其他東西建立之上的共用模型與轉換器。

| Package                                                 | 功能說明                                                                                        |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | 無依賴的 TypeScript 型別：`Token` 結構及 plugin 契約。                                          |
| [`@pantoken/core`](/api/packages/core/src/)             | 將上游 tokens 與 icons 解析為標準 IR，並渲染 CSS。                                              |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | 已解析的 IR 以靜態 JSON 形式提供（按主題），以及原始的 Tokens Studio 源。                       |
| [`@pantoken/utils`](/api/packages/utils/src/)           | token 解析器、參照正規表達式、大小寫與色彩輔助、漂移檢查，以及 token→utility-class 的 emitter。 |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | 使用 `definePlugin` 建構與組合 pantoken 插件。                                                  |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — 輸出原生與平台程式碼。                                           |

## 格式（Formats）

將 tokens 轉換為檔案格式。

| Package                                                | 輸出內容                                                                                                                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | 帶有型別的 `@property` CSS，包含 `light-dark()` 與 data-URI 圖示。                                                                                                     |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS 變數，解析為單一模式。                                                                                                                                            |
| [`@pantoken/less`](/api/formats/less/src/)             | Less 變數。                                                                                                                                                            |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus 變數。                                                                                                                                                          |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | 一份 W3C Design Tokens (DTCG) 文件。                                                                                                                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | 以 JavaScript 與 JSON 形式的 IR（也列在核心部分）。                                                                                                                    |
| [`@pantoken/icons`](/api/formats/icons/src/)           | 對 icon tokens 的符合人體工學的檢視介面。                                                                                                                              |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | 一個 icon 網頁字型（TTF、WOFF2）以及其 CSS。                                                                                                                           |
| [`@pantoken/components`](/api/formats/components/src/) | 一套具有 InstUI 風格的 CSS 元件庫（button、alert、table 等）及含 focus ring 的基礎 reset、prose 樣式、跨領域工具類別與品牌字體。參見 [Components](/guide/components)。 |

## 呈現器（Renderers）

框架與工具整合。

| Package                                                                                                                                          | 用途                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks、`<Icon>` 與一個 token provider。        |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | 將 web component 接入各框架。                        |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | 適用於 StyleSheet 的 token 物件（無 CSS 變數）。     |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` 與樣式化原語，框架無關。             |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | 為 Astro 網站準備的 token 設定。                     |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | 在 Markdown 中使用的 icon tokens 與色票。            |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | 一個用於 icon code 與色票的 markdown-it 插件。       |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | 適用於 styled-components 與 Emotion 的型別安全主題。 |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI 主題。                                   |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | 用於 Bootstrap 與 shadcn/ui 的 CSS 變數橋接。        |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Foundation 的 Sass 設定覆寫與 CSS 覆蓋層。           |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Docusaurus 與 VitePress 的主題。                     |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | 一個 Mintlify 的 `docs.json` 主題（色彩 + 背景）。   |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook 主題。                                     |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | 用於 Pendo 指南的 Instructure 風格全局 CSS。         |

## 打包器（Bundlers）

建構工具整合。

| Package                                             | 用途                                                   |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | 一個具有虛擬模組與 CSS 注入功能的 Vite 插件。          |
| [`@pantoken/next`](/api/bundlers/next/src/)         | 為 Next.js 提供的 `withPantoken` `transpilePackages`。 |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | 一個 webpack 插件。                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` 的 at-rule。                              |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | 一個 Tailwind preset。                                 |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | 一個 Panda CSS preset。                                |

## 平台（Platforms）

原生與站點產生器目標，由 CLI 或各自 API 輸出。

| Package                                                                                        | 輸出                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift 原始程式碼以及一個 SwiftPM manifest 範本。 |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML 資源。                               |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose 的 Kotlin。                      |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter 的 Dart。                                |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | 用於 egui 或 iced 的 Rust 常數。                 |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | 一個 WordPress block-theme `theme.json`.         |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | 一個 Vanilla Forums `variables.json`.            |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal 主題資產。                                |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo 與 Jekyll 的網站資料。                      |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | 適合內嵌的 HTML email 值。                       |

## 設計（Design）

設計工具相關。

| Package                                           | 輸出                                              |
| ------------------------------------------------- | ------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | 一份 Figma Variables 的 payload。                 |
| [`@pantoken/swatches`](/api/design/swatches/src/) | 色票（ASE、GPL、Sketch）以及可檢視的 SVG 樣本表。 |

## 插件（Plugins）

可選的轉換器，擴展 token 或 CSS 輸出。參見 [Plugins](/guide/plugins)。

| Package                                                                               | 增加的功能                                                  |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | 命名的 z-index 深度，作為 `--instui-stacking-*` tokens。    |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` 的佈局除錯外框。                       |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | 來自 simple-icons 的品牌圖示。                              |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | 以 SVG、data URIs 與圖像 tokens 提供 Instructure 產品標誌。 |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | 一個會移除未使用 custom properties 的 PostCSS 插件。        |

## 工具（Tools）

為 monorepo 本身提供建構、文件與示範基礎設施。大多為內部使用，但各部分是自包含的，因此在此記錄，部分也會獨立發佈到 npm。

| Package                                            | 功能說明                                                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | 產生統一的 `pantoken` 包的 barrel 與來自其相依項的 `exports`。                                                                                   |
| `@pantoken/validate-generated`                     | 漂移門檻（drift gate）：檢查每個產生的樣式表是否可針對 token IR 正確解析。                                                                       |
| [`@pantoken/demo`](/api/tools/demo/src/)           | 自託管的即時示範執行器：解析 `@demo` 規格到 iframe 並呈現同源的裸 HTML/CSS/JS、以 token 為主題。                                                 |
| `@cssdoc/core` (external)                          | 一個通用的 CSS 文件擷取器（針對 CSS 的 TSDoc）：解析文件註解與 CSS AST 成為 docs 輸出的 CSS API 模型。此工具位於獨立倉庫；以連結相依方式被使用。 |

`@pantoken/validate-generated` 是一個一次性執行腳本（由 `pnpm run ready` 調用），因此沒有 API 頁面；其他套件則有。

## 人工智慧（AI）

面向消費者的 AI 設定資產。這些是供使用 pantoken 的專案使用，而非用於開發 pantoken 本身。

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) 安裝 `AGENTS.md`, `llms.txt`，以及 assistant/editor 規則（Cursor、Copilot、Windsurf、Claude Code）到消費者倉庫中。

## 開發用插件（Dev plugins）

我們為開發時使用的工具所撰寫的插件，按宿主（host）分組。它們是獨立並可發佈的。

| Package                                                                                  | 插入點（Plugs into）                                                    |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc：將 `@demo <provider>:<ref>` block 標籤轉成可嵌入的示範 fence。 |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite：在其來源變更時重建上游工作區套件（及其相依套件）。                |
