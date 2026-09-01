# Pakkeoversikten

pantoken er et monorepo med små, enkeltstående pakker gruppert i bøtter. Installer den som passer oppgaven din, eller installer den sammenslåtte `pantoken`-pakken og importer fra dens subpaths (for eksempel `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kjerne

Den delte modellen og transformatoren alt annet bygger på.

| Package                                                 | Hva den gjør                                                                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | TypeScript-typer uten avhengigheter: `Token`-formen og plugin-kontrakten.                                                 |
| [`@pantoken/core`](/api/packages/core/src/)             | Løser oppstrøms tokens og ikoner til den kanoniske IR-en, og renderer CSS.                                                |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Den løste IR-en levert som statisk JSON, per tema, pluss den rå Tokens Studio-kilden.                                     |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-resolveren, referanse-regexer, hjelpefunksjoner for case og farge, drift-sjekker, og token→utility-class-emitterne. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Bygg og komponér pantoken-plugins med `definePlugin`.                                                                     |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emitter native og plattformspesifikk kildekode.                                            |

## Formater

Gjør tokenene om til et filformat.

| Package                                                | Output                                                                                                                                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typet CSS med `light-dark()` og data-URI-ikoner.                                                                                                                                           |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-variabler, løst til en enkelt modus.                                                                                                                                                              |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-variabler.                                                                                                                                                                                        |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-variabler.                                                                                                                                                                                      |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Et W3C Design Tokens (DTCG) dokument.                                                                                                                                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR-en som JavaScript og JSON (også listet under Kjerne).                                                                                                                                               |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Et ergonomisk overblikk over ikon-tokenene.                                                                                                                                                            |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Et ikon webfont (TTF, WOFF2) pluss tilhørende CSS.                                                                                                                                                     |
| [`@pantoken/components`](/api/formats/components/src/) | Et InstUI-lignende CSS-komponentbibliotek (button, alert, table og mer) pluss en base-reset med fokus-ring, prose-styling, tverrgående utilities og brand-fontene. Se [Components](/guide/components). |

## Renderere

Framework- og verktøyintegrasjoner.

| Package                                                                                                                                          | For                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-hooks, `<Icon>`, og en token-provider.                           |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Webkomponenten, koblet inn i hvert rammeverk.                          |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-vennlige token-objekter (ingen CSS-variabler).              |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` og stylte primitive komponenter, rammeverks-agnostisk. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-oppsett for Astro-nettsteder.                                    |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikon-tokens og fargeprøver i Markdown.                                 |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | En markdown-it-plugin for ikon-koder og fargeprøver.                   |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Et typesikkert tema for styled-components og Emotion.                  |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Et Material UI-tema.                                                   |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variabel-broer for Bootstrap og shadcn/ui.                         |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | En Sass-innstillings-override og CSS-overlay for Foundation.           |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Temaer for Docusaurus og VitePress.                                    |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Et Mintlify `docs.json`-tema (farger + bakgrunn).                      |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Et Storybook-tema.                                                     |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stylet global CSS for Pendo-guides.                        |

## Bundlere

Integrasjoner for byggeverktøy.

| Package                                             | For                                                    |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | En Vite-plugin med virtuelle moduler og CSS-injeksjon. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` for Next.js `transpilePackages`.        |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | En webpack-plugin.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;`-at-regelen.                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | En Tailwind-preset.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | En Panda CSS-preset.                                   |

## Plattformmål

Native og site-generator mål, emittert av CLI-en eller via eget API.

| Package                                                                                        | Output                                      |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-kilde pluss en SwiftPM-manifest-stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML-ressurser.                      |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                     |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                               |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts for f.eks. egui eller iced.     |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Et WordPress block-theme `theme.json`.      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | En Vanilla Forums `variables.json`.         |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal-temaressurser.                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo- og Jekyll-nettstedsdata.              |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-vennlige verdier for HTML-e-post.    |

## Design

For designverktøy.

| Package                                           | Output                                                        |
| ------------------------------------------------- | ------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | En Figma Variables-payload.                                   |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Fargeprøver (ASE, GPL, Sketch) pluss et visbart SVG-prøveark. |

## Plugins

Valgfrie transformasjoner som utvider token- eller CSS-output. Se [Plugins](/guide/plugins).

| Package                                                                               | Hva den legger til                                               |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Navngitte z-index-dyp som `--instui-stacking-*`-tokens.          |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` layout-debugging outline.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Brand-ikoner fra simple-icons.                                   |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure-produktlogoer som SVG-er, data URIs og bilde-tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | En PostCSS-plugin som fjerner ubrukt custom properties.          |

## Verktøy

Bygge-, dokumentasjons- og demo-infrastruktur for monorepoet selv. Det meste er internt, men delene er
selvstendige, så de dokumenteres her og noen publiseres til npm for seg selv.

| Package                                            | Hva den gjør                                                                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genererer den sammenslåtte `pantoken`-pakke-barrelen og `exports` fra sine avhengigheter.                                                                                                                           |
| `@pantoken/validate-generated`                     | Drift-gaten: sjekker at alle genererte stilark løser seg mot token-IR-en.                                                                                                                                           |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Den selvhostede live-demo-runneren: løser en `@demo`-spesifikasjon til en iframe og renderer ren HTML/CSS/JS same-origin, token-tematisk.                                                                           |
| `@cssdoc/core` (ekstern)                           | En generisk CSS-dokumentasjons-ekstractor (TSDoc, for CSS): parser doc-kommentarer + CSS AST til en modell som dokumentasjonen emitterer som CSS API-referanse. Lever i eget repo; konsumeres via link-avhengighet. |

`@pantoken/validate-generated` er et engangsskript (kalles av `pnpm run ready`), så det har ingen API-side; de andre har det.

## AI

Forbrukerorienterte AI-oppsettressurser. Disse er for prosjekter som bruker pantoken, ikke for å utvikle pantoken selv.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installerer `AGENTS.md`, `llms.txt`, og
  assistant/editor-regler (Cursor, Copilot, Windsurf, Claude Code) i et forbruker-repositorium.

## Dev-plugins

Plugins vi forfatter for verktøyene vi bygger med, gruppert etter vert. De er frittstående og publikasjonssklare.

| Package                                                                                  | Plugs into                                                                             |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: gjør en `@demo <provider>:<ref>` block-tag om til et innebyggbart demo-fence. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuilds upstream workspace packages (and dependents) when their source changes. |
