# Mapa pakietów

pantoken to monorepo małych, jednofunkcyjnych pakietów pogrupowanych w kubełki. Zainstaluj ten, który
pasuje do Twojego zadania, albo zainstaluj zunifikowany pakiet `pantoken` i importuj z jego podścieżek (na przykład
`pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Rdzeń

Wspólny model i transformator, na którym opiera się wszystko inne.

| Package                                                 | Co robi                                                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Typy TypeScript bez zależności: kształt `Token` i kontrakt wtyczki.                                                                   |
| [`@pantoken/core`](/api/packages/core/src/)             | Rozwiązuje upstreamowe tokeny i ikony do kanonicznego IR i renderuje CSS.                                                             |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Rozwiązany IR dostarczony jako statyczne JSON-y, per motyw, plus surowe źródło z Tokens Studio.                                       |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Rozwiązywacz tokenów, regexy referencji, pomocniki do wielkości liter i kolorów, sprawdzanie dryfu oraz emittery token→utility-class. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Buduj i komponuj wtyczki pantoken przy użyciu `definePlugin`.                                                                         |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emituje natywne i platformowe źródła.                                                                  |

## Formaty

Przekształcają tokeny w format plikowy.

| Package                                                | Wyjście                                                                                                                                                                                                          |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS typowany `@property` z `light-dark()` i ikonami w data-URI.                                                                                                                                                  |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Zmienne SCSS, rozwiązane do jednego trybu.                                                                                                                                                                       |
| [`@pantoken/less`](/api/formats/less/src/)             | Zmienne Less.                                                                                                                                                                                                    |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Zmienne Stylus.                                                                                                                                                                                                  |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Dokument W3C Design Tokens (DTCG).                                                                                                                                                                               |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR jako JavaScript i JSON (również wymieniony w sekcji Rdzeń).                                                                                                                                                   |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonomiczny widok nad tokenami ikon.                                                                                                                                                                            |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Czcionka ikon dla sieci (TTF, WOFF2) plus jej CSS.                                                                                                                                                               |
| [`@pantoken/components`](/api/formats/components/src/) | Biblioteka komponentów CSS w stylu InstUI (button, alert, table i więcej) plus reset bazowy z ringiem fokusu, stylami prose, pomocnikami przekrojowymi i fontami brandu. Zobacz [Components](/guide/components). |

## Renderery

Integracje z frameworkami i narzędziami.

| Package                                                                                                                                          | Dla                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Hooki React, `<Icon>` oraz provider tokenów.                     |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Komponent webowy, podłączony do każdego frameworka.              |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Obiekty tokenów przyjazne dla StyleSheet (bez zmiennych CSS).    |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` i stylowane prymitywy, niezależne od frameworka. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Konfiguracja tokenów dla witryn Astro.                           |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Tokeny ikon i palety w Markdown.                                 |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Wtyczka markdown-it dla kodów ikon i próbek kolorów.             |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Typowo-bezpieczny theme dla styled-components i Emotion.         |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Theme dla Material UI.                                           |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Mosty zmiennych CSS dla Bootstrap i shadcn/ui.                   |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Nadpisanie ustawień Sass i nakładka CSS dla Foundation.          |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Motywy dla Docusaurus i VitePress.                               |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Motyw Mintlify `docs.json` (kolory + tło).                       |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Motyw Storybook.                                                 |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Globalny CSS w stylu Instructure dla przewodników Pendo.         |

## Bundlery

Integracje z narzędziami budującymi.

| Package                                             | Dla                                                |
| --------------------------------------------------- | -------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Plugin Vite z wirtualnymi modułami i injekcją CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` dla Next.js `transpilePackages`.    |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Plugin webpack.                                    |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | Dyrektywa `@pantoken;` dla PostCSS.                |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Preset Tailwind.                                   |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Preset Panda CSS.                                  |

## Platformy

Cele natywne i generatorów stron, emitowane przez CLI lub mające własne API.

| Package                                                                                        | Wyjście                                    |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Kod Swift plus stub manifestu SwiftPM.     |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Zasoby Android XML.                        |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose w Kotlinie.                |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter w Dart.                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Stałe Rust do użycia w egui lub iced.      |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Motyw bloków WordPress `theme.json`.       |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Dane dla Vanilla Forums `variables.json`.  |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Zasoby motywu Drupal.                      |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Dane witryny dla Hugo i Jekyll.            |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Wartości przyjazne do użycia w HTML email. |

## Design

Dla narzędzi projektowych.

| Package                                           | Wyjście                                                     |
| ------------------------------------------------- | ----------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Payload Figma Variables.                                    |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Palety kolorów (ASE, GPL, Sketch) oraz widoczna próbka SVG. |

## Wtyczki

Opcjonalne transformacje rozszerzające output tokenów lub CSS. Zobacz [Plugins](/guide/plugins).

| Package                                                                               | Co dodaje                                                           |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Nazwane głębokości z-index jako tokeny `--instui-stacking-*`.       |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` obrys do debugowania layoutu.                  |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Ikony brandów z simple-icons.                                       |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Logotypy produktów Instructure jako SVG, data URI i tokeny obrazów. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Wtyczka PostCSS, która usuwa nieużywane custom properties.          |

## Narzędzia

Infrastruktura budowy, dokumentacji i demo dla samego monorepo. Większość jest wewnętrzna, ale elementy są
samodzielne, dlatego dokumentujemy je tutaj, a niektóre są publikowane osobno w npm.

| Package                                            | Co robi                                                                                                                                                                                                                    |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generuje zunifikowany pakiet baryłkowy `pantoken` i `exports` z jego zależności.                                                                                                                                           |
| `@pantoken/validate-generated`                     | Bramka dryfu: sprawdza czy każdy wygenerowany stylesheet rozwiązuje się względem IR tokenów.                                                                                                                               |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Samohostujący runner live-demo: rozwiązuje spec `@demo` do iframe i renderuje surowe HTML/CSS/JS w tej samej domenie, tematyzowane tokenami.                                                                               |
| `@cssdoc/core` (zewnętrzny)                        | Ogólny ekstraktor dokumentacji CSS (TSDoc dla CSS): parsuje komentarze w doc-comments + AST CSS do modelu, który dokumentacja emituje jako odniesienie CSS API. Żyje w osobnym repo; konsumowany jako zależność linkowana. |

`@pantoken/validate-generated` to skrypt jednorazowy (wywoływany przez `pnpm run ready`), więc nie ma strony API;
pozostałe mają dokumentację.

## AI

Zasoby konfiguracji AI dla konsumujących repozytoria. Są one przeznaczone dla projektów używających pantoken, nie do rozwijania
samego pantoken.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) instaluje `AGENTS.md`, `llms.txt` oraz
  reguły dla asystentów/edytorów (Cursor, Copilot, Windsurf, Claude Code) w repozytorium konsumującym.

## Wtyczki deweloperskie

Wtyczki, które tworzymy dla narzędzi, z którymi pracujemy, pogrupowane według hosta. Są samodzielne i publikowalne.

| Package                                                                                  | Podłącza się do                                                                          |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: zamienia tag bloku `@demo <provider>:<ref>` w osadzalny fence demo.             |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: przebudowuje upstreamowe pakiety workspace (i zależne) gdy ich źródło się zmienia. |
