# Kat pakè a

pantoken se yon monorepo ki gen ti pake sèl-bi ki gwoupe an bokit. Enstale sa ki adapte ak travay ou, oswa enstale pake inifye `pantoken` epi enpòte soti nan subpaths li yo (pa egzanp `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Nwayo

Modèl pataje a ak transfòmatè a sou ki tout lòt bagay bati.

| Package                                                 | Sa li fè                                                                                             |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Tip TypeScript san depandans: fòm `Token` ak kontra plugin la.                                       |
| [`@pantoken/core`](/api/packages/core/src/)             | Rezoud tokens ak ikòn upstream yo nan IR kanonik la, epi rann CSS.                                   |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR rezoud la vendored kòm JSON estatik, pa tèm, plis sous Tokens Studio an brèf.                     |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Rezolvatè token yo, regex referans, èd pou ka ak koulè, chèk drift, ak emete token→utility-class yo. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Bati ak konpoze plugins pantoken ak `definePlugin`.                                                  |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emèt sous natif ak pou platfòm.                                       |

## Fòma

Tounen tokens yo an yon fòma dosye.

| Package                                                | Sòti                                                                                                                                                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS tipe `@property` ak `light-dark()` ak ikòn data-URI.                                                                                                                                            |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Varyab SCSS, rezoud nan yon sèl mòd.                                                                                                                                                                |
| [`@pantoken/less`](/api/formats/less/src/)             | Varyab Less.                                                                                                                                                                                        |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Varyab Stylus.                                                                                                                                                                                      |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Yon dokiman W3C Design Tokens (DTCG).                                                                                                                                                               |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR la kòm JavaScript ak JSON (tou mansyone anba Nwayo).                                                                                                                                             |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Yon vi ergonomic sou tokens ikòn yo.                                                                                                                                                                |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Yon font web ikòn (TTF, WOFF2) plis CSS li a.                                                                                                                                                       |
| [`@pantoken/components`](/api/formats/components/src/) | Yon bibliyotèk konpozan CSS ki gen gade InstUI (bouton, alert, tab, ak plis ankò) plis yon reset baz ak bagfokis, estil pwòp, utilitè kwaze, ak polis mak la. Gade [Components](/guide/components). |

## Rannè

Entegrasyon kad ak zouti.

| Package                                                                                                                                          | Pou                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hooks React, `<Icon>`, ak yon provè token.                      |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Konpozan entènèt la, konekte nan chak kad.                      |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Objè token zanmitay pou StyleSheet (pa gen varyab CSS).         |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` ak primitif estilize, san kad.                  |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Konfigurasyon token pou sit Astro.                              |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Tokens ikòn ak swatches nan Markdown.                           |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Yon plugin markdown-it pou kòd ikòn ak echantiyon koulè.        |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Yon tèm tip-segire pou styled-components ak Emotion.            |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Yon tèm Material UI.                                            |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Pon CSS-variable pou Bootstrap ak shadcn/ui.                    |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Yon override anviwònman Sass ak yon overlay CSS pou Foundation. |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Tèm pou Docusaurus ak VitePress.                                |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Yon tèm Mintlify `docs.json` (koulè + background).              |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Yon tèm Storybook.                                              |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS global an style Instructure pou gid Pendo.                  |

## Bundlers

Entegrasyon zouti build.

| Package                                             | Pou                                               |
| --------------------------------------------------- | ------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Yon plugin Vite ak modil vityèl ak injeksyon CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` pou Next.js `transpilePackages`.   |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Yon plugin webpack.                               |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | At-rule `@pantoken;`.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Yon preset Tailwind.                              |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Yon preset Panda CSS.                             |

## Platfòm

Sib natif ak jeneratè sit, emèt pa CLI a oswa pa pwòp API yo.

| Package                                                                                        | Sòti                                       |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Sous Swift plis yon stub manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Resous XML Android.                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                    |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                              |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | consts Rust pou egui oswa iced.            |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Yon block-theme WordPress `theme.json`.    |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Yon Vanilla Forums `variables.json`.       |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Aset tèm Drupal.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Done sit Hugo ak Jekyll.                   |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Valè zanmitay pou HTML imèl.               |

## Design

Pou zouti konsepsyon.

| Package                                           | Sòti                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Yon payload Figma Variables.                                              |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Echantiyon koulè (ASE, GPL, Sketch) plis yon fèy echantiyon SVG ki vizib. |

## Plugins

Transfòmasyon opsyonèl ki elaji sòti token oswa CSS la. Gade [Plugins](/guide/plugins).

| Package                                                                               | Sa li ajoute                                                  |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Nimewo pwofondè z-index kòm tokens `--instui-stacking-*`.     |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Kontou débogaj layout `-with-visual-debug`.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Ikòn mak soti nan simple-icons.                               |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logos pwodwi Instructure kòm SVG, data URI, ak tokens imaj.   |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Yon plugin PostCSS ki retire pwopriyete koutim ki pa itilize. |

## Zouti

Enfrastrikti build, dokiman, ak demo pou monorepo a li menm. Pifò yo entène, men moso yo
endepandan, kidonk dokimante yo isit la epi gen kèk ki pibliye sou npm poukont yo.

| Package                                            | Sa li fè                                                                                                                                                                                           |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Jenere barèl pake inifye `pantoken` ak `exports` soti nan depandans li yo.                                                                                                                         |
| `@pantoken/validate-generated`                     | Gè drift la: verifye chak stylesheet jenere rezoud kont IR token la.                                                                                                                               |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Kouri demo live self-hosted: rezoud yon spes `@demo` nan yon iframe epi rann HTML/CSS/JS bare menm-orijin, tèm token.                                                                              |
| `@cssdoc/core` (external)                          | Yon ekstraktè dokiman CSS jeneral (TSDoc, pou CSS): parse doc-comments + AST CSS la an yon modèl ke dokiman yo emèt kòm referans API CSS la. Li nan pwòp repo li; konsome kòm yon link dependency. |

`@pantoken/validate-generated` se yon script ki kouri yon sèl fwa (envoke pa `pnpm run ready`), kidonk li pa gen paj API; lòt yo genyen.

## AI

Aset konfigirasyon AI pou konsomatè. Sa yo pou pwojè ki itilize pantoken, pa pou devlope
pantoken tèt li.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) enstale `AGENTS.md`, `llms.txt`, ak
  règleman asistans/edite (Cursor, Copilot, Windsurf, Claude Code) nan yon repozitwa konsomatè.

## Dev plugins

Plugins nou ekri pou zouti nou bati avèk yo, gwoupe pa òtèl. Yo endepandan epi pibliye.

| Package                                                                                  | Ploge nan                                                                         |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: tounen yon tag blòk `@demo <provider>:<ref>` an yon demo fence enkwayab. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: rebati pake upstream workspace yo (ak dependants) lè sous yo chanje.        |
