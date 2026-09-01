# Te mapi mō ngā mōkihi

pantoken he monorepo o ngā mōkihi iti, kotahi-whāinga kua whakarōpū ki ngā pukapuka. Tāuta te kotahi e hāngai ana ki tō mahi, rānei tāuta te mōkihi kotahi-whakarōpū `pantoken` ka kawemai mai i ōna ara-hapawhā (hei tauira `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Ngā Waahanga Matua

Te tauira tuitui me te huri e hangai ana ngā mea katoa.

| Package                                                 | He aha tāna e mahi                                                                                                                           |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Ngā momo TypeScript kore-tūāpapa: te āhua `Token` me te kirimana mō te pūrere (plugin).                                                      |
| [`@pantoken/core`](/api/packages/core/src/)             | E whakatau ana i ngā token me ngā pakiaka mai te puna matua ki te IR angitu, ā, ka whakaputa i te CSS.                                       |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Te IR kua whakatau hei JSON ā-roto, mō ia kaupapa-hoahoa, me te raupapa Tokens Studio taketake.                                              |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Te whakatau token, ngā regex tohutoro, āwhina mō ngā āhua me ngā tae, ngā tirotiro rerenga (drift), me ngā kaiwhakaputa token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Hanga me te whakakotahi i ngā pūrere pantoken me `definePlugin`.                                                                             |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — whakaputa kōnae taketake me ngā puna tūmau.                                                                   |

## Ngā Hōputu

Hurihia ngā token ki tētahi hōputu kōnae.

| Package                                                | Putanga                                                                                                                                                                                                                     |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS ā-ahua-`@property` me `light-dark()` me ngā pakiaka data-URI.                                                                                                                                                           |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Ngā rerekētanga SCSS, kua whakatau ki tētahi aratau kotahi.                                                                                                                                                                 |
| [`@pantoken/less`](/api/formats/less/src/)             | Ngā rerekētanga Less.                                                                                                                                                                                                       |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Ngā rerekētanga Stylus.                                                                                                                                                                                                     |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Tuhinga DTCG (W3C Design Tokens).                                                                                                                                                                                           |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Te IR hei JavaScript me JSON (ka kitea ano i raro i Ngā Waahanga Matua).                                                                                                                                                    |
| [`@pantoken/icons`](/api/formats/icons/src/)           | He tirohanga ngāwari ki runga i ngā token tohu (icon tokens).                                                                                                                                                               |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | He pūrere momotuhi tohu tukutuku (TTF, WOFF2) me tōna CSS.                                                                                                                                                                  |
| [`@pantoken/components`](/api/formats/components/src/) | He whare pukapuka kōwhiringa CSS ā-InstUI (pātu, whakatūpato, ripanga, me ētahi atu) me tētahi tūnga tīmatanga hei tautuhi āhua, ā, ngā taputapu whakawhānui me ngā momotuhi tohu. Tirohia [Components](/guide/components). |

## Ngā Kaiwhakaatu

Ngā atanga papaanga me ngā taputapu.

| Package                                                                                                                                          | Mō                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Ngā hook React, `<Icon>`, me tētahi kaiwhakarato token.                           |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Te waahanga tukutuku, kua honoa ki ia anga (framework).                           |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Ngā tūtohu token ā-ShapeSheet e pai ana ki StyleSheet (kāore he rerekētanga CSS). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` me ērā mātā o te āhua, kore-hāngai ki tētahi anga ake.            |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Tautuhinga token mō ngā pae Astro.                                                |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ngā token tohu me ngā ranunga tae i roto i Markdown.                              |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | He plug-in markdown-it mō ngā waehere tohu me ngā ranunga tae.                    |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | He kaupapa-āhua ā-ahua-tipu (type-safe) mō styled-components me Emotion.          |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | He kaupapa mō Material UI.                                                        |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Ngā whakawhēritanga honohono CSS-variable mō Bootstrap me shadcn/ui.              |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | He whakarerekētanga tautuhinga Sass me tētahi kapi CSS mō Foundation.             |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Ngā kaupapa mō Docusaurus me VitePress.                                           |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | He kaupapa Mintlify `docs.json` (ngā tae + papamuri).                             |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | He kaupapa Storybook.                                                             |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | He CSS ā-ao ā-Instructure mō ngā aratohu Pendo.                                   |

## Ngā Kaitapiri

Ngā atanga taputapu hanga.

| Package                                             | Mō                                                              |
| --------------------------------------------------- | --------------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | He plug-in Vite me ngā kōnae marama ā-virtual me te tāpiri CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` mō Next.js `transpilePackages`.                  |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | He plug-in webpack.                                             |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | Te ture-īpa atanga `@pantoken;`.                                |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | He tautuhinga Tailwind.                                         |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | He tautuhinga Panda CSS.                                        |

## Ngā Pūnaha

Ngā whāinga taketake me ngā kaiwhakawhiwhi pae, ka whakaputaina e te CLI rānei tō rātou ake API.

| Package                                                                                        | Putanga                                       |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Puna Swift me tētahi stub manifest SwiftPM.   |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Ngā rauemi XML mō Android.                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                       |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                 |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Ngā tūturu Rust mō egui, iced rānei.          |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | He kaupapa ā-Block mō WordPress `theme.json`. |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | He kaupapa ā-Vanilla Forums `variables.json`. |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Ngā rawa kaupapa Drupal.                      |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Raraunga pae mō Hugo me Jekyll.               |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Uara pai mō roto i ngā īmēra HTML.            |

## Hoahoa

Mō ngā taputapu hoahoa.

| Package                                           | Putanga                                                                        |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | He utaunga Figma Variables.                                                    |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Ngā rārangi tae (ASE, GPL, Sketch) me tētahi ripanga tauira SVG e tirohia ana. |

## Tāpiritanga

Ngā whakaritenga kōwhiringa e whakawhānui ana i ngā putanga token, CSS rānei. Tirohia [Plugins](/guide/plugins).

| Package                                                                               | He aha tāna e tapiri ana                                               |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Ngā tohu ā-z-index kua ingoahia hei token `--instui-stacking-*`.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Te āhua `-with-visual-debug` hei tirohanga whakatūpato kaupapa.        |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Ngā tohu waitohu mai i simple-icons.                                   |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Ngā tohu hua Instructure hei SVG, data URI, me ngā token whakaahua.    |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | He plug-in PostCSS e tangohia ana ngā rawa ritenga-kāore e whakamahia. |

## Ngā Utauta

Hanganga hanga, tuhinga, me te papamahi whakaaturanga mō te monorepo. He maha he ā-roto, engari he motuhake ia, nō reira ka tuhia mōhia ā ētahi ka whakaputahia ki npm.

| Package                                            | He aha tāna e mahi                                                                                                                                                                                  |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | E whakaputa ana i te mōkihi kotahi-whakarōpū `pantoken` me `exports` mai i ōna whakawhirinaki.                                                                                                      |
| `@pantoken/validate-generated`                     | Te tatau rerenga: e tirotiro ana mēnā ia pāhekoheko hanga kua whakatau ki te IR token.                                                                                                              |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Te kaiwhakahaere-ā-tuhi whakaaturanga ora: e whakatau ana i tētahi whakatakotoranga `@demo` ki tētahi iframe ka whakaatu HTML/CSS/JS taketake, ā, kua āhua-token.                                   |
| `@cssdoc/core` (taiao kē)                          | He whiwhinga tuhinga CSS whānui (TSDoc, mō te CSS): ka tātaritia ngā kōrero-tuku + te AST CSS ki tētahi tauira e whakaputa ana ngā tuhinga API CSS. Kei tōna ake repo; ka whakamahia mā te hononga. |

`@pantoken/validate-generated` he script kotahi-wa (ka karangahia e `pnpm run ready`), nō reira kāore he whārangi API; ko ērā atu he.

## AI

Ngā rawa tautuhi AI mō te kai-kaihoko. Mō ngā kaupapa e whakamahi ana i pantoken, kāore mō te whakawhanaketanga pantoken anake.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) ka tāuta `AGENTS.md`, `llms.txt`, me ngā ture ā-hoa/taipitopito (Cursor, Copilot, Windsurf, Claude Code) ki roto i tētahi repo kai-kaihoko.

## Ngā Tāpiritanga Whanaketanga

Ngā tāpiritanga e waihangahia e mātou mō ngā taputapu e whakamahi ana mātou, kua whakarōpū e ai ki te tāhuhu. He motuhake, ā, ka taea te whakaputa.

| Package                                                                                  | Mō te hono ki                                                                                                       |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: ka huri i tētahi tapanga ā-`@demo <provider>:<ref>` hei wāhanga whakaaturanga rūnanga.                     |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: ka whakahou anō i ngā mōkihi puna ā-hapori (workspace) me ō rātou whakawhaiti (dependents) ina huri ngā puna. |
