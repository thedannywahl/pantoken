# 包映射

pantoken 是一个由按功能分组的小型单一职责包组成的 monorepo。安装适合你任务的包，或安装统一的 `pantoken` 包并从其子路径导入（例如 `pantoken/css`, `pantoken/react`, `pantoken/tailwind`）。

## 核心

共享的模型和其他所有内容构建的转换器。

| Package                                                 | What it does                                                                          |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | 零依赖的 TypeScript 类型：`Token` 结构和插件契约。                                    |
| [`@pantoken/core`](/api/packages/core/src/)             | 将上游 tokens 和图标解析为规范的 IR，并渲染 CSS。                                     |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | 已解析的 IR 作为每个主题的静态 JSON，并包含原始的 Tokens Studio 源。                  |
| [`@pantoken/utils`](/api/packages/utils/src/)           | 令牌解析器、引用正则、大小写和颜色辅助、漂移检查，以及 token→utility-class 的发射器。 |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | 使用 `definePlugin` 构建并组合 pantoken 插件。                                        |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — 发射原生和平台源代码。                                 |

## 格式

将 tokens 转换为文件格式。

| Package                                                | Output                                                                                                                                                |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property` 类型化的 CSS，带有 `light-dark()` 与 data-URI 图标。                                                                                      |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS 变量，解析为单一模式。                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | Less 变量。                                                                                                                                           |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus 变量。                                                                                                                                         |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | 一个 W3C Design Tokens (DTCG) 文档。                                                                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | 作为 JavaScript 和 JSON 的 IR（也列在核心部分）。                                                                                                     |
| [`@pantoken/icons`](/api/formats/icons/src/)           | 针对图标 tokens 的易用视图。                                                                                                                          |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | 一个图标 web 字体（TTF、WOFF2）及其 CSS。                                                                                                             |
| [`@pantoken/components`](/api/formats/components/src/) | 一个具有 InstUI 外观的 CSS 组件库（按钮、警告、表格等）以及带焦点环、正文样式、跨领域工具和品牌字体的基础重置。参见 [Components](/guide/components)。 |

## 渲染器

框架和工具集成。

| Package                                                                                                                                          | For                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React 钩子、`<Icon>`，以及一个 token 提供器。        |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Web 组件，并接入到各个框架中。                       |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | 适用于 StyleSheet 的 token 对象（无 CSS 变量）。     |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` 和样式化原语，框架无关。             |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | 用于 Astro 站点的 token 配置。                       |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Markdown 中的图标 tokens 与色板。                    |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | 一个用于图标代码和颜色色板的 markdown-it 插件。      |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | 为 styled-components 和 Emotion 提供类型安全的主题。 |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | 一个 Material UI 主题。                              |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | 为 Bootstrap 和 shadcn/ui 提供 CSS 变量桥接。        |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | 一个 Sass 设置覆盖和 Foundation 的 CSS 覆盖层。      |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Docusaurus 和 VitePress 的主题。                     |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | 一个 Mintlify `docs.json` 主题（颜色 + 背景）。      |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | 一个 Storybook 主题。                                |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | 用于 Pendo 指南的 Instructure 风格全局 CSS。         |

## 打包器

构建工具集成。

| Package                                             | For                                                    |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | 一个带虚拟模块和 CSS 注入的 Vite 插件。                |
| [`@pantoken/next`](/api/bundlers/next/src/)         | 为 Next.js 提供的 `withPantoken` `transpilePackages`。 |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | 一个 webpack 插件。                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule。                                 |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | 一个 Tailwind 预设。                                   |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | 一个 Panda CSS 预设。                                  |

## 平台

由 CLI 或其自身 API 发出的原生与站点生成器目标。

| Package                                                                                        | Output                                  |
| ---------------------------------------------------------------------------------------------- | --------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift 源代码以及一个 SwiftPM 清单存根。 |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML 资源。                      |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin。                |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart。                          |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | 用于 egui 或 iced 的 Rust 常量。        |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | 一个 WordPress 区块主题 `theme.json`。  |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | 一个 Vanilla Forums `variables.json`。  |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal 主题资源。                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo 和 Jekyll 的站点数据。             |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | 适用于 HTML 邮件的内联友好值。          |

## 设计

针对设计工具。

| Package                                           | Output                                              |
| ------------------------------------------------- | --------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | 一个 Figma Variables 载荷。                         |
| [`@pantoken/swatches`](/api/design/swatches/src/) | 色板（ASE、GPL、Sketch），以及可查看的 SVG 规格表。 |

## 插件

扩展 token 或 CSS 输出的可选转换。参见 [Plugins](/guide/plugins)。

| Package                                                                               | What it adds                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | 作为 `--instui-stacking-*` tokens 的命名 z-index 深度。      |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` 布局调试外框。                          |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | 来自 simple-icons 的品牌图标。                               |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | 以 SVG、data URI 和图像 tokens 形式的 Instructure 产品徽标。 |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | 一个删除未使用自定义属性的 PostCSS 插件。                    |

## 工具

用于 monorepo 本身的构建、文档和演示基础设施。大多数是内部的，但这些部分是自包含的，因此在此记录，有些也单独发布到 npm。

| Package                                            | What it does                                                                                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | 生成统一的 `pantoken` 包桶装和来自其依赖项的 `exports`。                                                                                       |
| `@pantoken/validate-generated`                     | 漂移门控：检查每个生成的样式表是否能针对 token IR 解析。                                                                                       |
| [`@pantoken/demo`](/api/tools/demo/src/)           | 自托管的实时演示运行器：将 `@demo` 规范解析为 iframe，并以同源方式呈现裸 HTML/CSS/JS、token 主题。                                             |
| `@cssdoc/core` (external)                          | 一个通用的 CSS 文档提取器（用于 CSS 的 TSDoc）：将文档注释 + CSS AST 解析为文档发出的 CSS API 引用模型。存在于其自己的仓库；通过链接依赖消费。 |

`@pantoken/validate-generated` 是一个一次性运行脚本（由 `pnpm run ready` 调用），所以它没有 API 页面；其他的都有。

## AI

面向消费者的 AI 设置资产。这些用于使用 pantoken 的项目，而不是用于开发 pantoken 本身。

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) 安装 `AGENTS.md`, `llms.txt`，以及助理/编辑器规则（Cursor、Copilot、Windsurf、Claude Code）到消费者仓库中。

## 开发插件

我们为构建所用工具编写的插件，按宿主分组。它们是独立且可发布的。

| Package                                                                                  | Plugs into                                                            |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc：将 `@demo <provider>:<ref>` 块标签转换为可嵌入的演示代码块。 |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite：当源代码更改时重建上游工作区包（及其依赖项）。                  |
