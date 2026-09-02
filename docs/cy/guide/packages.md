# Map pecyn

pantoken yw monorepo o becynnau bach, un-diben wedi’u grwpio mewn bwcedi. Gosodwch y pecyn sy’n addas i’ch tasg, neu osodwch y pecyn unedig `pantoken` a mewnforiwch o’i is-gyfeiriadau (er enghraifft `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Craidd

Y model a rennir a’r trawsnewidydd mae popeth arall yn seiliedig arno.

| Pecyn                                                   | Beth mae'n ei wneud                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/model`](/api/packages/model/src/)           | Mathau TypeScript di-ddibyniaeth: siâp `Token` a chontract y plwgin.                                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | Datrys y tokenau ac eiconau uwchben i’r IR canonig, a rendro CSS.                                                        |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Yr IR wedi’i ddatrys wedi’i frandio fel JSON statig, fesul thema, ynghyd â'r ffynhonnell Tokens Studio raw.              |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Y datrysiwr tokenau, regexes cyfeirio, cynorthwywyr achos a lliw, gwirio drifft, a’r emitwyr token→dosbarth-cyfleustrel. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Adeiladu a chyfansoddi plwginiau pantoken gyda `definePlugin`.                                                           |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emitffynhonnell hynafiaid a llwyfannau.                                                   |

## Fformatau

Troi’r tokenau yn fformat ffeil.

| Pecyn                                                  | Allbwn                                                                                                                                                                                                         |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS mathiedig gan `@property` gyda `light-dark()` ac eiconau data-URI.                                                                                                                                         |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Newidiolion SCSS, wedi’u datrys i un modd sengl.                                                                                                                                                               |
| [`@pantoken/less`](/api/formats/less/src/)             | Newidiolion Less.                                                                                                                                                                                              |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Newidiolion Stylus.                                                                                                                                                                                            |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Dogfen W3C Design Tokens (DTCG).                                                                                                                                                                               |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Yr IR fel JavaScript a JSON (wedi’i restru hefyd o dan Craidd).                                                                                                                                                |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Golwg ergonomig dros y tokenau eicon.                                                                                                                                                                          |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Ffont gwe eicon (TTF, WOFF2) ynghyd â’i CSS.                                                                                                                                                                   |
| [`@pantoken/components`](/api/formats/components/src/) | Llyfrgell gydran CSS edrych-InstUI (botwm, rhybudd, tabl, a mwy) ynghyd â reset sylfaen gyda cylch ffocws, arddull prose, cyfleustodau trawsdorfol, a’r ffontiau brand. Gweler [Cydrannau](/guide/components). |

## Renderyddion

Integreiddiadau fframwaith a offer.

| Pecyn                                                                                                                                            | Ar gyfer                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hookiau React, `<Icon>`, a darparwr tokenau.                           |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Y cydran gwe, wedi’i diwreo i bob fframwaith.                          |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Obyectau token ar gyfer StyleSheet (dim newidynnau CSS).               |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` a phrymidau wedi’u steilio, annibynnol ar fframwaith.  |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Sefydlu tokenau ar gyfer safleoedd Astro.                              |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Tokenau eicon a swatches mewn Markdown.                                |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Plwgin markdown-it ar gyfer codau eicon a swatches lliw.               |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Themed math-sicr ar gyfer styled-components ac Emotion.                |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Thema Material UI.                                                     |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Pontydd newidynau CSS ar gyfer Bootstrap a shadcn/ui.                  |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Gosodiad Sass a haen CSS ar gyfer Foundation.                          |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Themas ar gyfer Docusaurus a VitePress.                                |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Thema Mintlify `docs.json` (lliwiau + cefndir).                        |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Thema Storybook.                                                       |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS byd-eang wedi’i steilio gan Instructure ar gyfer canllawiau Pendo. |

## Casglwyr

Integreiddiadau offer adeiladu.

| Pecyn                                               | Ar gyfer                                              |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Plwgin Vite gyda modiwlau rhithwir a chwistrellu CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` ar gyfer Next.js `transpilePackages`.  |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Plwgin webpack.                                       |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | Yr at-areg `@pantoken;`.                              |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Rhag-ddewis Tailwind.                                 |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Rhag-ddewis Panda CSS.                                |

