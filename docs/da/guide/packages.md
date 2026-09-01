# Pakkeoversigten

pantoken er et monorepo af små, enkeltformåls-pakker grupperet i buckets. Installer den, der passer til din opgave, eller installer den samlede `pantoken` pakke og importer fra dens understier (for eksempel `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kerne

Den delte model og transformeren som alt andet bygger på.

| Pakke                                                   | Hvad den gør                                                                                                |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | TypeScript-typer uden afhængigheder: `Token` formen og plugin-kontrakten.                                   |
| [`@pantoken/core`](/api/packages/core/src/)             | Løser de upstream tokens og ikoner til den kanoniske IR, og renderer CSS.                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Den resolvede IR leveret som statisk JSON, per tema, plus den rå Tokens Studio-kilde.                       |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-resolveren, reference-regexes, case- og farvehjælpere, drift-checks, og token→utility-class emitters. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Byg og komponér pantoken-plugins med `definePlugin`.                                                        |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emitter native og platform-kilde.                                            |

## Formater

Omsæt tokens til et filformat.

| Pakke                                                  | Output                                                                                                                                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typet CSS med `light-dark()` og data-URI ikoner.                                                                                                                                           |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-variabler, resolved til en enkelt mode.                                                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-variabler.                                                                                                                                                                                        |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-variabler.                                                                                                                                                                                      |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Et W3C Design Tokens (DTCG) dokument.                                                                                                                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR'en som JavaScript og JSON (også listet under Kerne).                                                                                                                                                |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Et ergonomisk overblik over ikon-tokens.                                                                                                                                                               |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | En ikon-webfont (TTF, WOFF2) plus dens CSS.                                                                                                                                                            |
| [`@pantoken/components`](/api/formats/components/src/) | Et InstUI-look CSS komponentbibliotek (button, alert, table og mere) plus en base-reset med focus ring, prose-styling, tværgående utilities, og brand-typografier. Se [Components](/guide/components). |

## Renderers

Framework- og værktøjsintegrationer.

| Pakke                                                                                                                                            | Til                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-hooks, `<Icon>`, og en token-provider.               |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Webkomponenten, koblet ind i hvert framework.              |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-venlige token-objekter (ingen CSS-variabler).   |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` og styled primitives, framework-agnostisk. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-opsætning til Astro-sites.                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikon-tokens og swatches i Markdown.                        |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | En markdown-it plugin til ikon-koder og farveswatches.     |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Et typesikkert tema til styled-components og Emotion.      |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Et Material UI-tema.                                       |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variabel-broer for Bootstrap og shadcn/ui.             |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | En Sass settings-override og CSS-overlay til Foundation.   |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Temaer til Docusaurus og VitePress.                        |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Et Mintlify `docs.json` tema (farver + baggrund).          |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Et Storybook-tema.                                         |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stylet global CSS til Pendo-guides.            |

## Bundlers

Build-værktøjsintegrationer.

| Pakke                                               | Til                                                    |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | En Vite-plugin med virtuelle moduler og CSS-injektion. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` til Next.js `transpilePackages`.        |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | En webpack-plugin.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-reglen.                                |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Et Tailwind-preset.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Et Panda CSS-preset.                                   |

## Platforme

Native- og site-generator-mål, emitteret af CLI'en eller deres eget API.

| Pakke                                                                                          | Output                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-kilde plus et SwiftPM manifest-stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML-ressourcer.                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                    |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                              |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-consts til fx egui eller iced.        |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Et WordPress block-theme `theme.json`.     |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | En Vanilla Forums `variables.json`.        |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal tema-assets.                        |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo- og Jekyll-site-data.                 |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-venlige værdier til HTML-email.     |

## Design

Til designværktøjer.

| Pakke                                             | Output                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Et Figma Variables payload.                                         |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Farveswatches (ASE, GPL, Sketch) plus et visuelt SVG-eksempelsheet. |

## Plugins

Valgfrie transformationer der udvider token- eller CSS-outputtet. Se [Plugins](/guide/plugins).

| Pakke                                                                                 | Hvad det tilføjer                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Navngivne z-index dybder som `--instui-stacking-*` tokens.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` layout-debugging outline.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Brand-ikoner fra simple-icons.                                   |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure produktlogos som SVG'er, data-URIs, og image-tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | En PostCSS-plugin der fjerner ubrugte custom properties.         |

## Værktøjer

Build-, docs- og demo-infrastruktur for monorepoet selv. Mest er internt, men delene er selvstændige, så de dokumenteres her og nogle udgives til npm for sig.

| Pakke                                              | Hvad den gør                                                                                                                                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genererer den samlede `pantoken` pakke-barrel og `exports` fra dens afhængigheder.                                                                                                                         |
| `@pantoken/validate-generated`                     | Drift-gaten: tjekker at hver genereret stylesheet resolver mod token-IR'en.                                                                                                                                |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Den self-hosted live-demo runner: resolverer en `@demo` spec til et iframe og renderer ren HTML/CSS/JS same-origin, token-tematiseret.                                                                     |
| `@cssdoc/core` (ekstern)                           | En generisk CSS-dokumentationsekstraktor (TSDoc, for CSS): parser doc-comments + CSS AST til en model som docs emitterer som CSS API-referencen. Lever i sit eget repo; forbruges via en link-afhængighed. |

`@pantoken/validate-generated` er et run-once script (påkaldt af `pnpm run ready`), så det har ingen API-side; de andre har det.

## AI

Forbrugerrettede AI-opsætningsassets. Disse er til projekter der bruger pantoken, ikke til at udvikle pantoken selv.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installerer `AGENTS.md`, `llms.txt`, og
  assistant/editor-regler (Cursor, Copilot, Windsurf, Claude Code) i et forbruger-repository.

## Dev-plugins

Plugins vi udgiver til de værktøjer vi bygger med, grupperet efter host. De er standalone og kan publiceres.

| Pakke                                                                                    | Plugger ind i                                                                            |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: gør et `@demo <provider>:<ref>` block-tag til en indlejret demo-fence.          |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: genbygger upstream workspace-pakker (og afhængige) når deres kildekode ændrer sig. |
