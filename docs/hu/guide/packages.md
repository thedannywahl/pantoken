# A csomagtérkép

A pantoken egy monorepo, amely apró, egy célra szolgáló csomagokból áll, csoportokba rendezve. Telepítsd azt, amelyik
a feladatodhoz illik, vagy telepítsd az egyesített `pantoken` csomagot, és importálj annak alútvonalaiból (például
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Mag

A közös modell és a transzformer, amelyre minden más épül.

| Csomag                                                  | Mit csinál                                                                                                                                          |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Függőség nélküli TypeScript típusok: a `Token` alakja és a plugin-szerződés.                                                                        |
| [`@pantoken/core`](/api/packages/core/src/)             | A feljebb lévő tokeneket és ikonokat feloldja a kanonikus IR-be, és CSS-t renderel.                                                                 |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | A feloldott IR statikus JSON-ként csomagolva, témánként, valamint a nyers Tokens Studio forrás.                                                     |
| [`@pantoken/utils`](/api/packages/utils/src/)           | A token-feloldó, hivatkozási reguláris kifejezések, kis- és nagybetűs, valamint színsegédek, drift-ellenőrzések és a token→segédosztály-kibocsátók. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Pantoken pluginok építése és összeállítása `definePlugin` segítségével.                                                                             |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — natív és platformforrás kibocsátása.                                                                                 |

## Formátumok

Alakítsd át a tokeneket egy fájlformátumra.

| Csomag                                                 | Kimenet                                                                                                                                                                                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-típusos CSS `light-dark()` és data-URI ikonokkal.                                                                                                                                                                               |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS változók, egyetlen módra feloldva.                                                                                                                                                                                                     |
| [`@pantoken/less`](/api/formats/less/src/)             | Less változók.                                                                                                                                                                                                                              |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus változók.                                                                                                                                                                                                                            |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Egy W3C Design Tokens (DTCG) dokumentum.                                                                                                                                                                                                    |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Az IR JavaScriptként és JSON-ként (a Mag alatt is szerepel).                                                                                                                                                                                |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Egy ergonomikus nézet az ikon-tokenek felett.                                                                                                                                                                                               |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Egy ikon webfont (TTF, WOFF2) a hozzá tartozó CSS-sel.                                                                                                                                                                                      |
| [`@pantoken/components`](/api/formats/components/src/) | Egy InstUI-megjelenésű CSS komponenskönyvtár (button, alert, table és mások), valamint egy alap reset fókuszgyűrűvel, prose-stílussal, keresztmetszeti segédosztályokkal és a márka betűtípusokkal. Lásd: [Komponensek](/guide/components). |

## Renderelők

Keretrendszer- és eszközintegrációk.

| Csomag                                                                                                                                           | Mihez                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hookok, `<Icon>` és egy token-provider.                       |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | A webkomponens, minden keretrendszerhez bekötve.                    |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-barát token-objektumok (CSS változók nélkül).            |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` és stílusozott primitívek, keretrendszer-független. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-beállítás Astro oldalakhoz.                                   |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikon-tokenek és színminták Markdownban.                             |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Egy markdown-it plugin ikonkódokhoz és színmintákhoz.               |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Egy típusbiztos téma styled-componentshez és Emotionhöz.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Egy Material UI téma.                                               |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-változó hidak Bootstraphoz és shadcn/ui-hoz.                    |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass-beállítás felülírás és CSS-réteg a Foundationhöz.              |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Témák Docusaurushoz és VitePresshez.                                |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Egy Mintlify `docs.json` téma (színek + háttér).                    |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Egy Storybook téma.                                                 |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stílusú globális CSS Pendo útmutatókhoz.                |

## Bundler-ek

Build-eszköz integrációk.

| Csomag                                              | Mihez                                                    |
| --------------------------------------------------- | -------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Egy Vite plugin virtuális modulokkal és CSS-injekcióval. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` Next.js `transpilePackages` számára.      |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Egy webpack plugin.                                      |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | A `@pantoken;` at-szabály.                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Egy Tailwind preset.                                     |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Egy Panda CSS preset.                                    |

## Platformok

Natív és oldalgenerátor célok, amelyeket a CLI vagy a saját API-juk bocsát ki.

| Csomag                                                                                         | Kimenet                                     |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift forrás egy SwiftPM manifest-csonkkal. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML erőforrások.                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                     |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                               |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust constok egui-hoz vagy iced-hez.        |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Egy WordPress blokk-téma `theme.json`.      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Egy Vanilla Forums `variables.json`.        |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal téma-eszközök.                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo és Jekyll oldal-adatok.                |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-barát értékek HTML e-mailhez.        |

## Design

Tervezőeszközökhöz.

| Csomag                                            | Kimenet                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Egy Figma Variables payload.                                            |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Színminták (ASE, GPL, Sketch), valamint egy megtekinthető SVG mintalap. |

## Pluginok

Opcionális transzformációk, amelyek kiterjesztik a token- vagy CSS-kimenetet. Lásd: [Pluginok](/guide/plugins).

| Csomag                                                                                | Mit ad hozzá                                                                 |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Elnevezett z-index mélységek tokenként + `.instui-stack-*` osztályok.        |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | A `-with-visual-debug` elrendezés-hibakereső körvonal.                       |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Márkaikonok a simple-icons csomagból.                                        |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure termék-logók SVG-ként, data URI-ként és képi tokenként.          |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Egy PostCSS plugin, amely eltávolítja a nem használt egyéni tulajdonságokat. |

## Eszközök

Build-, dokumentációs és demó-infrastruktúra magához a monorepohoz. A legtöbb belső használatra van, de a darabok
önállóak, így itt dokumentáljuk őket, és néhány önmagában is elérhető az npm-en.

| Csomag                                             | Mit csinál                                                                                                                                                                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generálja az egyesített `pantoken` csomag-barrelt és `exports` a függőségeiből.                                                                                                                                                   |
| `@pantoken/validate-generated`                     | A drift-kapu: ellenőrzi, hogy minden generált stíluslap feloldódik a token IR-hez képest.                                                                                                                                         |
| [`@pantoken/demo`](/api/tools/demo/src/)           | A saját üzemeltetésű élő-demó futtató: feloldja a `@demo` specifikációt egy iframe-be, és nyers HTML/CSS/JS-t renderel same-origin módon, token-témával.                                                                          |
| `@cssdoc/core` (külső)                             | Egy általános CSS-dokumentáció-kinyerő (TSDoc, de CSS-hez): a doc-kommenteket + a CSS AST-t egy modellbe elemzi, amelyet a dokumentáció CSS API-referenciaként bocsát ki. Saját repóban él; link-függőségen keresztül használjuk. |

A `@pantoken/validate-generated` egy egyszer futó szkript (a `pnpm run ready` hívja meg), így nincs API-oldala; a többinek van.

## Dev pluginok

Pluginok, amelyeket az általunk használt eszközökhöz írunk, host szerint csoportosítva. Önállóak és publikálhatók.

| Csomag                                                                                   | Mihez csatlakozik                                                                                         |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: egy `@demo <provider>:<ref>` blokk-taget beágyazható demó-kerítéssé alakít.                      |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: újraépíti a feljebb lévő workspace-csomagokat (és a rájuk épülőket), amikor a forrásuk megváltozik. |
