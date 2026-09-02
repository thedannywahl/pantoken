# De pakketkaart

pantoken is een monorepo van kleine, enkel-doel pakketten gegroepeerd in buckets. Installeer degene die
bij je taak past, of installeer het uniforme `pantoken` pakket en importeer vanuit zijn subpaden (bijvoorbeeld
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kern

Het gedeelde model en de transformer waarop alles anders bouwt.

| Package                                                 | Wat het doet                                                                                                       |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/model`](/api/packages/model/src/)           | Nul-afhankelijkheden TypeScript-typen: de `Token` vorm en het plugin-contract.                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | Lost de upstream tokens en iconen op tot de canonieke IR, en rendert CSS.                                          |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | De opgeloste IR als ingebakken statische JSON, per thema, plus de ruwe Tokens Studio-bron.                         |
| [`@pantoken/utils`](/api/packages/utils/src/)           | De token-resolver, referentie-regexes, case- en kleurhelpers, drift-controles, en de token→utility-class emitters. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Bouw en composeer pantoken-plugins met `definePlugin`.                                                             |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emit native en platformbron.                                                        |

## Formaten

Zet de tokens om in een bestandsformaat.

| Package                                                | Output                                                                                                                                                                                                           |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-getypte CSS met `light-dark()` en data-URI iconen.                                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-variabelen, opgelost naar een enkele modus.                                                                                                                                                                 |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-variabelen.                                                                                                                                                                                                 |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-variabelen.                                                                                                                                                                                               |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Een W3C Design Tokens (DTCG) document.                                                                                                                                                                           |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | De IR als JavaScript en JSON (ook vermeld onder Kern).                                                                                                                                                           |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Een ergonomische kijk op de icon-tokens.                                                                                                                                                                         |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Een icon-webfont (TTF, WOFF2) plus de bijbehorende CSS.                                                                                                                                                          |
| [`@pantoken/components`](/api/formats/components/src/) | Een InstUI-uitziende CSS componentbibliotheek (button, alert, table, en meer) plus een basis-reset met focus-ring, prose-styling, cross-cutting utilities, en de merkfonts. Zie [Components](/guide/components). |

## Renderers

Framework- en toolintegraties.

| Package                                                                                                                                          | Voor                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-hooks, `<Icon>`, en een token-provider.                              |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | De webcomponent, aangesloten in elk framework.                             |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-vriendelijke token-objecten (geen CSS-variabelen).              |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` en gestylede primitieve componenten, framework-agnostisch. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-setup voor Astro-sites.                                              |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon-tokens en swatches in Markdown.                                       |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Een markdown-it plugin voor icon-codes en kleur-swatches.                  |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Een type-veilige theme voor styled-components en Emotion.                  |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Een Material UI theme.                                                     |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-variabele bruggen voor Bootstrap en shadcn/ui.                         |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Een Sass settings-override en CSS-overlay voor Foundation.                 |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Thema's voor Docusaurus en VitePress.                                      |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Een Mintlify `docs.json` theme (kleuren + achtergrond).                    |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Een Storybook-theme.                                                       |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-gestijlde globale CSS voor Pendo-guides.                       |

## Bundlers

Build-tool integraties.

| Package                                             | Voor                                                  |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Een Vite-plugin met virtuele modules en CSS-injectie. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` voor Next.js `transpilePackages`.      |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Een webpack-plugin.                                   |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | De `@pantoken;` at-rule.                              |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Een Tailwind-preset.                                  |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Een Panda CSS-preset.                                 |

## Platforms

Native en site-generator doelen, geëmitteerd door de CLI of hun eigen API.

| Package                                                                                        | Output                                       |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-bron plus een SwiftPM manifest-stub.   |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML-resources.                       |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                      |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-consts voor bijv. egui of iced.         |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Een WordPress block-theme `theme.json`.      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Een Vanilla Forums `variables.json`.         |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal theme-assets.                         |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo en Jekyll site-data.                    |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-vriendelijke waarden voor HTML-email. |

## Design

Voor designtools.

| Package                                           | Output                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Een Figma Variables payload.                                              |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Kleur-swatches (ASE, GPL, Sketch) plus een bekijkbare SVG specimen-sheet. |

## Plugins

Optionele transformaties die de token- of CSS-output uitbreiden. Zie [Plugins](/guide/plugins).

| Package                                                                               | Wat het toevoegt                                                  |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Genoemde z-index dieptes als `--instui-stacking-*` tokens.        |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | De `-with-visual-debug` layout-debugging outline.                 |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Merk-iconen van simple-icons.                                     |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure productlogo's als SVG's, data-URI's, en image-tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Een PostCSS-plugin die ongebruikte custom properties verwijdert.  |

## Hulpmiddelen

Build-, docs- en demo-infrastructuur voor de monorepo zelf. Het grootste deel is intern, maar de onderdelen
zijn zelfstandig, dus worden hier gedocumenteerd en sommige worden afzonderlijk naar npm gepubliceerd.

| Package                                            | Wat het doet                                                                                                                                                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Genereert het uniforme `pantoken` package-barel en `exports` vanuit zijn afhankelijkheden.                                                                                                                                       |
| `@pantoken/validate-generated`                     | De drift-gate: controleert dat elke gegenereerde stylesheet oplost tegen de token-IR.                                                                                                                                            |
| [`@pantoken/demo`](/api/tools/demo/src/)           | De self-hosted live-demo runner: lost een `@demo` spec op naar een iframe en rendert kale HTML/CSS/JS same-origin, token-getheme'd.                                                                                              |
| `@cssdoc/core` (extern)                            | Een generieke CSS-documentatie-extractor (TSDoc, voor CSS): parse't doc-comments + de CSS-AST naar een model dat de docs uitgeven als de CSS API-referentie. Leeft in een eigen repo; geconsumeerd via een link-afhankelijkheid. |

`@pantoken/validate-generated` is een run-once script (aangeroepen door `pnpm run ready`), dus het heeft geen API
pagina; de anderen wel.

## AI

Consumentgerichte AI-setup assets. Deze zijn voor projecten die pantoken gebruiken, niet voor het ontwikkelen
van pantoken zelf.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) installeert `AGENTS.md`, `llms.txt`, en
  assistant/editor regels (Cursor, Copilot, Windsurf, Claude Code) in een consumer-repository.

## Dev-plugins

Plugins die we maken voor de tools waarmee we werken, gegroepeerd per host. Ze zijn standalone en publishable.

| Package                                                                                  | Plugt in bij                                                                            |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: zet een `@demo <provider>:<ref>` block-tag om in een in te sluiten demo-fence. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebuildt upstream workspace-pakketten (en dependents) wanneer hun bron verandert. |
