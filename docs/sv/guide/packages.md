# Paketkartan

pantoken är ett monorepo av små, endamålspaket grupperade i buckets. Installera det som passar din uppgift, eller installera det enhetliga `pantoken`-paketet och importera från dess subvägar (till exempel `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kärna

Den delade modellen och transformatorn som allt annat bygger på.

| Paket                                                   | Vad det gör                                                                                                      |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | TypeScript-typer utan beroenden: formen `Token` och plugin-kontraktet.                                           |
| [`@pantoken/core`](/api/packages/core/src/)             | Löser uppströms-token och ikoner till den kanoniska IR:n och renderar CSS.                                       |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Den lösta IR:n levererad som statisk JSON, per tema, plus den råa Tokens Studio-källan.                          |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-resolvern, referens-regexer, case- och color-hjälpare, driftkontroller och token→utility-class-emitterare. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Bygg och komponera pantoken-plugins med `definePlugin`.                                                          |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emitera native och plattformspecifik källkod.                                     |

## Format

Gör om tokens till ett filformat.

| Paket                                                  | Output                                                                                                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typad CSS med `light-dark()` och data-URI-ikoner.                                                                                                                                           |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-variabler, lösta till ett enda läge.                                                                                                                                                               |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-variabler.                                                                                                                                                                                         |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-variabler.                                                                                                                                                                                       |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Ett W3C Design Tokens (DTCG) dokument.                                                                                                                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR:n som JavaScript och JSON (också listad under Kärna).                                                                                                                                                |
| [`@pantoken/icons`](/api/formats/icons/src/)           | En ergonomisk vy över ikon-tokens.                                                                                                                                                                      |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Ett ikon-webfont (TTF, WOFF2) plus dess CSS.                                                                                                                                                            |
| [`@pantoken/components`](/api/formats/components/src/) | Ett InstUI-liknande CSS-komponentbibliotek (knapp, alert, tabell och mer) plus en basreset med fokusring, prose-styling, tvärgående utilities och varumärkesfonter. Se [Components](/guide/components). |

## Renderers

Ramverk och verktygsintegrationer.

| Paket                                                                                                                                            | För                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-hooks, `<Icon>` och en token-provider.                  |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Webkomponenten, ansluten i varje ramverk.                     |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-vänliga token-objekt (inga CSS-variabler).         |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` och stylade primitivs, ramverksoberoende.     |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-setup för Astro-sidor.                                  |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikon-tokens och swatches i Markdown.                          |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Ett markdown-it-plugin för ikon-koder och färgswatchar.       |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Ett typesäkert theme för styled-components och Emotion.       |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Ett Material UI-theme.                                        |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variabel-bryggor för Bootstrap och shadcn/ui.             |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Ett Sass-inställningsoverride och CSS-overlay för Foundation. |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Themes för Docusaurus och VitePress.                          |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Ett Mintlify `docs.json`-theme (färger + bakgrund).           |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Ett Storybook-theme.                                          |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stylad global CSS för Pendo-guides.               |

## Bundlers

Byggverktygsintegrationer.

| Paket                                               | För                                                      |
| --------------------------------------------------- | -------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Ett Vite-plugin med virtuella moduler och CSS-injektion. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` för Next.js `transpilePackages`.          |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Ett webpack-plugin.                                      |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;`-at-regeln.                                  |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Ett Tailwind-preset.                                     |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Ett Panda CSS-preset.                                    |

## Plattformar

Native och site-generator-mål, emitterade av CLI:n eller deras egna API.

| Paket                                                                                          | Output                                    |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-källa plus en SwiftPM-manifeststub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML-resurser.                     |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                   |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                             |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-consts för t.ex. egui eller iced.    |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Ett WordPress block-theme `theme.json`.   |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | En Vanilla Forums `variables.json`.       |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal-theme-resurser.                    |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo och Jekyll site-data.                |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-värden vänliga för HTML-email.     |

## Design

För designverktyg.

| Paket                                             | Output                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | En Figma Variables-payload.                                        |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Färgswatchar (ASE, GPL, Sketch) plus ett visningsbart SVG-provark. |

## Plugins

Valfria transformeringar som utökar token- eller CSS-output. Se [Plugins](/guide/plugins).

| Paket                                                                                 | Vad det lägger till                                                  |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Namngivna z-index-djup som `--instui-stacking-*`-tokens.             |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` layout-debugging outline.                       |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Varumärkesikoner från simple-icons.                                  |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure-produktlogotyper som SVGs, data-URI:er och image-tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Ett PostCSS-plugin som tar bort oanvända custom properties.          |

## Verktyg

Bygg-, dokumentations- och demo-infrastruktur för monorepot själv. Det mesta är internt, men delarna är
självständiga, så de dokumenteras här och en del publiceras till npm separat.

| Paket                                              | Vad det gör                                                                                                                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genererar det enhetliga `pantoken`-paketslaget och `exports` från dess beroenden.                                                                                                                         |
| `@pantoken/validate-generated`                     | Drift-gaten: kontrollerar att varje genererad stylesheet löser mot token-IR:n.                                                                                                                            |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Den self-hostade live-demo-runner: löser en `@demo`-spec till en iframe och renderar bar HTML/CSS/JS same-origin, token-temat.                                                                            |
| `@cssdoc/core` (extern)                            | En generisk CSS-dokumentationsutvinnare (TSDoc, för CSS): parser doc-kommentarer + CSS AST till en modell som docs emitterar som CSS API-referens. Lever i ett eget repo; konsumeras via en länkberoende. |

`@pantoken/validate-generated` är ett engångsskript (anropat av `pnpm run ready`), så det har ingen API-sida; de andra har det.

## AI

Konsumentinriktade AI-setup-resurser. Dessa är för projekt som använder pantoken, inte för att utveckla pantoken själv.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installerar `AGENTS.md`, `llms.txt` och
  assistent/editor-regler (Cursor, Copilot, Windsurf, Claude Code) i ett konsumentrepo.

## Dev-plugins

Plugins som författas för verktygen som används, grupperade efter host. De är fristående och publicerbara.

| Paket                                                                                    | Pluggar in i                                                                        |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: gör en `@demo <provider>:<ref>` block-tag till en inbäddbar demo-fence.    |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuildar uppströms workspace-paket (och dependents) när deras källor ändras. |
