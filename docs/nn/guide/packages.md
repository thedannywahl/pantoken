# Pakkekartet

pantoken er ein monorepo av små, einskilde-purspos-pakkar grupperte i bøtter. Installer den som passar oppgåva di, eller installer den samanslegne `pantoken`-pakken og importer frå subvegar (til dømes `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kjernen

Den delte modellen og transformatoren alt anna byggjer på.

| Package                                                 | What it does                                                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Null-avhengige TypeScript-typar: formen til `Token` og plugin-kontrakten.                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | Løser opp strøymande token og ikon til den kanoniske IR-en, og renderar CSS.                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Den løyste IR-en leverert som statisk JSON, per tema, pluss den rå Tokens Studio-kjelde.                      |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-resolveren, referanse-regexar, case- og fargehjelparar, drift-sjekkar og token→utility-class-emittorar. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Bygg og komponér pantoken-plugins med `definePlugin`.                                                         |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emitterar native og plattformspesifikk kjelde.                                 |

## Format

Gjer om token til ei filform.

| Package                                                | Output                                                                                                                                                                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typed CSS med `light-dark()` og data-URI-ikon.                                                                                                                                                    |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-variablar, løyst til ein enkelt modus.                                                                                                                                                                   |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-variablar.                                                                                                                                                                                               |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-variablar.                                                                                                                                                                                             |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Eit W3C Design Tokens (DTCG)-dokument.                                                                                                                                                                        |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR-en som JavaScript og JSON (også lista under Kjernen).                                                                                                                                                      |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ein ergonomisk visning av ikon-tokena.                                                                                                                                                                        |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Ein ikon-webfont (TTF, WOFF2) pluss tilhøyrande CSS.                                                                                                                                                          |
| [`@pantoken/components`](/api/formats/components/src/) | Ein InstUI-liknande CSS-komponentbibliotek (knapp, varsel, tabell, og meir) pluss ein basis-reset med fokus-ring, prose-styling, tverrgåande utilityar og merke-fontane. Sjå [Components](/guide/components). |

## Renderarar

Rammeverk- og verktøyintegrasjonar.

| Package                                                                                                                                          | For                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-hookar, `<Icon>`, og ein token-provider.              |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Webkomponenten, kopla inn i kvart rammeverk.                |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-venlege token-objekt (ingen CSS-variablar).      |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` og stylte primitive, rammeverk-agnostisk.   |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-oppsett for Astro-nettstader.                         |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikon-token og fargeprøvar i Markdown.                       |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Ein markdown-it-plugin for ikon-kodar og farge-prøvar.      |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Eit typesikkert tema for styled-components og Emotion.      |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Eit Material UI-tema.                                       |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variabel-bruover for Bootstrap og shadcn/ui.            |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Ei Sass-innstilling-override og CSS-overlay for Foundation. |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Tema for Docusaurus og VitePress.                           |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Eit Mintlify `docs.json`-tema (fargar + bakgrunn).          |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Eit Storybook-tema.                                         |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-styla global CSS for Pendo-guidar.              |

## Bundlarar

Byggeverktøy-integrasjonar.

| Package                                             | For                                                     |
| --------------------------------------------------- | ------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Ein Vite-plugin med virtuelle moduler og CSS-injeksjon. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` for Next.js `transpilePackages`.         |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Ein webpack-plugin.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | The `@pantoken;` at-rule.                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Eit Tailwind-preset.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Eit Panda CSS-preset.                                   |

## Plattformar

Native og site-generator-mål, emittert av CLI-en eller eigen API.

| Package                                                                                        | Output                                        |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-kjelde pluss ein SwiftPM-manifest-stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML-ressursar.                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                       |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                 |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-konstantar for t.d. egui eller iced.     |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Ein WordPress block-theme `theme.json`.       |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Ein Vanilla Forums `variables.json`.          |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal-temaressursar.                         |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo- og Jekyll-nettstadsdata.                |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-venlege verdiar for HTML-e-post.       |

## Design

For designverktøy.

| Package                                           | Output                                                         |
| ------------------------------------------------- | -------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Eit Figma Variables-payload.                                   |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Fargeprøvar (ASE, GPL, Sketch) pluss eit visbart SVG-prøveark. |

## Plugins

Valfrie transformasjonar som utvidar token- eller CSS-output. Sjå [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                        |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Namngjevne z-index-djupnadar som `--instui-stacking-*`-token.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Den `-with-visual-debug` layout-debugging-outline.                  |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Merkeikon frå simple-icons.                                         |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure-produktlogoar som SVG-ar, data-URI-ar, og bilete-token. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Ein PostCSS-plugin som droppar ubrukte custom properties.           |

## Verktøy

Bygg-, dokumentasjons- og demo-infrastruktur for monorepoet sjølv. Mest er internt, men delane er sjølvstendige, så dei er dokumenterte her og nokre blir publiserte på npm på eiga hand.

| Package                                            | What it does                                                                                                                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genererer den samanslegne `pantoken`-pakkebarrellen og `exports` frå avhengigheitene sine.                                                                                                                                |
| `@pantoken/validate-generated`                     | Drift-grinda: sjekkar at kvar generert stylesheet løysar mot token-IR-en.                                                                                                                                                 |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Den sjølvhosta live-demo-runneren: løser ein `@demo`-spesifikasjon til eit iframe og renderar naken HTML/CSS/JS same-origin, token-tema.                                                                                  |
| `@cssdoc/core` (external)                          | Ein generisk CSS-dokumentasjonsuttrekkjar (TSDoc, for CSS): parser doc-kommentarar + CSS AST til ein modell som dokumentasjonen emitterar som CSS API-referanse. Ligg i sitt eige repo; konsumert via lenke-avhengigheit. |

`@pantoken/validate-generated` er eit ein-gongsskript (kalla av `pnpm run ready`), så det har ikkje ei API-side; dei andre har det.

## AI

Forbrukar-retta AI-oppsett-ressursar. Desse er for prosjekt som brukar pantoken, ikkje for å utvikle pantoken sjølv.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installerer `AGENTS.md`, `llms.txt`, og assistent-/redaktørreglar (Cursor, Copilot, Windsurf, Claude Code) i eit forbrukar-repo.

## Dev-plugins

Pluginar vi author for verktøya vi bygg med, grupperte etter host. Dei er frittståande og kan publiserast.

| Package                                                                                  | Plugs into                                                                                   |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: gjer ein `@demo <provider>:<ref>` block-tag om til ein innebyggbar demo-fence.      |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuildar upstream workspace-pakkar (og deira dependents) når kjelda deira endrar seg. |
