# Pakettikartta

pantoken on monorepo, joka sisältää pieniä, yksittäistehtäviin tarkoitettuja paketteja ryhmiteltyinä lokeroihin. Asenna se, joka sopii tehtävääsi, tai asenna yhtenäinen `pantoken`-paketti ja tuo sen alipoluista (esimerkiksi `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Ydin

Jaettu malli ja muunnin, jonka päälle kaikki muu rakentuu.

| Paketti                                                 | Mitä se tekee                                                                                                     |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Nollariippuvuuksiset TypeScript-tyypit: `Token`-muoto ja plugin-sopimus.                                          |
| [`@pantoken/core`](/api/packages/core/src/)             | Ratkaisee upstream-tokenit ja -ikonit kanoniseen IR:ään ja renderöi CSS:n.                                        |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Ratkaistu IR vendoroituna staattisena JSON:na, teemakohtaisesti, sekä Tokens Studio -lähde raakamuodossa.         |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token-resolveri, viitteen regexit, case- ja väriapufunktiot, drift-tarkistukset ja token→utility-class -emitters. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Rakenna ja yhdistä pantoken-pluginia käyttäen `definePlugin`.                                                     |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — emittoi natiiveja ja alustakohtaisia lähteitä.                                     |

## Muodot

Muuta tokenit tiedostomuodoksi.

| Paketti                                                | Tuotos                                                                                                                                                                                                                |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-tyyppinen CSS, jossa `light-dark()` ja data-URI-ikonit.                                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS-muuttujat, ratkaistu yhdeksi tilaksi.                                                                                                                                                                            |
| [`@pantoken/less`](/api/formats/less/src/)             | Less-muuttujat.                                                                                                                                                                                                       |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus-muuttujat.                                                                                                                                                                                                     |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | W3C Design Tokens (DTCG) -dokumentti.                                                                                                                                                                                 |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR JavaScript- ja JSON-muodossa (myös lueteltu Ydinosassa).                                                                                                                                                           |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Ergonominen näkymä ikonitokeneille.                                                                                                                                                                                   |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Ikoniverkkofontti (TTF, WOFF2) ja sen CSS.                                                                                                                                                                            |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI-tyylinen CSS-komponenttikirjasto (painike, hälytys, taulukko ja muuta) sekä perusreset ja fokuskehä, prose-tyylittely, poikkileikkaukselliset utilitit ja brändifontit. Katso [Components](/guide/components). |

## Renderöijät

Kehykset ja työkaluintegroinnit.

| Paketti                                                                                                                                          | Käyttötarkoitus                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React-hookit, `<Icon>` ja token-provider.                     |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Web-komponentti, kytketty kuhunkin kehykseen.                 |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-ystävälliset token-objektit (ei CSS-muuttujia).    |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` ja styled-primitiiivit, kehyksettömiä.        |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token-asetukset Astro-sivustoille.                            |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ikonitokenit ja värinäytteet Markdownissa.                    |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | markdown-it -plugin ikonikoodeille ja värinäytteille.         |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Tyyppiturvallinen teema styled-componentsille ja Emotionille. |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI -teema.                                           |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-muuttujasiltoja Bootstrapille ja shadcn/ui:lle.           |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass-asetusten ylikirjoitus ja CSS-peitto Foundationille.     |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Teemat Docusaurusille ja VitePressille.                       |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify-`docs.json` -teema (värit + tausta).                 |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook-teema.                                              |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure-tyylinen globaalinen CSS Pendo-opastuksiin.       |

## Kokoajat

Build-työkalujen integraatiot.

| Paketti                                             | Käyttötarkoitus                                       |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite-plugin, jossa virtuaalimoduulit ja CSS-injektio. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` Next.js:lle `transpilePackages`.       |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Webpack-plugin.                                       |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` -at-rule.                                |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind-preset.                                      |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS -preset.                                    |

## Alustat

Natiivit ja sivugeneraattorit, CLI:n tai oman API:n emittoimia.

| Paketti                                                                                        | Tuotos                                          |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift-lähdekoodi ja SwiftPM-manifestin stub.    |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML -resurssit.                         |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                         |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                   |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust-consteja esim. egui:lle tai iced:lle.      |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress block-teema `theme.json`.             |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.                |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal-teema-assetit.                           |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo- ja Jekyll-sivustodata.                    |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-ystävällisiä arvoja HTML-sähköposteille. |

## Suunnittelu

Suunnittelutyökaluille.

| Paketti                                           | Tuotos                                                       |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables -payload.                                    |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Väriäytteitä (ASE, GPL, Sketch) sekä nähtävä SVG-näytearkki. |

## Lisäosat

Valinnaiset transformaatiot, jotka laajentavat token- tai CSS-tuotosta. Katso [Plugins](/guide/plugins).

| Paketti                                                                               | Mitä se lisää                                                        |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Nimetyt z-index-syvyyksiä `--instui-stacking-*`-tokeneina.           |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug`-layoutin debug-rajauksen.                       |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Brändi-ikonit simple-icons:sta.                                      |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure-tuotteiden logot SVG:inä, data-URI:ina ja kuvatokeneina. |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | PostCSS-plugin, joka pudottaa käyttämättömät custom-propsit.         |

## Työkalut

Monorepon build-, docs- ja demo-infrastruktuuri. Suurin osa on sisäistä, mutta osia dokumentoidaan täällä ja jotkut julkaistaan npm:ssä itsenäisinä paketteina.

| Paketti                                            | Mitä se tekee                                                                                                                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Generoi yhtenäisen `pantoken`-paketin barrelin ja `exports` riippuvuuksistaan.                                                                                                                                |
| `@pantoken/validate-generated`                     | Drift-portti: tarkistaa, että jokainen generoitu stylesheet ratkaistaan token-IR:ään vastaan.                                                                                                                 |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Itseisännöity live-demo-runner: ratkaisee `@demo`-spesifikaation iframeksi ja renderöi paljaan HTML/CSS/JS:n same-origin, token-teemoitettuna.                                                                |
| `@cssdoc/core` (ulkoinen)                          | Geneerinen CSS-dokumentaation purkaja (TSDoc, CSS:lle): jäsentää doc-kommentit + CSS AST:n malliksi, jonka dokumentaatio emittoi CSS API -referenssinä. Elää omassa repossaan; kulutetaan link-riippuvuutena. |

`@pantoken/validate-generated` on kertakäynnistys-skripti (kutsuu `pnpm run ready`), joten sillä ei ole API-sivua; muilla on.

## AI

Käyttäjäkohteiset AI-asetukset. Nämä ovat projekteille, jotka käyttävät pantokenia, eivät pantokenin kehittämiseen.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) asentaa `AGENTS.md`, `llms.txt` ja assistentti/editor-säännöt (Cursor, Copilot, Windsurf, Claude Code) kuluttajarekpoon.

## Kehittäjälisäosat

Työkaluille kirjoittamamme plugin:t, ryhmiteltynä hostin mukaan. Ne ovat itsenäisiä ja julkaistavissa.

| Paketti                                                                                  | Kytkeytyy                                                                                   |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: muuttaa `@demo <provider>:<ref>`-block-tagin upotettavaksi demo-fenciksi.          |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: uudelleen rakentaa upstream-työtilan paketit (ja riippuvat) kun niiden lähde muuttuu. |
