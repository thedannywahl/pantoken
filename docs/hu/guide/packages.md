# A csomagtérkép

A pantoken kisméretű, egyetlen célra szolgáló, csoportokba rendezett csomagok monorepója. Telepítse azt, amelyik
illik a feladatához, vagy telepítse az egyesített `pantoken` csomagot, és importáljon annak alútvonalaiból (például
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Core

A közös modell és a transzformátor, amire minden más épül.

| Csomag                                                  | Mit csinál                                                                                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Függőségmentes TypeScript típusok: a `Token` struktúra és a plugin szerződés.                                                               |
| [`@pantoken/core`](/api/packages/core/src/)             | Feloldja a felettes (upstream) tokeneket és ikonokat a kanonikus IR-be, és CSS-t renderel.                                                  |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | A feloldott IR statikus JSON-ként csomagolva, témánként, valamint a nyers Tokens Studio forrás.                                             |
| [`@pantoken/utils`](/api/packages/utils/src/)           | A token-feloldó, hivatkozási regexek, kis/nagybetűsítés és szín segédfüggvények, drift ellenőrzések, és a token→utility-osztály kibocsátók. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | pantoken pluginok építése és összeállítása a `definePlugin` segítségével.                                                                   |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — natív és platform forráskód kibocsátása.                                                                     |

## Formátumok

Alakítsa át a tokeneket fájlformátummá.

| Csomag                                                 | Kimenet                                                                                                                                                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-típusú CSS `light-dark()` és data-URI ikonokkal.                                                                                                                                                                                     |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS változók, egyetlen módra feloldva.                                                                                                                                                                                                          |
| [`@pantoken/less`](/api/formats/less/src/)             | Less változók.                                                                                                                                                                                                                                   |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus változók.                                                                                                                                                                                                                                 |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Egy W3C Design Tokens (DTCG) dokumentum.                                                                                                                                                                                                         |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Az IR JavaScript és JSON formátumban (a Core alatt is szerepel).                                                                                                                                                                                 |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonomikus nézet az ikontokenek felett.                                                                                                                                                                                                         |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Egy ikon webes betűtípus (TTF, WOFF2), valamint annak CSS-e.                                                                                                                                                                                     |
| [`@pantoken/components`](/api/formats/components/src/) | Egy InstUI-megjelenésű CSS komponenskönyvtár (gomb, figyelmeztetés, táblázat és egyéb), plusz egy alap reset fókuszgyűrűvel, próza stílussal, keresztirányú segédosztályokkal és a márka betűtípusaival. Lásd: [Komponensek](/guide/components). |

## Renderelők

Keretrendszer- és eszközintegrációk.

| Csomag                                                                                                                                           | Cél                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hookok, `<Icon>` és egy token provider.                       |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | A webkomponens, mindegyik keretrendszerbe bekötve.                  |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-barát token objektumok (CSS változók nélkül).            |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` és stilizált primitívek, keretrendszer-függetlenül. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token beállítás Astro webhelyekhez.                                 |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikontokenek és színminták Markdownban.                              |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Egy markdown-it plugin ikon kódokhoz és színmintákhoz.              |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Típusbiztos téma a styled-components és Emotion számára.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Egy Material UI téma.                                               |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-változó áthidalók Bootstraphez és shadcn/ui-hoz.                |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass beállítás-felülbírálás és CSS átfedés Foundationhöz.           |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Témák Docusaurushoz és VitePresshez.                                |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Egy Mintlify `docs.json` téma (színek + háttér).                    |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Egy Storybook téma.                                                 |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stílusú globális CSS Pendo útmutatókhoz.                |

## Bundlerek

Építőeszköz-integrációk.

| Csomag                                              | Cél                                                    |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite plugin virtuális modulokkal és CSS-injektálással. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` Next.js `transpilePackages` számára.    |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Egy webpack plugin.                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | A `@pantoken;` at-szabály (at-rule).                   |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Egy Tailwind előbeállítás (preset).                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Egy Panda CSS előbeállítás (preset).                   |

## Platformok

Natív és statikusweboldal-generáló célpontok, amelyeket a CLI vagy saját API-juk bocsát ki.

| Csomag                                                                                         | Kimenet                                            |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift forráskód és egy SwiftPM manifeszt-csonk.    |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML erőforrások.                           |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                            |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                      |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust konstansok egui-hoz vagy iced-hez.            |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Egy WordPress blokk-téma `theme.json`.             |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Egy Vanilla Forums `variables.json`.               |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal téma-eszközök (assets).                     |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo és Jekyll webhelyadatok.                      |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Beágyazás-barát (inline) értékek HTML e-mailekhez. |

## Design

Dizájneszközökhöz.

| Csomag                                            | Kimenet                                                          |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Egy Figma Variables adatterhelés (payload).                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Színminták (ASE, GPL, Sketch) és egy megtekinthető SVG mintalap. |

## Bővítmények

Opcionális transzformációk, amelyek kiterjesztik a token- vagy CSS-kimenetet. Lásd: [Bővítmények](/guide/plugins).

| Csomag                                                                                | Mit ad hozzá                                                                                     |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Elnevezett z-index mélységek `--instui-stacking-*` tokenként.                                    |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | A `-with-visual-debug` elrendezés-hibakereső kontúr (outline).                                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Márkaikonok a simple-icons gyűjteményből.                                                        |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure terméklogók SVG-ként, data URI-ként és képtokenként.                                 |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Egy PostCSS plugin, amely eltávolítja a nem használt egyéni tulajdonságokat (custom properties). |

## Eszközök

Építési, dokumentációs és demó infrastruktúra magához a monorepóhoz. A legtöbb belső használatú, de a darabok
önállóak, ezért itt dokumentáljuk őket, és néhány önállóan is megjelenik az npm-en.

| Csomag                                             | Mit csinál                                                                                                                                                                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Létrehozza az egyesített `pantoken` csomag barrel-t és a `exports`-t annak függőségeiből.                                                                                                                                            |
| `@pantoken/validate-generated`                     | A drift kapu: ellenőrzi, hogy minden generált stíluslap feloldható-e a token IR-hez képest.                                                                                                                                          |
| [`@pantoken/demo`](/api/tools/demo/src/)           | A saját gazdagépű élő demó futtató: felold egy `@demo` specifikációt egy iframe-re, és nyers HTML/CSS/JS-t renderel azonos eredettel (same-origin), token-témájúan.                                                                  |
| `@cssdoc/core` (external)                          | Egy általános CSS dokumentáció-kinyerő (TSDoc, CSS-hez): elemzi a doc-commenteket + a CSS AST-ot egy olyan modellé, amelyet a doksik CSS API hivatkozásként bocsátanak ki. Saját tárolójában él; linkfüggőségen keresztül érhető el. |

A `@pantoken/validate-generated` egy egyszer futtatható szkript (amelyet a `pnpm run ready` hív meg), így nincs API
oldala; a többinek van.

## AI

Felhasználóoldali AI beállítási eszközök. Ezek olyan projektekhez valók, amelyek a pantokent használják, nem magának a pantokennek a fejlesztéséhez.

- A [`@pantoken/ai`](/api/ai/pantoken-ai/src/) telepíti a `AGENTS.md`, `llms.txt` elemeket, valamint
  asszisztens/szerkesztő szabályokat (Cursor, Copilot, Windsurf, Claude Code) a felhasználói tárhelyre (repository).

## Fejlesztői bővítmények

Olyan bővítmények, amelyeket az általunk használt eszközökhöz készítünk, gazdaeszköz (host) szerint csoportosítva. Önállóak és publikálhatók.

| Csomag                                                                                   | Integráció                                                                                               |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: egy `@demo <provider>:<ref>` blokk-címkét beágyazható demó keretté alakít.                      |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: újraépíti a felettes munkaterület-csomagokat (és a tőlük függőket), amikor a forrásuk megváltozik. |
