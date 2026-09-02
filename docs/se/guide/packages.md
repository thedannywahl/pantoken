# Pakkea mapa

pantoken lea monorepo lágideami, oktavuođa­maš pakkeat mii leat buot fitnodit. Instalera dasa mii
fitneda du borrat, dahje instalera ruovttoluotta `pantoken` pakkea ja importera dan subpaths­sii (geahččat
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Core

Gulahallan modellja ja transformera mii bures muhto ođđa bálvalus.

| Package                                                 | Mii lea dasto dán                                                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | TypeScript mii ii leat sihke-dependenssa: `Token` muhtun ja plugin-kontraktas.                           |
| [`@pantoken/core`](/api/packages/core/src/)             | Riehtaš upstreame tokenat ja ikonat kanonala IR:sse, ja rendere CSS.                                     |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Resolváhtta IR ladduvuohta statiska JSON:s, theme­per, juohke Tokens Studio lohkat.                      |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-resolver, referenssa-regexat, case ja colora aidat, drift-čekkat, ja token→utility-class emitters. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Byggat ja komponera pantoken plugins `definePlugin`.                                                     |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emitera native ja platform source.                                        |

## Formats

Geahččat tokenat file-formahtta.

| Package                                                | Output                                                                                                                                                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typed CSS `light-dark()` ja data-URI ikonain.                                                                                                                                        |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS variables, resolváhtta juo vel gieldda mode.                                                                                                                                                |
| [`@pantoken/less`](/api/formats/less/src/)             | Less variables.                                                                                                                                                                                  |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus variables.                                                                                                                                                                                |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | W3C Design Tokens (DTCG) dokumentta.                                                                                                                                                             |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR JavaScript ja JSON muhto (mahttut Core ala).                                                                                                                                                  |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonomalaš ovtta icon-tokenaid.                                                                                                                                                                 |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Icon web-font (TTF, WOFF2) ja dan CSS.                                                                                                                                                           |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI-nieidda CSS komponenta library (button, alert, table ja moadde) ja base reset focus ring, prose styling, cross-cutting utilities, ja brand fonts. Lávvut [Components](/guide/components). |

## Renderers

Framework ja tool integrasjovat.

| Package                                                                                                                                          | Buorrán                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, ja token provider.                 |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Web-komponentta, vuoigat buktet buohkaide frameworkiin.   |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-friendlaš token-objektat (ii CSS variables).   |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` ja styled primitives, framework-agnostic. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-satteaset Astro-siteide.                            |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon-tokenat ja swatches Markdown:s.                      |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | markdown-it plugin icon-koodain ja color-swatches.        |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Type-safe theme styled-components ja Emotion:in.          |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI theme.                                        |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variable bridgadet Bootstrap ja shadcn/ui:in.         |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass settings override ja CSS overlay Foundation:in.      |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Themes Docusaurus ja VitePress:in.                        |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` theme (colors + background).         |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook theme.                                          |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-styled global CSS Pendo guides:in.            |

## Bundlers

Build-tool integrasjovat.

| Package                                             | Buorrán                                         |
| --------------------------------------------------- | ----------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite plugin virtual modules ja CSS injection.   |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` for Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Webpack plugin.                                 |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule.                           |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind preset.                                |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS preset.                               |

## Platforms

Native ja site-generator målmat, emitera CLI dahje áskkas API.

| Package                                                                                        | Output                                   |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift source plus SwiftPM manifest stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML resources.                   |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts for egui dahje iced.         |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress block-theme `theme.json`.      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.         |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal theme assets.                     |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo ja Jekyll site data.                |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-friendly values HTML email:in.    |

## Design

Dizain-tovdno alat.

| Package                                           | Output                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables payload.                                            |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Color swatches (ASE, GPL, Sketch) plus viewable SVG specimen sheet. |

## Plugins

Valgobasihtat transformassat mii loktet token- dahje CSS-outputta. Lávvut [Plugins](/guide/plugins).

| Package                                                                               | Mii addá                                                       |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Named z-index depths soahkká `--instui-stacking-*` tokens.     |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` layout-debugging outline.                 |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Brand icons simple-icons:st.                                   |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure product logos as SVGs, data URIs, ja image tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | PostCSS plugin mii rohpá unused custom properties.             |

## Tools

Build, docs, ja demo infrastruktuura monorepo:s. Buot lea internal, muhto dasa osat leat
selvagávdnojit, ja osa dajan npm:as oassin.

| Package                                            | Mii dasto                                                                                                                                                                    |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genereraa ruovttoluotta `pantoken` package barrel ja `exports` dari dependenssat.                                                                                            |
| `@pantoken/validate-generated`                     | Drift gate: čekká buot generereda stylesheetat resolváhtte token IR:s.                                                                                                       |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Self-hosted live-demo runner: resolváhtta `@demo` speci iframe:s ja renderera bare HTML/CSS/JS same-origin, token-themed.                                                    |
| `@cssdoc/core` (external)                          | Genearala CSS documentation extractor (TSDoc, CSS): parses doc-comments + CSS AST into model mii docs emit CSS API reference. Lea eanet repos; consumera link-dependenssain. |

`@pantoken/validate-generated` lea run-once skripta (invoked by `pnpm run ready`), dan ii leat API
page; muhtin leat.

## AI

Consumer-facing AI setup assets. Dát leat projekta mii deaddil pantoken, ii pantoken development.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installera `AGENTS.md`, `llms.txt`, ja
  assistant/editor rules (Cursor, Copilot, Windsurf, Claude Code) consumer-repository:in.

## Dev plugins

Plugins mii ovddastallan tools mii buoriheapmi, gruppejuvvo host:in. Dat leat standalona ja publishable.

| Package                                                                                  | Buohká dahje plugga                                                                 |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: garra `@demo <provider>:<ref>` block tag muhto embeddable demo fence.      |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuildar upstream workspace packages (ja dependents) go source muhtun muhto. |
