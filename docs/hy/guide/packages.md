# Փաթեջ մապը

pantoken-ը մի մոնոռեպո է՝ փոքր, մեկ նպատակի փաթեթների հավաքածու՝ խմբավորված բաքետներում։ Տեղադրեք այն, որը համապատասխանում է ձեր առաջադրանքի, կամ տեղադրեք միասնական `pantoken` փաթեթը և ներմուծեք նրա ենթաապրանքներից (օրինակ `pantoken/css`, `pantoken/react`, `pantoken/tailwind`)։

## Գլուխ

Ընդհանրացված մոդելը և նույն բանի վրա կառուցվող թրանսֆորմերը։

| Package                                                 | What it does                                                                                                      |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/model`](/api/packages/model/src/)           | Ապաքինք-խնդիրից ազատ TypeScript տիպեր՝ `Token` շապիկը և plugin պայմանավորվածությունը։                             |
| [`@pantoken/core`](/api/packages/core/src/)             | Վերահսկում է վերավերցված tokens-ները և icons-ները canonical IR-ով և էմիտ անում CSS։                               |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | Վերահսկված IR-ը՝ որպես ստատիկ JSON, թեմայով մեկերված, նաև Tokens Studio-ի հում աղբյուր։                           |
| [`@pantoken/utils`](/api/packages/utils/src/)           | Token լուծիչը, reference regex-երը, case և color հելփերները, drift ստուգումները և token→utility-class էմիտերները։ |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Ստեղծեք և կոմպոզացրեք pantoken plugin-եր `definePlugin`-ով։                                                       |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — էմիտում է բնիկ և հարթակային աղբյուրներ։                                            |

## Ֆորմատներ

Պատրաստում են token-ները ֆայլային ֆորմատների։

| Package                                                | Output                                                                                                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | `@property`-տիպավորված CSS `light-dark()`-ով և data-URI նշաններով։                                                                                                                                      |
| [`@pantoken/scss`](/api/formats/scss/src/)             | SCSS փոփոխականներ, լուծված մեկ ռեժիմով։                                                                                                                                                                 |
| [`@pantoken/less`](/api/formats/less/src/)             | Less փոփոխականներ։                                                                                                                                                                                      |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Stylus փոփոխականներ։                                                                                                                                                                                    |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | W3C Design Tokens (DTCG) փաստաթուղթ։                                                                                                                                                                    |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | IR-ը որպես JavaScript և JSON (տես՝ նաև Գլխի տակ)։                                                                                                                                                       |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Էրգոնոմիկ տեսք icon token-ների նկատմամբ։                                                                                                                                                                |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Icon web font (TTF, WOFF2) և նրա CSS-ը։                                                                                                                                                                 |
| [`@pantoken/components`](/api/formats/components/src/) | InstUI տեսք ունեցող CSS կոմպոնենտների գրադարան (կոճակ, alert, table և այլք), բազային reset-ով՝ focus ring, prose styling, cross-cutting utilities և brand ֆոնտերը։ Տես [Components](/guide/components). |

## Renderer-ներ

Ֆրեյմվորք և գործիքի ինտեգրացիաներ։

| Package                                                                                                                                          | For                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | React hooks, `<Icon>` և token provider։                         |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | Web component-ը, կապված յուրաքանչյուր ֆրեյմվորքի հետ։           |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | StyleSheet-ընթեռնելի token օբյեկտներ (առանց CSS փոփոխականների). |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` և styled primitives, framework-անկախ։           |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Token կարգավորում Astro կայքերի համար։                          |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Icon token-ներ և swatch-ներ Markdown-ում։                       |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | markdown-it plugin՝ icon code-երի և color swatch-ների համար։    |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Տիպ-անվտանգ թեմա styled-components և Emotion-ի համար։           |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Material UI թեմա։                                               |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | CSS-փոփոխականների կամուրջներ Bootstrap և shadcn/ui։             |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sass settings override և CSS ավերակ Foundation-ի համար։         |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Թեմաներ Docusaurus և VitePress-ի համար։                         |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Mintlify `docs.json` թեմա (գույներ + ֆոն)։                      |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Storybook թեմա։                                                 |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | Instructure- ոճավորված գլոբալ CSS Pendo ուղեցույցների համար։    |

## Bundler-ներ

Շինարար-գործիքների ինտեգրացիաներ։

