# Zemljevid paketov

pantoken je monorepo majhnih, enonamenskih paketov, združenih v vedra. Namestite tistega, ki ustreza vaši nalogi, ali namestite združeni `pantoken` paket in uvozite iz njegovih podpot (na primer
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Jedro

Deljeni model in transformator, na katerem temelji vse ostalo.

| Package                                                 | Kaj počne                                                                                                            |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | TypeScript tipi brez odvisnosti: oblika `Token` in pogodba za vtičnike.                                              |
| [`@pantoken/core`](/api/packages/core/src/)             | Rešuje (resolves) upstream tokene in ikone v canonical IR ter renderira CSS.                                         |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Rešeni IR vključen kot statični JSON, po temah, plus surov izvor Tokens Studio.                                      |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Rešilec tokenov, regexi referenc, pripomočki za velikost črk in barv, drift checks in emitterji token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Sestavljanje in gradnja pantoken vtičnikov z `definePlugin`.                                                         |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — oddaja (emit) nativne in platformne izvorne kode.                                     |

## Formati

Pretvorba tokenov v datotečne formate.

| Package                                                | Izhod                                                                                                                                                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-tipiziran CSS z `light-dark()` in ikonami kot data-URI.                                                                                                                                                  |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS spremenljivke, rešene v en sam način.                                                                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | Less spremenljivke.                                                                                                                                                                                                  |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus spremenljivke.                                                                                                                                                                                                |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Dokument W3C Design Tokens (DTCG).                                                                                                                                                                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR kot JavaScript in JSON (tudi navedeno pod Jedrom).                                                                                                                                                                |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonomski pogled na ikončne tokene.                                                                                                                                                                                 |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Ikonična spletna pisava (TTF, WOFF2) plus pripadajoči CSS.                                                                                                                                                           |
| [`@pantoken/components`](/api/formats/components/src/) | CSS knjižnica komponent z videzom InstUI (gumb, opozorilo, tabela in več) plus osnovni reset s fokus obrobo, prose stilizacijo, prečno uporabnimi utilitami in brand pisavami. Glej [Components](/guide/components). |

## Rendererji

Okviri in integracije orodij.

| Package                                                                                                                                          | Za                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooki, `<Icon>` in token provider.                   |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Web komponenta, povezana z vsakim ogrodjem.                |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-prijazni token objekti (brez CSS spremenljivk). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` in styled primitive, neodvisno od ogrodja. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Nastavitev tokenov za Astro strani.                        |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikonni tokeni in barvne vzorčnice v Markdownu.             |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Plugin za markdown-it za ikončne kode in barvne vzorčnice. |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Tip-varna tema za styled-components in Emotion.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Tema za Material UI.                                       |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Mostovi z CSS-spremenljivkami za Bootstrap in shadcn/ui.   |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass nastavitev override in CSS overlay za Foundation.     |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Teme za Docusaurus in VitePress.                           |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` tema (barve + ozadje).                |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Tema za Storybook.                                         |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-stilirani globalni CSS za Pendo vodiče.        |

## Bundlerji

Integracije gradbenih orodij.

| Package                                             | Za                                                 |
| --------------------------------------------------- | -------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite plugin z virtualnimi moduli in CSS injection. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` za Next.js `transpilePackages`.     |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Webpack plugin.                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule.                              |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind preset.                                   |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS preset.                                  |

## Platforme

Nativni in site-generator cilji, izdani s CLI ali lastnim API-jem.

| Package                                                                                        | Izhod                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift izvorna koda plus Stub za SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML viri.                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consti za npr. egui ali iced.       |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress block-theme `theme.json`.      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.         |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal teme in sredstva.                 |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo in Jekyll site podatki.             |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Vrednosti prijazne za inline HTML email. |

## Dizajn

Za oblikovalska orodja.

| Package                                           | Izhod                                                           |
| ------------------------------------------------- | --------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables payload.                                        |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Barvne vzorčnice (ASE, GPL, Sketch) plus pogledna SVG listnica. |

## Vtičniki

Neobvezne transformacije, ki razširijo izhod tokenov ali CSS. Glej [Plugins](/guide/plugins).

| Package                                                                               | Kaj doda                                                          |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Imenovani z-index globine kot `--instui-stacking-*` tokeni.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` oris za debug postavitve.                    |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Blagovne znamke ikon iz simple-icons.                             |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure produktne logotipe kot SVG, data URI in image tokene. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | PostCSS plugin, ki odstrani neuporabljene custom properties.      |

## Orodja

Gradnja, dokumentacija in demo infrastruktura samega monorepa. Večina je interna, a so deli
samostojni, zato jih tukaj dokumentiramo in nekateri so izdajani na npm ločeno.

| Package                                            | Kaj počne                                                                                                                                                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generira združeni `pantoken` paketni barrel in `exports` iz njegovih odvisnosti.                                                                                                                           |
| `@pantoken/validate-generated`                     | Drift gate: preveri, da se vsak generiran stylesheet reši proti token IR.                                                                                                                                  |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Samopostavljalni live-demo runner: reši `@demo` specifikacijo v iframe in renderira golo HTML/CSS/JS iste domene, token-tematsko.                                                                          |
| `@cssdoc/core` (external)                          | Splošen CSS dokumentacijski extractor (TSDoc, za CSS): parsira doc-comment-e + CSS AST v model, ki ga dokumentacija odda kot CSS API referenco. Živi v ločenem repozitoriju; porabljen kot link odvisnost. |

`@pantoken/validate-generated` je skripta za enkratno zagon (klicana z `pnpm run ready`), zato nima API strani; ostali jo imajo.

## AI

Potrošniški AI pripomočki. Namenjeni projektom, ki uporabljajo pantoken, ne za razvijanje pantoken samega.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) namesti `AGENTS.md`, `llms.txt` in
  pravila za asistenta/urejevalnik (Cursor, Copilot, Windsurf, Claude Code) v potrošniško repozitorij.

## Dev vtičniki

Vtičniki, ki jih ustvarjamo za orodja, s katerimi gradimo, združeni po gostitelju. So samostojni in objavljivi.

| Package                                                                                  | Povezuje se z                                                                           |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: pretvori `@demo <provider>:<ref>` block tag v vdelan demo fence.               |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: ponovno gradi upstream workspace pakete (in odvisne) ko se njihov izvor spremeni. |
