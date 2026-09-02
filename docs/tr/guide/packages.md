# Paket haritası

pantoken, kovalar halinde gruplanmış, küçük ve tek amaçlı paketlerden oluşan bir monorepo'dur. Görevinize uyanı yükleyin veya birleşik `pantoken` paketini yükleyip alt yollarından içe aktarın (örneğin `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Çekirdek

Diğer her şeyin üzerine inşa edildiği paylaşılan model ve dönüştürücü.

| Package                                                 | Ne yapar                                                                                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Bağımlılık gerektirmeyen TypeScript türleri: `Token` şekli ve eklenti sözleşmesi.                                                  |
| [`@pantoken/core`](/api/packages/core/src/)             | Yukarı akış tokenlerini ve ikonları canonical IR'ye çözer ve CSS oluşturur.                                                        |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Temaya göre satatik JSON olarak vendor'lanmış çözümlenmiş IR ve ham Tokens Studio kaynağı.                                         |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token çözücüsü, referans regex'leri, büyük/küçük harf ve renk yardımcıları, drift kontrolleri ve token→utility-class emitter'ları. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | `definePlugin` ile pantoken eklentileri oluşturma ve birleştirme.                                                                  |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — yerel ve platform kaynaklarını üretir.                                                              |

## Formatlar

Token'ları bir dosya formatına dönüştürme.

| Package                                                | Çıktı                                                                                                                                                                                                                          |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property` tipli CSS, `light-dark()` ve data-URI ikonlarla.                                                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Tek moda çözümlenmiş SCSS değişkenleri.                                                                                                                                                                                        |
| [`@pantoken/less`](/api/formats/less/src/)             | Less değişkenleri.                                                                                                                                                                                                             |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus değişkenleri.                                                                                                                                                                                                           |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Bir W3C Design Tokens (DTCG) dokümanı.                                                                                                                                                                                         |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | JavaScript ve JSON olarak IR (Çekirdek altında da listelenir).                                                                                                                                                                 |
| [`@pantoken/icons`](/api/formats/icons/src/)           | İkon token'ları üzerinde ergonomik bir görünüm.                                                                                                                                                                                |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Bir ikon web fontu (TTF, WOFF2) ve ilgili CSS.                                                                                                                                                                                 |
| [`@pantoken/components`](/api/formats/components/src/) | Bir InstUI görünümlü CSS bileşen kütüphanesi (buton, uyarı, tablo ve daha fazlası) artı odak halkası, yazı stili, yatay-kesit yardımcıları ve marka fontları içeren temel bir sıfırlama. Bkz. [Components](/guide/components). |

## Renderer'lar

Çerçeve ve araç entegrasyonları.

| Package                                                                                                                                          | İçin                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hook'ları, `<Icon>` ve bir token sağlayıcı.                      |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Her çerçeveye bağlanmış web bileşeni.                                  |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-dostu token nesneleri (CSS değişkeni yok).                  |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` ve stilize edilmiş ilkel bileşenler, çerçeve-agnostik. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Astro siteleri için token kurulumu.                                    |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Markdown içinde ikon token'ları ve renk örnekleri.                     |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | İkon kodları ve renk örnekleri için markdown-it eklentisi.             |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | styled-components ve Emotion için tip-güvenli bir tema.                |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Bir Material UI teması.                                                |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Bootstrap ve shadcn/ui için CSS-değişken köprüleri.                    |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Foundation için bir Sass ayar geçersiz kılma ve CSS üstü katman.       |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Docusaurus ve VitePress için temalar.                                  |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Bir Mintlify `docs.json` teması (renkler + arka plan).                 |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Bir Storybook teması.                                                  |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Pendo rehberleri için Instructure-stylized global CSS.                 |

## Paketleyiciler

Build-aracı entegrasyonları.

| Package                                             | İçin                                                      |
| --------------------------------------------------- | --------------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Sanal modüller ve CSS enjeksiyonu ile bir Vite eklentisi. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | Next.js için `withPantoken` `transpilePackages`.          |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Bir webpack eklentisi.                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-kuralı.                                   |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Bir Tailwind ön ayarı.                                    |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Bir Panda CSS ön ayarı.                                   |

## Platformlar

CLI veya kendi API'leri tarafından üretilen yerel ve site-generator hedefleri.

| Package                                                                                        | Çıktı                                             |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift kaynakları ve bir SwiftPM manifest taslağı. |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML kaynakları.                           |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                           |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                     |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | egui veya iced için Rust const'ları.              |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Bir WordPress block-theme `theme.json`.           |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Bir Vanilla Forums `variables.json`.              |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal tema varlıkları.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo ve Jekyll site verileri.                     |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | HTML e-posta için inline-dostu değerler.          |

## Tasarım

Tasarım araçları için.

| Package                                           | Çıktı                                                                          |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Bir Figma Variables yükü.                                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Renk örnekleri (ASE, GPL, Sketch) artı görüntülenebilir bir SVG örnek sayfası. |

## Eklentiler

Token veya CSS çıktısını genişleten isteğe bağlı dönüştürmeler. Bkz. [Plugins](/guide/plugins).

| Package                                                                               | Ne ekler                                                                       |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | İsimlendirilmiş z-index derinlikleri olarak `--instui-stacking-*` token'ları.  |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` düzen-hata ayıklama konturunu.                            |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | simple-icons'tan marka ikonları.                                               |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure ürün logoları SVG olarak, data URI ve görüntü token'ları şeklinde. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Kullanılmayan custom property'leri düşüren bir PostCSS eklentisi.              |

## Araçlar

Monorepo'nun kendisi için derleme, dokümantasyon ve demo altyapısı. Çoğu dahili olsa da parçalar kendi başına çalışır, bu yüzden burada belgeliyoruz ve bazıları npm'e de gönderilir.

| Package                                            | Ne yapar                                                                                                                                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Birleşik `pantoken` paket varilini ve bağımlılıklarından `exports` üretir.                                                                                                                                          |
| `@pantoken/validate-generated`                     | Drift kapısı: üretilen her stil sayfasının token IR'ye göre çözümlendiğini kontrol eder.                                                                                                                            |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Self-hosted canlı demo çalıştırıcısı: bir `@demo` spesifikasyonunu iframe'e çözer ve aynı-kaynakta çıplak HTML/CSS/JS olarak token-temalı render eder.                                                              |
| `@cssdoc/core` (harici)                            | Genel bir CSS dokümantasyon çıkarıcı (TSDoc, CSS için): doc-comment'leri + CSS AST'sini, dokümanların CSS API referansı olarak yaydığı bir modele parse eder. Kendi deposunda yaşar; link bağımlılığıyla tüketilir. |

`@pantoken/validate-generated` bir kez çalıştırılan bir betiktir ( `pnpm run ready` tarafından çağrılır), bu yüzden bir API sayfası yoktur; diğerlerinin vardır.

## AI

Tüketiciye yönelik AI kurulum varlıkları. Bunlar pantoken kullanan projeler içindir, pantoken geliştirmek için değildir.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) `AGENTS.md`, `llms.txt` ve
  asistan/düzenleyici kurallarını (Cursor, Copilot, Windsurf, Claude Code) bir tüketici deposuna kurar.

## Geliştirici eklentileri

Kullandığımız araçlar için yazdığımız eklentiler, host'a göre gruplanmış. Bağımsızdırlar ve yayınlanabilirler.

| Package                                                                                  | Hangi araca takılır                                                                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: bir `@demo <provider>:<ref>` blok etiketini gömülebilir bir demo kafesi haline getirir. |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: upstream workspace paketlerini (ve bağımlılarını) kaynak değiştiğinde yeniden derler.      |
