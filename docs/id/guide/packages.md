# Peta paket

pantoken adalah monorepo dari paket-paket kecil dan bertujuan tunggal yang dikelompokkan ke dalam bucket. Pasang yang sesuai dengan tugas Anda, atau pasang paket terpadu `pantoken` dan impor dari subpath-nya (misalnya `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Inti

Model bersama dan transformer yang menjadi dasar semuanya.

| Package                                                 | Apa yang dilakukannya                                                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/model`](/api/packages/model/src/)           | Tipe TypeScript tanpa dependensi: bentuk `Token` dan kontrak plugin.                                         |
| [`@pantoken/core`](/api/packages/core/src/)             | Menyelesaikan token dan ikon hulu menjadi IR kanonik, dan merender CSS.                                      |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | IR yang sudah diselesaikan yang dijual sebagai JSON statis, per tema, plus sumber Tokens Studio mentah.      |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Resolver token, regex referensi, helper kasus dan warna, pemeriksaan drift, dan emitter token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Membangun dan menggabungkan plugin pantoken dengan `definePlugin`.                                           |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — menghasilkan sumber native dan platform.                                      |

## Format

Mengubah token menjadi format file.

| Package                                                | Output                                                                                                                                                                                                               |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS bertipe `@property` dengan `light-dark()` dan ikon data-URI.                                                                                                                                                     |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Variabel SCSS, diselesaikan ke satu mode.                                                                                                                                                                            |
| [`@pantoken/less`](/api/formats/less/src/)             | Variabel Less.                                                                                                                                                                                                       |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Variabel Stylus.                                                                                                                                                                                                     |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Dokumen W3C Design Tokens (DTCG).                                                                                                                                                                                    |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR sebagai JavaScript dan JSON (juga tercantum di bawah Inti).                                                                                                                                                       |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Tampilan ergonomis atas token ikon.                                                                                                                                                                                  |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Font web ikon (TTF, WOFF2) dan CSS-nya.                                                                                                                                                                              |
| [`@pantoken/components`](/api/formats/components/src/) | Perpustakaan komponen CSS berpenampilan InstUI (button, alert, table, dan lainnya) plus reset dasar dengan focus ring, styling prose, utilitas lintas-potong, dan font brand. Lihat [Components](/guide/components). |

## Renderer

Integrasi framework dan alat.

| Package                                                                                                                                          | Untuk                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hook React, `<Icon>`, dan penyedia token.                             |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Komponen web, dipasang ke masing-masing framework.                    |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Objek token ramah StyleSheet (tanpa variabel CSS).                    |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` dan primitif bergaya, tanpa ketergantungan framework. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Pengaturan token untuk situs Astro.                                   |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Token ikon dan swatch dalam Markdown.                                 |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Plugin markdown-it untuk kode ikon dan color swatches.                |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Tema bertipe untuk styled-components dan Emotion.                     |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Tema Material UI.                                                     |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Jembatan variabel-CSS untuk Bootstrap dan shadcn/ui.                  |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Override pengaturan Sass dan overlay CSS untuk Foundation.            |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Tema untuk Docusaurus dan VitePress.                                  |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Tema Mintlify `docs.json` (warna + latar).                            |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Tema Storybook.                                                       |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS global bergaya Instructure untuk panduan Pendo.                   |

## Bundler

Integrasi alat build.

| Package                                             | Untuk                                             |
| --------------------------------------------------- | ------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Plugin Vite dengan modul virtual dan injeksi CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` untuk Next.js `transpilePackages`. |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Plugin webpack.                                   |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | At-rule `@pantoken;`.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Preset Tailwind.                                  |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Preset Panda CSS.                                 |

## Platform

Target native dan generator situs, dihasilkan oleh CLI atau API mereka sendiri.

| Package                                                                                        | Output                                   |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Sumber Swift plus stub manifest SwiftPM. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Resource XML Android.                    |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust consts untuk egui atau iced.        |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Tema block WordPress `theme.json`.       |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | `variables.json` untuk Vanilla Forums.   |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Asset tema Drupal.                       |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Data situs Hugo dan Jekyll.              |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Nilai ramah-inline untuk email HTML.     |

## Desain

Untuk alat desain.

| Package                                           | Output                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Payload Figma Variables.                                                     |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Swatch warna (ASE, GPL, Sketch) plus lembar spesimen SVG yang dapat dilihat. |

## Plugin

Transform opsional yang memperluas output token atau CSS. Lihat [Plugins](/guide/plugins).

| Package                                                                               | Apa yang ditambahkan                                                 |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Kedalaman z-index bernama sebagai token `--instui-stacking-*`.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | Outline debugging tata letak `-with-visual-debug`.                   |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Ikon merek dari simple-icons.                                        |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logo produk Instructure sebagai SVG, data URI, dan token gambar.     |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Plugin PostCSS yang menghapus custom properties yang tidak terpakai. |

## Alat

Infrastruktur build, docs, dan demo untuk monorepo itu sendiri. Kebanyakan bersifat internal, tetapi komponennya mandiri, jadi didokumentasikan di sini dan beberapa dipublikasikan ke npm secara terpisah.

| Package                                            | Apa yang dilakukannya                                                                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Menghasilkan paket barel terpadu `pantoken` dan `exports` dari dependensinya.                                                                                                                                       |
| `@pantoken/validate-generated`                     | Gerbang drift: memeriksa setiap stylesheet yang dihasilkan resolves terhadap IR token.                                                                                                                              |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Runner demo live self-hosted: menyelesaikan spesifikasi `@demo` ke iframe dan merender HTML/CSS/JS bare same-origin, bertema token.                                                                                 |
| `@cssdoc/core` (eksternal)                         | Ekstraktor dokumentasi CSS generik (TSDoc, untuk CSS): mem-parsing doc-comment + AST CSS menjadi model yang didorong sebagai referensi API CSS dokumen. Berada di repo sendiri; dikonsumsi sebagai dependensi link. |

`@pantoken/validate-generated` adalah skrip sekali-jalankan (dipanggil oleh `pnpm run ready`), jadi tidak memiliki halaman API; yang lainnya ada.

## AI

Aset pengaturan AI untuk konsumen. Ini untuk proyek yang menggunakan pantoken, bukan untuk mengembangkan pantoken itu sendiri.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) memasang `AGENTS.md`, `llms.txt`, dan aturan asisten/editor (Cursor, Copilot, Windsurf, Claude Code) ke dalam repositori konsumen.

## Plugin pengembang

Plugin yang kami buat untuk alat yang kami bangun, dikelompokkan menurut host. Mereka berdiri sendiri dan dapat dipublikasikan.

| Package                                                                                  | Terhubung ke                                                                                  |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: mengubah tag blok `@demo <provider>:<ref>` menjadi fence demo yang dapat disematkan. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: membangun ulang paket workspace hulu (dan dependennya) ketika sumbernya berubah.        |
