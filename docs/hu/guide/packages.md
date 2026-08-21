# A csomagtérkép

A pantoken kisméretű, egyetlen célt szolgáló csomagok monorepója, kategóriákba csoportosítva. Telepítsd azt, amelyik illik a feladatodhoz, vagy telepítsd az egységes `pantoken` csomagot, és importálj annak alútvonalaiból (például `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Core

A megosztott modell és a transzformátor, amelyre minden más épül.

| Csomag                                                  | Mit csinál                                                                                                                         |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Függőségmentes TypeScript típusok: a `Token` struktúra és a plugin-szerződés.                                                      |
| [`@pantoken/core`](/api/packages/core/src/)             | Feloldja a forrás (upstream) tokeneket és ikonokat a kanonikus IR-be, és CSS-t renderel.                                           |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | A feloldott IR statikus JSON-ként szállítva, témánként, valamint a nyers Tokens Studio forrás.                                     |
| [`@pantoken/utils`](/api/packages/utils/src/)           | A tokenfeloldó, referencia-regexek, kis-/nagybetű és szín segédfunkciók, drift-ellenőrzések és a token→utility-osztály kibocsátók. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | pantoken pluginok készítése és összeállítása a `definePlugin` segítségével.                                                        |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — natív és platform forráskód generálása.                                                             |

## Formátumok

Alakítsd a tokeneket fájlformátummá.

| Csomag                                                 | Kimenet                                                                                                                                                                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-típusú CSS `light-dark()`-vel és data-URI ikonokkal.                                                                                                                                                                       |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS változók, egyetlen módra feloldva.                                                                                                                                                                                                |
| [`@pantoken/less`](/api/formats/less/src/)             | Less változók.                                                                                                                                                                                                                         |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus változók.                                                                                                                                                                                                                       |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Egy W3C Design Tokens (DTCG) dokumentum.                                                                                                                                                                                               |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Az IR JavaScript és JSON formátumban (a Core alatt is szerepel).                                                                                                                                                                       |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonomikus nézet az ikontokenekhez.                                                                                                                                                                                                   |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Egy ikon webbetűtípus (TTF, WOFF2) és a hozzá tartozó CSS.                                                                                                                                                                             |
| [`@pantoken/components`](/api/formats/components/src/) | Egy InstUI-megjelenésű CSS komponenskönyvtár (gomb, alert, táblázat és egyebek), valamint egy alap reset fókuszgyűrűvel, szövegstílusokkal, átfogó segédeszközökkel és a márka betűtípusaival. Lásd: [Komponensek](/guide/components). |

## Rendererek

Keretrendszer- és eszközintegrációk.

| Csomag                                                                                                                                           | Rendeltetés                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hookok, `<Icon>`, és egy token provider.                        |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | A webes komponens, az egyes keretrendszerekbe bekötve.                |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-barát tokenobjektumok (CSS változók nélkül).               |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` és stílusozott primitívek, keretrendszer-függetlenül. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-beállítás Astro webhelyekhez.                                   |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikontokenek és színminták Markdownban.                                |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Egy markdown-it plugin ikonkódokhoz és színmintákhoz.                 |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Típusbiztos téma a styled-components-hez és az Emotionhöz.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI téma.                                                     |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-változó hidak Bootstraphez és shadcn/ui-hoz.                      |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass beállítás-felülbírálás és CSS overlay a Foundationhöz.           |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Témák Docusaurushoz és VitePresshez.                                  |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` téma (színek + háttér).                          |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook téma.                                                       |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stílusú globális CSS a Pendo útmutatókhoz.                |

## Bundlerek

Build-eszköz integrációk.

| Csomag                                              | Rendeltetés                                            |
| --------------------------------------------------- | ------------------------------------------------------ |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite plugin virtuális modulokkal és CSS-injektálással. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` a Next.js `transpilePackages`-hoz.      |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Webpack plugin.                                        |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | A `@pantoken;` at-szabály.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind preset.                                       |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS preset.                                      |

## Platformok

Natív és oldalgenerátor célplatformok, amelyeket a CLI vagy a saját API-juk bocsát ki.

| Csomag                                                                                         | Kimenet                                              |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift forráskód plusz egy SwiftPM jegyzékfájl csonk. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML erőforrások.                             |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                              |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                        |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust konstansok egui-hoz vagy iced-hez.              |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress blokktéma `theme.json`.                    |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.                     |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal téma assetek.                                 |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo és Jekyll webhelyadatok.                        |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-barát értékek HTML e-mailekhez.               |

## Design

Dizájneszközökhöz.

| Csomag                                            | Kimenet                                                          |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables adatcsomag.                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Színminták (ASE, GPL, Sketch) és egy megtekinthető SVG mintalap. |

## Pluginok

Opcionális transzformációk, amelyek kibővítik a token- vagy CSS-kimenetet. Lásd: [Plugins](/guide/plugins).

| Csomag                                                                                | Mit ad hozzá                                                             |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Elnevezett z-index mélységek `--instui-stacking-*` tokenekként.          |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | A `-with-visual-debug` elrendezés-hibakereső körvonal.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Márkaikonok a simple-icons-ból.                                          |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure terméklogók SVG-ként, data URI-ként és képtokenként.         |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Egy PostCSS plugin, amely eldobja a nem használt egyéni tulajdonságokat. |

## Eszközök

Build-, dokumentációs és demóinfrastruktúra magához a monorepóhoz. A legtöbb belső használatú, de az elemek önállóak, ezért itt dokumentáljuk őket, és néhány önállóan is megjelenik az npm-en.

| Csomag                                             | Mit csinál                                                                                                                                                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Legenerálja az egységes `pantoken` csomag barreljét és a(z) `exports`-t a függőségeiből.                                                                                                                                                   |
| `@pantoken/validate-generated`                     | A drift kapu: ellenőrzi, hogy minden generált stíluslap feloldható-e a token IR alapján.                                                                                                                                                   |
| [`@pantoken/demo`](/api/tools/demo/src/)           | A saját üzemeltetésű élő demó futtató: felold egy `@demo` specifikációt egy iframe-be, és tiszta HTML/CSS/JS-t renderel azonos eredettel (same-origin), token-témázva.                                                                     |
| `@cssdoc/core` (external)                          | Egy általános CSS-dokumentáció kivonatoló (TSDoc, CSS-hez): elemzi a doc-kommentárokat + a CSS AST-ot egy olyan modellbe, amelyet a dokumentáció CSS API-referenciaként bocsát ki. Saját repójában él; link függőségként van felhasználva. |

A(z) `@pantoken/validate-generated` egy egyszer futtatandó script (amelyet a(z) `pnpm run ready` hív meg), így nincs API-oldala; a többinek viszont van.

## AI

Felhasználók számára készült AI-beállítási kellékek (assets). Ezek olyan projektekhez valók, amelyek a pantokent használják, nem pedig magának a pantokennek a fejlesztéséhez.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) telepíti a(z) `AGENTS.md`, `llms.txt` elemeket és az asszisztens-/szerkesztőszabályokat (Cursor, Copilot, Windsurf, Claude Code) a felhasználói repóba.

## Fejlesztői pluginok

Olyan pluginok, amelyeket az általunk használt eszközökhöz készítünk, host szerint csoportosítva. Önállóak és közzétehetők.

| Csomag                                                                                   | Ide épül be                                                                                               |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: a(z) `@demo <provider>:<ref>` blokkcímkét beágyazható demó blokká alakítja át.                   |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: újraépíti a felsőbb szintű workspace csomagokat (és a függőségeket), amikor megváltozik a forrásuk. |
