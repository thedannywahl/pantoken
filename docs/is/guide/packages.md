# Pakka kortið

pantoken er monorepo af smáum, einnota pakkum flokkað í hólf. Settu upp þann sem hentar verkefninu þínu, eða settu upp samræmda `pantoken` pakkann og flytðu inn úr undirstígum hans (til dæmis `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Kjarni

Sameiginlega módelið og umbreytirinn sem allt annað byggir á.

| Package                                                 | Hvað það gerir                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Núll-fyrirhengi TypeScript týpur: `Token` formið og tappi fyrir viðbætur.                                           |
| [`@pantoken/core`](/api/packages/core/src/)             | Leysir upstream tokens og tákn í canonical IR og renderar CSS.                                                      |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Leyst IR vendorað sem stöðugt JSON, per þema, auk hrárrar Tokens Studio uppsprettu.                                 |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-leysirinn, tilvísunar-regex, hjálparföll fyrir case og liti, drift-skoðanir, og token→utility-class emitters. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Byggðu og settu saman pantoken viðbætur með `definePlugin`.                                                         |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — framleiðir native og platform uppruna.                                               |

## Formát

Breyta tokens í skráarsnið.

| Package                                                | Úttak                                                                                                                                                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-typað CSS með `light-dark()` og data-URI táknmyndum.                                                                                                                                           |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS breytur, leystar í eina stillingu.                                                                                                                                                                    |
| [`@pantoken/less`](/api/formats/less/src/)             | Less breytur.                                                                                                                                                                                              |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus breytur.                                                                                                                                                                                            |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | W3C Design Tokens (DTCG) skjal.                                                                                                                                                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR sem JavaScript og JSON (sveit einnig skráð undir Kjarna).                                                                                                                                               |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Notendavæn yfirsýn yfir icon tokens.                                                                                                                                                                       |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Icon vefletur (TTF, WOFF2) auk CSS þess.                                                                                                                                                                   |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI-stíll CSS komponentasafn (hnappur, viðvörun, tafla og fleira) auk grunn-reset með fókus hring, prose-stíling, þverskurðar utilities og vörufélags leturgerðir. Sjá [Components](/guide/components). |

## Renderer-ar

Ramma- og tólintegreiningar.

| Package                                                                                                                                          | Fyrir                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>`, og token provider.                     |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Vef-þátturinn, tengdur við hvert rammasafn.                   |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-vænir token hlutir (engin CSS breytur).            |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` og stílaðir primitive, rammasafns-agnóstísk.  |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token uppsetning fyrir Astro síður.                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon tokens og litaflísar í Markdown.                         |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | markdown-it viðbót fyrir icon kóða og litaflísar.             |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Tegundöruggur theme fyrir styled-components og Emotion.       |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI theme.                                            |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-breyta brúar fyrir Bootstrap og shadcn/ui.                |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass stillingar yfirstilling og CSS yfirlag fyrir Foundation. |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Þemu fyrir Docusaurus og VitePress.                           |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` þema (liti + bakgrunnur).                |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook þema.                                               |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stílað globalt CSS fyrir Pendo leiðbeiningar.     |

## Bundlers

Byggingartólintegreiningar.

| Package                                             | Fyrir                                               |
| --------------------------------------------------- | --------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite plugin með virtual modules og CSS innspýtingu. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` fyrir Next.js `transpilePackages`.   |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Webpack plugin.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule.                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind preset.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS preset.                                   |

## Platformar

Native og síðu-rafhlöðutæki, framleidd af CLI eða eigin API.

| Package                                                                                        | Úttak                                       |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift uppspretta auk SwiftPM manifest stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML auðlindir.                      |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                     |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                               |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts fyrir t.d. egui eða iced.       |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress block-þema `theme.json`.          |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.            |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal þemaauðlindir.                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo og Jekyll síðu-gögn.                   |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-vænir gildi fyrir HTML tölvupóst.    |

## Hönnun

Fyrir hönnunarverkfæri.

| Package                                           | Úttak                                                         |
| ------------------------------------------------- | ------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables gagna-pakka.                                  |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Lita flísar (ASE, GPL, Sketch) auk sýnilegrar SVG sýniblöðru. |

## Viðbætur (Plugins)

Valfrjáls umbreytingar sem lengja token eða CSS úttakið. Sjá [Plugins](/guide/plugins).

| Package                                                                               | Hvað það bætir við                                         |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Nefnd z-index dýpt sem `--instui-stacking-*` tokens.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` layout-greiningar útlínan.            |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Vörumerkja tákn úr simple-icons.                           |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure vöru-lógó sem SVG, data URIs, og image tokens. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | PostCSS viðbót sem fjarlægir ónotaðar custom properties.   |

## Tól

Bygging, skjöl og demo innviðir fyrir sjálfan monorepo-ið. Flest er innra, en hlutarnir eru
sjálfstæðir, svo þeir eru skjalfestir hér og sumir eru bornir út á npm sjálfstætt.

| Package                                            | Hvað það gerir                                                                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Framleiðir samræmda `pantoken` pakkabarrel og `exports` úr sínum háðumlögum.                                                                                             |
| `@pantoken/validate-generated`                     | Drift-gáttin: athugar að hver framleidd stílblað leysist gegn token IR.                                                                                                  |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Sjálf-hýst lifandi-demo keyrandi: leysir `@demo` spec yfir í iframe og renderar ber HTML/CSS/JS same-origin, token-þemað.                                                |
| `@cssdoc/core` (external)                          | Alhliða CSS skjalsútdráttari (TSDoc, fyrir CSS): parsar doc-comment + CSS AST í módel sem skjölin gefa út sem CSS API reference. Lifir í eigin repo; neytt sem link-háð. |

`@pantoken/validate-generated` er einu-sinns keyrsluscript (kallað af `pnpm run ready`), svo það á enga API síðu; hinir gerast.

## AI

Notendavænar AI uppsetningar-einingar. Þetta er fyrir verkefni sem nota pantoken, ekki fyrir þróun pantoken sjálft.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) setur upp `AGENTS.md`, `llms.txt`, og
  aðstoðar/ritstjóra reglur (Cursor, Copilot, Windsurf, Claude Code) í neytenda repo.

## Dev viðbætur

Viðbætur sem við höfum skrifað fyrir þau verkfæri sem við vinnum með, flokkað eftir gestgjafa. Þau eru standalone og birtingarhæf.

| Package                                                                                  | Tengist við                                                                           |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: umbreytir `@demo <provider>:<ref>` block tag í innbyggðan demo fence.        |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: endurbyggir upstream workspace pakkana (og háða) þegar uppruna þeirra breytist. |
