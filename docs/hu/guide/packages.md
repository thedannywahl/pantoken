# A csomagtérkép

a pantoken egy monorepo, amely kis, egycélú csomagokra van bontva vödrökbe csoportosítva. Telepítsd azt, amelyik a feladatodhoz illik, vagy telepítsd az egyesített `pantoken` csomagot és importálj az alútvonalairól (például `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Core

A megosztott modell és a transzformátor, amire minden más épül.

| Package                                                 | Mit csinál                                                                                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Függőségmentes TypeScript típusok: a `Token` alak és a plugin szerződés.                                                        |
| [`@pantoken/core`](/api/packages/core/src/)             | A felfelé mutató tokeneket és ikonokat a kanonikus IR-re oldja fel, és CSS-t renderel.                                          |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | A feloldott IR statikus JSON-ként, témánként, plusz a nyers Tokens Studio forrás.                                               |
| [`@pantoken/utils`](/api/packages/utils/src/)           | A token feloldó, referencia reguláris kifejezések, eset- és színsegítők, drift-ellenőrzések és a token→utility-class emitterek. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Pantoken pluginok építése és komponálása `definePlugin` segítségével.                                                           |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — natív és platform forrás kibocsátása.                                                            |

## Formátumok

A tokeneket fájlformátummá alakítja.

| Package                                                | Kimenet                                                                                                                                                                                                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-típusú CSS `light-dark()` és data-URI ikonokkal.                                                                                                                                                                                |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS változók, egyetlen módra feloldva.                                                                                                                                                                                                     |
| [`@pantoken/less`](/api/formats/less/src/)             | Less változók.                                                                                                                                                                                                                              |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus változók.                                                                                                                                                                                                                            |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Egy W3C Design Tokens (DTCG) dokumentum.                                                                                                                                                                                                    |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | Az IR JavaScript és JSON formátumban (szintén a Core alatt felsorolva).                                                                                                                                                                     |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonomikus nézet az ikon tokenekhez.                                                                                                                                                                                                       |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Egy ikon webfont (TTF, WOFF2) és a hozzá tartozó CSS.                                                                                                                                                                                       |
| [`@pantoken/components`](/api/formats/components/src/) | Egy InstUI-s megjelenésű CSS komponens könyvtár (gomb, figyelmeztetés, táblázat és még sok más) plusz egy alap reset fókuszgyűrűvel, prose stílussal, keresztmetszeti utilokkal és a márkabetűkkel. Lásd a [Components](/guide/components). |

## Renderelők

Keretrendszer- és eszközintegrációk.

| Package                                                                                                                                          | Mire való                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hookok, `<Icon>` és egy token provider.                     |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | A webkomponens, mindegyik keretrendszerbe bekötve.                |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-barát token objektumok (nincsenek CSS változók).       |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` és stílusolt primitívek, keretrendszer-független. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token beállítás Astro oldalakhoz.                                 |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikon tokenek és színminták Markdownban.                           |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Egy markdown-it plugin ikon kódokhoz és színmintákhoz.            |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Típusbiztos téma styled-components és Emotion számára.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Egy Material UI téma.                                             |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-változó hidak Bootstrap és shadcn/ui számára.                 |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Egy Sass beállítás-felülírás és CSS réteg Foundation számára.     |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Témák Docusaurus és VitePress számára.                            |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Egy Mintlify `docs.json` téma (színek + háttér).                  |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Egy Storybook téma.                                               |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stílusú globális CSS Pendo útmutatókhoz.              |

## Bundlerek

Build-eszköz integrációk.

| Package                                             | Mire jó                                                    |
| --------------------------------------------------- | ---------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Egy Vite plugin virtuális modulokkal és CSS injektálással. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` Next.js `transpilePackages` számára.        |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Egy webpack plugin.                                        |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | A `@pantoken;` at-rule.                                    |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Egy Tailwind preset.                                       |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Egy Panda CSS preset.                                      |

## Platformok

Natív és site-generator célok, amelyeket a CLI vagy saját API-juk bocsát ki.

| Package                                                                                        | Kimenet                                       |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift forrás plusz egy SwiftPM manifest stub. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML erőforrások.                      |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                       |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                 |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust constok egui vagy iced számára.          |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Egy WordPress block-theme `theme.json`.       |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Egy Vanilla Forums `variables.json`.          |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal téma erőforrások.                      |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo és Jekyll site adatok.                   |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-barát értékek HTML emailhez.           |

## Design

Tervezőeszközök számára.

| Package                                           | Kimenet                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Egy Figma Variables payload.                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Színminták (ASE, GPL, Sketch) plusz megtekinthető SVG mintaoldal. |

## Pluginok

Opcionális transzformációk, melyek kiterjesztik a token vagy a CSS kimenetet. Lásd a [Plugins](/guide/plugins).

| Package                                                                               | Mit ad hozzá                                                              |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Nevezett z-index mélységek `--instui-stacking-*` tokenként.               |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | A `-with-visual-debug` layout-hibakereső kontúr.                          |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Márkák ikonjai a simple-icons-ból.                                        |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure terméklogók SVG-ként, data URI-ként és kép tokenekként.       |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Egy PostCSS plugin, amely eltávolítja a nem használt custom property-ket. |

## Eszközök

A monorepo építési, dokumentációs és demo infrastruktúrája. A legtöbb belső használatú, de az elemek önállók, ezért dokumentáljuk őket itt, és néhány külön is megjelenik npm-en.

| Package                                            | Mit csinál                                                                                                                                                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generálja az egyesített `pantoken` csomag barreljét és `exports`-t a függőségeiből.                                                                                                                                       |
| `@pantoken/validate-generated`                     | A drift gate: ellenőrzi, hogy minden generált stylesheet feloldható-e a token IR-re.                                                                                                                                      |
| [`@pantoken/demo`](/api/tools/demo/src/)           | A self-hosted live-demo futtató: egy `@demo` specifikációt iframe-be old fel és renderel bare HTML/CSS/JS-t same-origin, token-tematikusan.                                                                               |
| `@cssdoc/core` (külső)                             | Egy generikus CSS dokumentációs kinyerő (TSDoc, CSS-hez): elemzi a doc-kommenteket + a CSS AST-t egy modellbe, amelyet a doksik CSS API referencia céljára bocsátanak ki. Saját repóban él; link-függőségként fogyasztva. |

`@pantoken/validate-generated` egy egyszer lefutó script (amit `pnpm run ready` hív), így nincs API oldala; a többieknek van.

## AI

Fogyasztó-orientált AI beállítási eszközök. Ezek olyan projektekhez valók, amelyek pantoken-t használnak, nem a pantoken fejlesztéséhez.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) telepíti `AGENTS.md`, `llms.txt` és az asszisztens/szerkesztő szabályokat (Cursor, Copilot, Windsurf, Claude Code) egy fogyasztói repóba.

## Dev pluginok

Pluginok, amelyeket a saját eszközeinkhez írunk, host szerint csoportosítva. Önállók és publikálhatók.

| Package                                                                                  | Mire csatlakozik                                                                             |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: egy `@demo <provider>:<ref>` blokk tag-et beágyazható demo fence-é alakít.          |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: újraépíti a feláramló workspace csomagokat (és függőiket), amikor a forrásuk változik. |
