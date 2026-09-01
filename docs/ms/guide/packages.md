# Peta pakej

pantoken ialah monorepo pakej-pakej kecil berfungsi tunggal yang dikumpulkan ke dalam baldi. Pasang yang sesuai untuk tugas anda, atau pasang pakej terpadu `pantoken` dan import dari subpathnya (contohnya `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Teras

Model kongsi dan transformer yang dibina oleh segala-galanya yang lain.

| Package                                                 | What it does                                                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Jenis TypeScript tanpa kebergantungan: bentuk `Token` dan kontrak plugin.                                     |
| [`@pantoken/core`](/api/packages/core/src/)             | Menyelesaikan token dan ikon hulu ke IR kanonik, dan merender CSS.                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR yang diselesaikan disenaraikan sebagai JSON statik, setiap tema, serta sumber Tokens Studio mentah.        |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Penyelesai token, regex rujukan, pembantu kes dan warna, pemeriksaan drift, dan pemancar token→kelas-utiliti. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Membina dan menyusun plugin pantoken dengan `definePlugin`.                                                   |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — terbitkan sumber natif dan untuk platform.                                     |

## Format

Menukar token kepada format fail.

| Package                                                | Output                                                                                                                                                                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS berjenis `@property` dengan `light-dark()` dan ikon data-URI.                                                                                                                                                        |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Pembolehubah SCSS, diselesaikan kepada satu mod.                                                                                                                                                                         |
| [`@pantoken/less`](/api/formats/less/src/)             | Pembolehubah Less.                                                                                                                                                                                                       |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Pembolehubah Stylus.                                                                                                                                                                                                     |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Dokumen W3C Design Tokens (DTCG).                                                                                                                                                                                        |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR sebagai JavaScript dan JSON (juga disenaraikan di bawah Teras).                                                                                                                                                       |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Pandangan ergonomik ke atas token ikon.                                                                                                                                                                                  |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Fon web ikon (TTF, WOFF2) serta CSSnya.                                                                                                                                                                                  |
| [`@pantoken/components`](/api/formats/components/src/) | Perpustakaan komponen CSS berpenampilan InstUI (butang, amaran, jadual, dan lain-lain) serta tetapan asas dengan cincin fokus, gaya prose, utiliti rentas-potong, dan fon jenama. Lihat [Components](/guide/components). |

## Perender

Integrasi rangka kerja dan alat.

| Package                                                                                                                                          | For                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hook React, `<Icon>`, dan penyedia token.                    |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Komponen web, dipautkan ke setiap rangka kerja.              |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Objek token mesra StyleSheet (tanpa pembolehubah CSS).       |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` dan primitif bergaya, bebas-rangka kerja.    |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Persediaan token untuk laman Astro.                          |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Token ikon dan swatch dalam Markdown.                        |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Plugin markdown-it untuk kod ikon dan swatch warna.          |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Tema yang jenis-selamat untuk styled-components dan Emotion. |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Tema Material UI.                                            |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Jambatan pembolehubah-CSS untuk Bootstrap dan shadcn/ui.     |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Gantian tetapan Sass dan lapisan CSS untuk Foundation.       |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Tema untuk Docusaurus dan VitePress.                         |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Tema Mintlify `docs.json` (warna + latar).                   |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Tema Storybook.                                              |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS global berpandukan Instructure untuk panduan Pendo.      |

## Pengikat

Integrasi alat binaan.

| Package                                             | For                                               |
| --------------------------------------------------- | ------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Plugin Vite dengan modul maya dan suntikan CSS.   |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` untuk Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Plugin webpack.                                   |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Preset Tailwind.                                  |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Preset Panda CSS.                                 |

## Platform

Sasaran natif dan penjana laman, diterbitkan oleh CLI atau API mereka sendiri.

| Package                                                                                        | Output                                    |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Sumber Swift serta draf manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Sumber daya XML Android.                  |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                   |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                             |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust const untuk egui atau iced.          |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Tema blok WordPress `theme.json`.         |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | `variables.json` untuk Vanilla Forums.    |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Aset tema Drupal.                         |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Data laman Hugo dan Jekyll.               |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Nilai mesra-inline untuk e-mel HTML.      |

## Reka bentuk

Untuk alat reka bentuk.

| Package                                           | Output                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Muatan Figma Variables.                                                        |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Swatch warna (ASE, GPL, Sketch) serta helaian spesimen SVG yang boleh dilihat. |

## Plugin

Transformasi pilihan yang mengembangkan token atau output CSS. Lihat [Plugins](/guide/plugins).

| Package                                                                               | What it adds                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Kedalaman z-index bernama sebagai token `--instui-stacking-*`.     |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Garis sempadan debugging susun atur `-with-visual-debug`.          |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Ikon jenama dari simple-icons.                                     |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logo produk Instructure sebagai SVG, data URI, dan token imej.     |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Plugin PostCSS yang membuang custom property yang tidak digunakan. |

## Alat

Infrastruktur binaan, dokumentasi, dan demo untuk monorepo itu sendiri. Kebanyakan dalaman, tetapi komponennya berdiri sendiri, jadi didokumentasikan di sini dan sebahagian dihantar ke npm sendiri.

| Package                                            | What it does                                                                                                                                                                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Menghasilkan paket tong (barrel) `pantoken` yang terpadu dan `exports` dari kebergantungannya.                                                                                                                    |
| `@pantoken/validate-generated`                     | Pintu drift: memeriksa setiap stylesheet yang dihasilkan menyelesaikan terhadap IR token.                                                                                                                         |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Pemacu demo hidup sendiri-host: menyelesaikan spes `@demo` kepada iframe dan merender HTML/CSS/JS bare same-origin, bertema token.                                                                                |
| `@cssdoc/core` (external)                          | Pengekstrak dokumentasi CSS generik (TSDoc, untuk CSS): mengurai komen-doc + AST CSS ke dalam model yang didokumenkan sebagai rujukan API CSS. Hidup dalam repo sendiri; digunakan melalui kebergantungan pautan. |

`@pantoken/validate-generated` ialah skrip sekali-jalankan (dipanggil oleh `pnpm run ready`), jadi ia tiada halaman API; yang lain ada.

## AI

Aset persediaan AI untuk pengguna. Ini untuk projek yang menggunakan pantoken, bukan untuk membangunkan pantoken itu sendiri.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) memasang `AGENTS.md`, `llms.txt`, dan peraturan pembantu/editor (Cursor, Copilot, Windsurf, Claude Code) ke dalam repositori pengguna.

## Pemalam dev

Plugin yang ditulis untuk alat yang dibina bersama, dikelompokkan mengikut hos. Mereka berdiri sendiri dan boleh diterbitkan.

| Package                                                                                  | Plugs into                                                                                      |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: menukar tag blok `@demo <provider>:<ref>` menjadi pagar demo yang boleh disematkan.    |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: menyusun semula pakej workspace hulu (dan yang bergantung) apabila sumber mereka berubah. |
