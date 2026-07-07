# A csomagtérkép

A pantoken egy monorepo, amely kis, egyetlen célt szolgáló csomagokból áll, csoportokba rendezve.
Telepítsd azt, amelyik illik a feladatodhoz, vagy telepítsd az egységesített `pantoken` csomagot,
és importálj az alútjairól (például `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Mag

A közös modell és a transzformátor, amelyre minden más épül.

| Csomag                                                  | Mit csinál                                                                                          |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Függőségmentes TypeScript-típusok: a `Token` alakja és a beépülő modul szerződése.                  |
| [`@pantoken/core`](/api/packages/core/src/)             | Feloldja a felsőbb tokeneket és ikonokat a kanonikus IR-re, és CSS-t renderel.                      |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | A feloldott IR statikus JSON-ként csomagolva, témánként, plusz a nyers Tokens Studio forrás.        |
| [`@pantoken/utils`](/api/packages/utils/src/)           | A tokenfeloldó, hivatkozási regexek, kis- és nagybetű- és színsegédek, valamint drift-ellenőrzések. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Pantoken beépülő modulok készítése és összeállítása `definePlugin` segítségével.                    |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — natív és platformforrás kiadása.                                     |

## Formátumok

Alakítsd át a tokeneket fájlformátummá.

| Csomag                                                 | Kimenet                                                                                                                                    |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-típusú CSS `light-dark()` értékekkel és data-URI ikonokkal.                                                                    |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS változók, egyetlen módra feloldva.                                                                                                    |
| [`@pantoken/less`](/api/formats/less/src/)             | Less változók.                                                                                                                             |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus változók.                                                                                                                           |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Egy W3C Design Tokens (DTCG) dokumentum.                                                                                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Az IR JavaScript és JSON formátumban (a Mag alatt is szerepel).                                                                            |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Egy ergonomikus nézet az ikontokenek fölött.                                                                                               |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Egy ikon webes betűtípus (TTF, WOFF2) a hozzá tartozó CSS-sel.                                                                             |
| [`@pantoken/components`](/api/formats/components/src/) | Egy InstUI-megjelenésű CSS komponenskönyvtár (gomb, riasztás, táblázat és több) plusz szövegstílus. Lásd [Komponensek](/guide/components). |

## Renderelők

Keretrendszer- és eszközintegrációk.

| Csomag                                                                                                                                           | Mihez                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hookok, `<Icon>`, és egy tokenszolgáltató.                      |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | A webkomponens, minden keretrendszerbe bekötve.                       |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-barát tokenobjektumok (CSS-változók nélkül).               |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` és stílusos primitívek, keretrendszertől függetlenül. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Tokenbeállítás Astro oldalakhoz.                                      |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikontokenek és színminták Markdownban.                                |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Egy markdown-it beépülő modul ikonkódokhoz és színmintákhoz.          |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Egy típusbiztos téma styled-componentshez és Emotionhöz.              |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Egy Material UI téma.                                                 |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-változó hidak a Bootstraphez és a shadcn/uihoz.                   |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Egy Sass beállítás-felülírás és CSS átfedés a Foundationhöz.          |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Témák a Docusaurushoz és a VitePresshez.                              |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Egy Storybook téma.                                                   |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stílusú globális CSS Pendo útmutatókhoz.                  |

## Csomagolók

Építőeszköz-integrációk.

| Csomag                                              | Mihez                                                                 |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Egy Vite beépülő modul virtuális modulokkal és CSS-befecskendezéssel. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` Next.js `transpilePackages` számára.                   |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Egy webpack beépülő modul.                                            |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | A `@pantoken;` at-rule.                                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Egy Tailwind előbeállítás.                                            |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Egy Panda CSS előbeállítás.                                           |

## Platformok

Natív és oldalgeneráló célok, amelyeket a CLI vagy a saját API-juk ad ki.

| Csomag                                                                                         | Kimenet                                        |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift forrás plusz egy SwiftPM manifest csonk. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML erőforrások.                       |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                        |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                  |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust konstansok egui vagy iced számára.        |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Egy WordPress block-theme `theme.json`.        |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Egy Vanilla Forums `variables.json`.           |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal témaeszközök.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo és Jekyll oldaladatok.                    |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Beágyazott értékek HTML e-mailhez.             |

## Design

Tervezőeszközökhöz.

| Csomag                                            | Kimenet                                                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Egy Figma Variables payload.                                               |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Színminták (ASE, GPL, Sketch) plusz egy megtekinthető SVG mintadokumentum. |

## Beépülő modulok

Opcionális transzformációk, amelyek kiterjesztik a token- vagy CSS-kimenetet. Lásd [Beépülő modulok](/guide/plugins).

| Csomag                                                                                | Mit ad hozzá                                                                        |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@pantoken/plugin-focus-outline`](/api/plugins/pantoken/focus-outline/src/)          | Egy fókuszgyűrű tokenkészlet és szabályok.                                          |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Márkaikonok a simple-iconsból.                                                      |
| [`@pantoken/plugin-font-families`](/api/plugins/pantoken/font-families/src/)          | Az Instructure betűtípusai `@font-face` szabályokként és font-family tokenekként.   |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure termékek logói SVG-ként, data URI-ként és képtokenként.                 |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Egy PostCSS beépülő modul, amely eltávolítja a nem használt egyéni tulajdonságokat. |

## Eszközök

Építési, dokumentációs és demó infrastruktúra magához a monorepohoz. A legtöbb belső, de a részek
önállóak, ezért itt dokumentáljuk őket, és néhány önmagában is megjelenik az npm-en.

| Csomag                                             | Mit csinál                                                                                                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Létrehozza az egységesített `pantoken` csomag barrel-jét és `exports`-t a függőségeiből.                                                             |
| `@pantoken/validate-generated`                     | A drift-kapu: ellenőrzi, hogy minden generált stíluslap feloldódik-e a token IR-hez képest.                                                          |
| [`@pantoken/demo`](/api/tools/demo/src/)           | A saját hosztolt élő demó futtató: egy `@demo` specifikációt iframe-re old fel, és puszta HTML/CSS/JS-t renderel azonos eredetben, tokentémás módon. |

A(z) `@pantoken/validate-generated` egy egyszer futtatott szkript (a(z) `pnpm run ready` hívja meg), így nincs API-oldala;
a többinek van.

## Fejlesztői beépülő modulok

Beépülő modulok, amelyeket az általunk használt eszközökhöz írunk, gazda szerint csoportosítva. Önállóak és közzétehetők.

| Csomag                                                                                   | Mibe csatlakozik                                                                             |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: egy `@demo <provider>:<ref>` blokkcímkét beágyazható demókerítéssé alakít.          |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: újraépíti a felsőbb munkaterületi csomagokat (és függőit), amikor a forrásuk változik. |