## Llwyfannau

Targedau hynafiaid a chynhyrchwyr safle, a all gael eu emitio gan y CLI neu eu API eu hunain.

| Pecyn                                                                                          | Allbwn                                                   |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Ffynhonnell Swift ynghyd â stub manifest SwiftPM.        |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Adnoddau XML Android.                                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Consts Rust ar gyfer egui neu iced.                      |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Thema bloc WordPress `theme.json`.                       |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Data `variables.json` ar gyfer Vanilla Forums.           |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Asedau thema Drupal.                                     |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Data safleoedd Hugo a Jekyll.                            |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Gwerthoedd cyfeillgar mewn-linellu ar gyfer e-bost HTML. |

## Dylunio

Ar gyfer offer dylunio.

| Pecyn                                             | Allbwn                                                                        |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Payload Figma Variables.                                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Swatches lliw (ASE, GPL, Sketch) ynghyd â sheit sampl SVG y gellir ei gwylio. |

## Plwginiau

Trawsnewidiadau dewisol sy’n estyn y token neu allbwn CSS. Gweler [Plwginiau](/guide/plugins).

| Pecyn                                                                                 | Beth mae'n ychwanegu                                                  |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Dyfnderoedd z-index enwau fel tokenau `--instui-stacking-*`.          |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Y `-with-visual-debug` amlinelliad dadflino lleoliad.                 |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Eicon brand o simple-icons.                                           |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logos cynhyrchion Instructure fel SVGs, data URIs, a tokenau delwedd. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Plwgin PostCSS sy’n tynnu eiddo arfer heb eu defnyddio.               |

## Offer

Seilwaith adeiladu, dogfennau, a dangosiadau ar gyfer y monorepo ei hun. Mae’r rhan fwyaf yn fewnol, ond mae’r darnau’n hunan-ganolog, felly’u dogfennu yma ac mae rhai yn cael eu cyhoeddi i npm ar eu pennau eu hunain.

| Pecyn                                              | Beth mae'n ei wneud                                                                                                                                                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Cynhyrchu’r batri pecyn undedig `pantoken` a `exports` o’i ddibyniaethau.                                                                                                                                             |
| `@pantoken/validate-generated`                     | Y giat drifft: yn gwirio bod pob stylesheet a gynhyrchir yn datrys yn erbyn yr IR tokenau.                                                                                                                            |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Rhedegwr dangosiad byw hunan-letyol: datrys spec `@demo` i iframe ac rendro HTML/CSS/JS crai unffurf, themedig gan tokenau.                                                                                           |
| `@cssdoc/core` (allanol)                           | Tynnyddiwr dogfen CSS cyffredinol (TSDoc, ar gyfer CSS): yn parsu sylwadau-doc + AST CSS i fodel y mae’r dogfennau’n ei allhau fel cyfeirlyfr API CSS. Mae’n byw mewn repo ei hun; a ddefnyddir fel dibyniaeth dolen. |

`@pantoken/validate-generated` yw sgript unwaith-y-rhediad (a alwir gan `pnpm run ready`), felly nid oes ganddo dudalen API; mae gan y rhain eraill.

## AI

Asedau setup AI sy'n wynebu defnyddwyr. Mae’r rhain ar gyfer prosiectau sy’n defnyddio pantoken, nid ar gyfer datblygu pantoken ei hun.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) yn gosod `AGENTS.md`, `llms.txt`, a rheolau cynorthwyydd/golygydd (Cursor, Copilot, Windsurf, Claude Code) i mewn i repo defnyddiwr.

## Plwginiau datblygu

Plwginiau a ninnau’n eu hysgrifennu ar gyfer yr offer rydyn ni’n eu defnyddio, wedi’u grwpio fesul gwesteiwr. Maent yn hunan-ganolog ac yn cyhoeddi.

| Pecyn                                                                                    | Yn plygio i                                                                                          |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: yn troi tag bloc `@demo <provider>:<ref>` yn ralffensiwn demo embedadwy.                    |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: ailadeiladu pecynnau gweithleoedd uwchben (a’r dibyniaethau) pan fydd eu ffynhonnell yn newid. |
