# La mappa dei pacchetti

pantoken è un monorepo di piccoli pacchetti a scopo singolo raggruppati in bucket. Installa quello che
si adatta al tuo compito, oppure installa il pacchetto unificato `pantoken` e importa dai suoi sotto-percorsi (ad esempio
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Core

Il modello condiviso e il trasformatore su cui si costruisce tutto il resto.

| Package                                                 | Cosa fa                                                                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Tipi TypeScript senza dipendenze: la forma `Token` e il contratto del plugin.                                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | Risolve i token e le icone upstream nell'IR canonico e genera CSS.                                                                |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | L'IR risolto fornito come JSON statico, per tema, più la sorgente raw di Tokens Studio.                                           |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Il risolutore di token, le regex per riferimenti, helper per case e colori, controlli di drift e gli emitter token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Costruisci e componi plugin pantoken con `definePlugin`.                                                                          |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emette sorgenti native e per piattaforma.                                                          |

## Formati

Trasforma i token in un formato di file.

| Package                                                | Output                                                                                                                                                                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS tipizzato `@property` con `light-dark()` e icone in data-URI.                                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Variabili SCSS, risolte in una singola modalità.                                                                                                                                                                    |
| [`@pantoken/less`](/api/formats/less/src/)             | Variabili Less.                                                                                                                                                                                                     |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Variabili Stylus.                                                                                                                                                                                                   |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Un documento W3C Design Tokens (DTCG).                                                                                                                                                                              |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | L'IR come JavaScript e JSON (anche elencato nella sezione Core).                                                                                                                                                    |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Una vista ergonomica sui token delle icone.                                                                                                                                                                         |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Un web font di icone (TTF, WOFF2) più il suo CSS.                                                                                                                                                                   |
| [`@pantoken/components`](/api/formats/components/src/) | Una libreria di componenti CSS con aspetto InstUI (button, alert, table e altro) più un reset base con focus ring, stile per prose, utility cross-cutting e i font del brand. Vedi [Components](/guide/components). |

## Renderer

Integrazioni per framework e strumenti.

| Package                                                                                                                                          | Per                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hook React, `<Icon>`, e un provider di token.                             |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Il web component, collegato a ciascun framework.                          |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Oggetti token adatti a StyleSheet (senza variabili CSS).                  |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` e primitive stilizzate, agnostiche rispetto al framework. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Setup dei token per siti Astro.                                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Token delle icone e campioni colore in Markdown.                          |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Un plugin markdown-it per codici di icone e campioni colore.              |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Un tema type-safe per styled-components ed Emotion.                       |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Un tema per Material UI.                                                  |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Bridge di variabili CSS per Bootstrap e shadcn/ui.                        |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Un override di impostazioni Sass e un overlay CSS per Foundation.         |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Temi per Docusaurus e VitePress.                                          |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Un tema Mintlify `docs.json` (colori + sfondo).                           |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Un tema per Storybook.                                                    |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS globale in stile Instructure per le guide Pendo.                      |

## Bundler

Integrazioni per tool di build.

| Package                                             | Per                                                 |
| --------------------------------------------------- | --------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Un plugin Vite con moduli virtuali e injection CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` per Next.js `transpilePackages`.     |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Un plugin per webpack.                              |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | L'at-rule `@pantoken;`.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Un preset per Tailwind.                             |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Un preset per Panda CSS.                            |

## Piattaforme

Target nativi e per generatori di siti, emessi dalla CLI o dalla loro API.

| Package                                                                                        | Output                                           |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Sorgenti Swift più uno stub di manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Risorse XML per Android.                         |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose in Kotlin.                       |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter in Dart.                                 |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | const Rust per egui o iced.                      |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Un `theme.json` per tema WordPress.              |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Un `variables.json` per Vanilla Forums.          |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Asset per tema Drupal.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Dati per siti Hugo e Jekyll.                     |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Valori adatti a email HTML inline.               |

## Design

Per gli strumenti di design.

| Package                                           | Output                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Un payload Figma Variables.                                                          |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Campioni colore (ASE, GPL, Sketch) più un foglio esemplificativo SVG visualizzabile. |

## Plugin

Trasformazioni opzionali che estendono l'output dei token o del CSS. Vedi [Plugins](/guide/plugins).

| Package                                                                               | Cosa aggiunge                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Profondità z-index nominate come token `--instui-stacking-*`.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | L'outline di debug del layout `-with-visual-debug`.                 |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Icone di brand da simple-icons.                                     |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Loghi dei prodotti Instructure come SVG, data URI e token immagine. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Un plugin PostCSS che elimina le proprietà custom non usate.        |

## Strumenti

Infrastruttura di build, docs e demo per il monorepo stesso. La maggior parte è interna, ma i pezzi sono
autonomi, quindi li documentiamo qui e alcuni vengono pubblicati su npm separatamente.

| Package                                            | Cosa fa                                                                                                                                                                                                                       |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genera il pacchetto unificato `pantoken` barrel e `exports` dalle sue dipendenze.                                                                                                                                             |
| `@pantoken/validate-generated`                     | La gate di drift: verifica che ogni stylesheet generato si risolva contro l'IR dei token.                                                                                                                                     |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Il runner demo self-hosted: risolve una spec `@demo` in un iframe e rende HTML/CSS/JS bare same-origin, a tema token.                                                                                                         |
| `@cssdoc/core` (esterno)                           | Un estrattore generico di documentazione CSS (TSDoc, per CSS): parsifica i doc-comment e l'AST CSS in un modello che i docs emettono come riferimento API CSS. Risiede in un proprio repo; consumato come dipendenza linkata. |

`@pantoken/validate-generated` è uno script run-once (invocato da `pnpm run ready`), quindi non ha pagina API;
gli altri sì.

## AI

Asset di setup AI orientati al consumatore. Questi sono per progetti che usano pantoken, non per sviluppare
pantoken stesso.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installa `AGENTS.md`, `llms.txt` e
  regole per assistant/editor (Cursor, Copilot, Windsurf, Claude Code) in un repository consumatore.

## Dev plugin

Plugin che sviluppiamo per gli strumenti con cui lavoriamo, raggruppati per host. Sono standalone e pubblicabili.

| Package                                                                                  | Si integra con                                                                                         |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: trasforma un tag di blocco `@demo <provider>:<ref>` in una fence demo incorporabile.          |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: ricostruisce i pacchetti upstream del workspace (e i dipendenti) quando la loro sorgente cambia. |
