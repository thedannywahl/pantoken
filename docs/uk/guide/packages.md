# Карта пакетів

pantoken — це монорепозиторій невеликих пакетів з однією метою, згрупованих у бакети. Встановіть той, що
відповідає вашому завданню, або встановіть уніфікований пакет `pantoken` і імпортуйте з його підшляхів (наприклад
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Ядро

Спільна модель і трансформер, на якому будується все інше.

| Package                                                 | What it does                                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/model`](/api/packages/model/src/)           | Zero-dependency TypeScript types: the `Token` shape and the plugin contract.                                       |
| [`@pantoken/core`](/api/packages/core/src/)             | Resolves the upstream tokens and icons into the canonical IR, and renders CSS.                                     |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | The resolved IR vendored as static JSON, per theme, plus the raw Tokens Studio source.                             |
| [`@pantoken/utils`](/api/packages/utils/src/)           | The token resolver, reference regexes, case and color helpers, drift checks, and the token→utility-class emitters. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Build and compose pantoken plugins with `definePlugin`.                                                            |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emit native and platform source.                                                    |

## Формати

Перетворює токени у файловий формат.

| Package                                                | Output                                                                                                                                                                                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typed CSS with `light-dark()` and data-URI icons.                                                                                                                                              |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS variables, resolved to a single mode.                                                                                                                                                                 |
| [`@pantoken/less`](/api/formats/less/src/)             | Less variables.                                                                                                                                                                                            |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus variables.                                                                                                                                                                                          |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | A W3C Design Tokens (DTCG) document.                                                                                                                                                                       |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | The IR as JavaScript and JSON (also listed under Core).                                                                                                                                                    |
| [`@pantoken/icons`](/api/formats/icons/src/)           | An ergonomic view over the icon tokens.                                                                                                                                                                    |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | An icon web font (TTF, WOFF2) plus its CSS.                                                                                                                                                                |
| [`@pantoken/components`](/api/formats/components/src/) | An InstUI-look CSS component library (button, alert, table, and more) plus a base reset with focus ring, prose styling, cross-cutting utilities, and the brand fonts. See [Components](/guide/components). |

## Рендерери

Інтеграції фреймворків та інструментів.

| Package                                                                                                                                          | For                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, and a token provider.               |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | The web component, wired into each framework.              |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-friendly token objects (no CSS variables).      |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` and styled primitives, framework-agnostic. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token setup for Astro sites.                               |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon tokens and swatches in Markdown.                      |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | A markdown-it plugin for icon codes and color swatches.    |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | A type-safe theme for styled-components and Emotion.       |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | A Material UI theme.                                       |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variable bridges for Bootstrap and shadcn/ui.          |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | A Sass settings override and CSS overlay for Foundation.   |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Themes for Docusaurus and VitePress.                       |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | A Mintlify `docs.json` theme (colors + background).        |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | A Storybook theme.                                         |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-styled global CSS for Pendo guides.            |

## Бандлери

Інтеграції інструментів збірки.

| Package                                             | For                                                   |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | A Vite plugin with virtual modules and CSS injection. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` for Next.js `transpilePackages`.       |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | A webpack plugin.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | The `@pantoken;` at-rule.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | A Tailwind preset.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | A Panda CSS preset.                                   |

## Платформи

Цільові нативні та генератори сайтів, які емитуються CLI або їхнім API.

| Package                                                                                        | Output                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift source plus a SwiftPM manifest stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML resources.                     |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                    |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                              |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts for egui or iced.              |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | A WordPress block-theme `theme.json`.      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | A Vanilla Forums `variables.json`.         |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal theme assets.                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo and Jekyll site data.                 |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-friendly values for HTML email.     |

## Дизайн

Для дизайнерських інструментів.

| Package                                           | Output                                                                |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | A Figma Variables payload.                                            |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Color swatches (ASE, GPL, Sketch) plus a viewable SVG specimen sheet. |

## Плагіни

Опціональні трансформації, які розширюють вивід токенів або CSS. Див. [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                    |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Named z-index depths as `--instui-stacking-*` tokens.           |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | The `-with-visual-debug` layout-debugging outline.              |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Brand icons from simple-icons.                                  |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure product logos as SVGs, data URIs, and image tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | A PostCSS plugin that drops unused custom properties.           |

## Інструменти

Інфраструктура збірки, документації та демонстрацій для самої монорепозиторії. Більшість — внутрішні, але модулі
самодостатні, тож їх тут документовано, а деякі публікуються в npm окремо.

| Package                                            | What it does                                                                                                                                                                                          |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generates the unified `pantoken` package barrel and `exports` from its dependencies.                                                                                                                  |
| `@pantoken/validate-generated`                     | The drift gate: checks every generated stylesheet resolves against the token IR.                                                                                                                      |
| [`@pantoken/demo`](/api/tools/demo/src/)           | The self-hosted live-demo runner: resolves a `@demo` spec to an iframe and renders bare HTML/CSS/JS same-origin, token-themed.                                                                        |
| `@cssdoc/core` (external)                          | A generic CSS documentation extractor (TSDoc, for CSS): parses doc-comments + the CSS AST into a model the docs emit as the CSS API reference. Lives in its own repo; consumed via a link dependency. |

`@pantoken/validate-generated` is a run-once script (invoked by `pnpm run ready`), so it has no API
page; the others do.

## Штучний інтелект

Споживчі AI-активи. Вони призначені для проєктів, що використовують pantoken, а не для розробки
pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installs `AGENTS.md`, `llms.txt`, and
  assistant/editor rules (Cursor, Copilot, Windsurf, Claude Code) into a consumer repository.

## Плагіни для розробки

Плагіни, які автори створюють для інструментів, з якими вони працюють, згруповані за хостом. Вони автономні та підлягають публікації.

| Package                                                                                  | Plugs into                                                                             |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: turns a `@demo <provider>:<ref>` block tag into an embeddable demo fence.     |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuilds upstream workspace packages (and dependents) when their source changes. |