| Package                                             | For                                                   |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Vite plugin՝ վիրտուալ մոդուլներով և CSS injection-ով։ |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` Next.js-ի համար `transpilePackages`.   |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Webpack plugin։                                       |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | `@pantoken;` at-rule-ը։                               |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Tailwind preset։                                      |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Panda CSS preset։                                     |

## Մեքենաներ / Պլատֆորմներ

Բնական և site-generator թիրախներ՝ եմթված CLI-ից կամ ինքնուրույն API-ներից։

| Package                                                                                        | Output                                          |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Swift աղբյուր և SwiftPM manifest stub։          |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Android XML ռեսուրսներ։                         |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin։                         |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart։                                   |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Rust const-ներ՝ egui կամ iced օրինակների համար։ |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | WordPress block-theme `theme.json`.             |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Vanilla Forums `variables.json`.                |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Drupal թեմայի անշարժներ։                        |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Hugo և Jekyll site տվյալներ։                    |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Inline-համատեղելի արժեքներ HTML էլփոստի համար։  |

## Դիզայն

Դիզայնային գործիքների համար։

| Package                                           | Output                                                                |
| ------------------------------------------------- | --------------------------------------------------------------------- |
| [`@pantoken/figma`](/api/design/figma/src/)       | Figma Variables payload։                                              |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Գույնի swatch-ներ (ASE, GPL, Sketch) հանելով դիտվող SVG նմուշաթերթով։ |

## Պլագիններ

Ընտրովի թրանսֆորմներ, որոնք ընդլայնում են token կամ CSS ելքը։ Տես [Plugins](/guide/plugins)։

| Package                                                                               | What it adds                                                                |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Կոչված z-index խորություններ որպես `--instui-stacking-*` token-ներ։         |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | `-with-visual-debug` layout-debugging outline-ը։                            |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Բրենդային նշաններ simple-icons-ից։                                          |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Instructure պատկանող լոգոներ որպես SVG-ներ, data URI-ներ և image token-ներ։ |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | PostCSS plugin, որը հեռացնում է չօգտագործվող custom properties։             |

## Գործիքներ

Մոնոռեպոյի շինարարական, փաստաթղթավորման և դեմո ենթակառուցվածքը։ Շատերը ներքին են, բայց մի մասը ինքնուրույն է և գր documentación ենք տալիս այստեղ։

| Package                                            | What it does                                                                                                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Ստեղծում է միասնական `pantoken` փաթեթի barrel-ը և `exports` իր կախվածություններից։                                                                                                                                                         |
| `@pantoken/validate-generated`                     | Drift gate—ստուգում է, որ յուրաքանչյուր գեներացված stylesheet-ը լուծվում է token IR-ի դեմ։                                                                                                                                                 |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Self-hosted live-demo runner՝ լուծում է `@demo` spec-ին iframe-ում և էմիտում է հին HTML/CSS/JS same-origin, token-թեմատիկ։                                                                                                                 |
| `@cssdoc/core` (external)                          | Ընդհանուր CSS փաստաթղթավորման արտահանող (TSDoc՝ CSS-ի համար): վերլուծում է doc-comments + CSS AST և վերադարձնում մի մոդել, որը docs-ը էմիտ անում որպես CSS API reference։ Գտնվում է առանձին ռեպոում; օգտագործվում է որպես link dependency։ |

`@pantoken/validate-generated` միանգամյա script է (կոչվում է `pnpm run ready`-ով), դրա համար API էջ չունի; մյուսները ունեն։

## AI

Ծտրիրողական AI կազմաձևի ակտիվներ՝ սպառողին ուղղված։ Ավելին՝ այսները նախատեսված են այն նախագծերի համար, որոնք օգտագործում են pantoken-ն, ոչ թե pantoken-ի զարգացման համար։

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) տեղադրում է `AGENTS.md`, `llms.txt` և assistant/editor կանոններ (Cursor, Copilot, Windsurf, Claude Code) սպառող ռեպոզիտորի մեջ։

## Dev plugin-ներ

Պլագիններ, որոնք հեղինակվում են այնտեղ օգտագործվող գործիքների համար, խմբավորված հոստով։ Դրանք ինքնուրույն և հրապարակելի են։

| Package                                                                                  | Plugs into                                                                                      |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc՝ `@demo <provider>:<ref>` block tag-ը վերածում է ներդրված դեմո fence-ի։                 |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite՝ վերակառուցում է upstream workspace փաթեթները (և կախվածները) երբ դրանց աղբյուրը փոխվում է։ |
