# Léarscáil an phacáiste

Is monorepo é pantoken de phacáistí beaga aon-úsáide atá grúpáilte i mbucáidí. Suiteáil an ceann a oireann do do thasc, nó suiteáil an pacáiste comhtháite `pantoken` agus iompórtáil óna fho-phasáistí (mar shampla `pantoken/css`, `pantoken/react`, `pantoken/tailwind`).

## Lár

An tsamhail roinnte agus an t-aistriúchán ar a bhforbraíonn gach rud eile.

| Pacáiste                                                | Cad a dhéanann sé                                                                                                                    |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [`@pantoken/model`](/api/packages/model/src/)           | Cineálacha TypeScript gan spleáchas: foirm `Token` agus conradh an chlóisín (plugin).                                                |
| [`@pantoken/core`](/api/packages/core/src/)             | Réitíonn na ticéid agus na siombailí upstream isteach sa IR caighdeánach, agus déanann sé CSS a ghiniúint.                           |
| [`@pantoken/tokens`](/api/formats/tokens/src/)          | An IR réitithe a sholáthraítear mar JSON statach, in aghaidh téama, chomh maith leis an bhfoinse Tokens Studio bhunúsach.            |
| [`@pantoken/utils`](/api/packages/utils/src/)           | An réititheoir token, nathanna rialacha tagartha, cúnamh do chás agus dath, seiceálacha drifte, agus an chruthú token→rannóg-úsaide. |
| [`@pantoken/plugin-kit`](/api/packages/plugin-kit/src/) | Tóg agus comhlánaigh breiseáin pantoken le `definePlugin`.                                                                           |
| [`@pantoken/cli`](/api/packages/cli/src/)               | `pantoken generate <target>` — astaítear foinse dúchais agus ardán.                                                                  |

## Formáidí

Casann na ticéid isteach i bhformáid comhaid.

| Pacáiste                                               | Aschur                                                                                                                                                                                                                                         |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/css`](/api/formats/css/src/)               | CSS dathaithe de réir `@property` le `light-dark()` agus siombailí data-URI.                                                                                                                                                                   |
| [`@pantoken/scss`](/api/formats/scss/src/)             | Athróg SCSS, réitithe go mód aonair.                                                                                                                                                                                                           |
| [`@pantoken/less`](/api/formats/less/src/)             | Athróg Less.                                                                                                                                                                                                                                   |
| [`@pantoken/stylus`](/api/formats/stylus/src/)         | Athróg Stylus.                                                                                                                                                                                                                                 |
| [`@pantoken/dtcg`](/api/formats/dtcg/src/)             | Doiciméad W3C Design Tokens (DTCG).                                                                                                                                                                                                            |
| [`@pantoken/tokens`](/api/formats/tokens/src/)         | An IR mar JavaScript agus JSON (liostaithe freisin faoi Lár).                                                                                                                                                                                  |
| [`@pantoken/icons`](/api/formats/icons/src/)           | Amharc éifeachtach thar na ticéid íocón.                                                                                                                                                                                                       |
| [`@pantoken/icon-font`](/api/formats/icon-font/src/)   | Cló gréasáin íocón (TTF, WOFF2) lena CSS.                                                                                                                                                                                                      |
| [`@pantoken/components`](/api/formats/components/src/) | Leabharlann chomhpháirteanna CSS le cuma InstUI (cnaipe, rabhaidh, tábla, agus níos mó) chomh maith le socrú bun-reset le fáinne fócas, stíliú próise, uirlisí tras-gannta, agus na clónna branda. Féach [Comhpháirteanna](/guide/components). |

## Rianálaithe (Renderers)

Comhtháthú le haistrithe agus uirlisí.

| Pacáiste                                                                                                                                         | Chuige                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [`@pantoken/react`](/api/renderers/react/src/)                                                                                                   | Greamáin React (hooks), `<Icon>`, agus soláthraí ticéid.                 |
| [`@pantoken/vue`](/api/renderers/vue/src/), [`@pantoken/svelte`](/api/renderers/svelte/src/), [`@pantoken/angular`](/api/renderers/angular/src/) | An chomhpháirt ghréasáin, ceangailte le gach fráma oibre.                |
| [`@pantoken/react-native`](/api/renderers/react-native/src/)                                                                                     | Ojetoí ticéid réidh do StyleSheet (gan athróga CSS).                     |
| [`@pantoken/web-components`](/api/renderers/web-components/src/)                                                                                 | `<instui-icon>` agus praimréidí stíleáilte, neamhspleách ar fráma oibre. |
| [`@pantoken/astro`](/api/renderers/astro/src/)                                                                                                   | Socrú ticéad do shuímh Astro.                                            |
| [`@pantoken/react-markdown`](/api/renderers/react-markdown/src/), [`@pantoken/rehype`](/api/renderers/rehype/src/)                               | Ticéid íocón agus swatches i Markdown.                                   |
| [`@pantoken/markdown-it`](/api/renderers/markdown-it/src/)                                                                                       | Breiseán markdown-it do chód íocón agus scáileáin datha.                 |
| [`@pantoken/css-in-js`](/api/renderers/css-in-js/src/)                                                                                           | Téama sábháilte cineál do styled-components agus Emotion.                |
| [`@pantoken/mui`](/api/renderers/mui/src/)                                                                                                       | Téama Material UI.                                                       |
| [`@pantoken/bootstrap`](/api/renderers/bootstrap/src/), [`@pantoken/shadcn`](/api/renderers/shadcn/src/)                                         | Droichid athróga CSS do Bootstrap agus shadcn/ui.                        |
| [`@pantoken/foundation`](/api/renderers/foundation/src/)                                                                                         | Sainroghnóireacht Sass agus cúntóir CSS do Foundation.                   |
| [`@pantoken/docusaurus`](/api/renderers/docusaurus/src/), [`@pantoken/vitepress`](/api/renderers/vitepress/src/)                                 | Téamaí do Docusaurus agus VitePress.                                     |
| [`@pantoken/mintlify`](/api/renderers/mintlify/src/)                                                                                             | Téama Mintlify `docs.json` (dathanna + cúlra).                           |
| [`@pantoken/storybook`](/api/renderers/storybook/src/)                                                                                           | Téama Storybook.                                                         |
| [`@pantoken/pendo`](/api/renderers/pendo/src/)                                                                                                   | CSS domhanda i stíl Instructure do threoracha Pendo.                     |

## Pacáistí tógála (Bundlers)

Comhtháthú uirlis tógála.

| Pacáiste                                            | Chuige                                                |
| --------------------------------------------------- | ----------------------------------------------------- |
| [`@pantoken/vite`](/api/bundlers/vite/src/)         | Breiseán Vite le modúil fíorúil agus instealladh CSS. |
| [`@pantoken/next`](/api/bundlers/next/src/)         | `withPantoken` do Next.js `transpilePackages`.        |
| [`@pantoken/webpack`](/api/bundlers/webpack/src/)   | Breiseán webpack.                                     |
| [`@pantoken/postcss`](/api/bundlers/postcss/src/)   | An r-leagan `@pantoken;`.                             |
| [`@pantoken/tailwind`](/api/bundlers/tailwind/src/) | Réamhshocrú Tailwind.                                 |
| [`@pantoken/panda`](/api/bundlers/panda/src/)       | Réamhshocrú Panda CSS.                                |

## Ardáin

Spriocanna dúchais agus gineadóirí suíomh, a astaítear ag an CLI nó a bhfuil a n-API féin acu.

| Pacáiste                                                                                       | Aschur                                                   |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [`@pantoken/swift`](/api/platforms/swift/src/)                                                 | Foinse Swift agus stob manifest SwiftPM.                 |
| [`@pantoken/android`](/api/platforms/android/src/)                                             | Acmhainní XML Android.                                   |
| [`@pantoken/compose`](/api/platforms/compose/src/)                                             | Jetpack Compose Kotlin.                                  |
| [`@pantoken/flutter`](/api/platforms/flutter/src/)                                             | Flutter Dart.                                            |
| [`@pantoken/rust`](/api/platforms/rust/src/)                                                   | Consts Rust do egui nó iced.                             |
| [`@pantoken/wordpress`](/api/platforms/wordpress/src/)                                         | Bloc-théama WordPress `theme.json`.                      |
| [`@pantoken/vanilla`](/api/platforms/vanilla/src/)                                             | Sonraí do Vanilla Forums `variables.json`.               |
| [`@pantoken/drupal`](/api/platforms/drupal/src/)                                               | Acmhainní téama Drupal.                                  |
| [`@pantoken/hugo`](/api/platforms/hugo/src/), [`@pantoken/jekyll`](/api/platforms/jekyll/src/) | Sonraí suíomh do Hugo agus Jekyll.                       |
| [`@pantoken/email`](/api/platforms/email/src/)                                                 | Luachanna inléite go hin-líne d’uimhir ríomhphoist HTML. |

## Dearadh

Do uirlisí dearaidh.

| Pacáiste                                          | Aschur                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@pantoken/figma`](/api/design/figma/src/)       | Pacáiste Figma Variables.                                                      |
| [`@pantoken/swatches`](/api/design/swatches/src/) | Swatches dathanna (ASE, GPL, Sketch) chomh maith le bileog sampla SVG inléite. |

## Breiseáin

Aistrithe roghnach a leathnaíonn aschur na ticéid nó an CSS. Féach [Breiseáin](/guide/plugins).

| Pacáiste                                                                              | Cad a chuireann sé leis                                                             |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`@pantoken/plugin-stacking`](/api/plugins/pantoken/stacking/src/)                    | Doimhneachtaí z-index ainmniúla mar thicéid `--instui-stacking-*`.                  |
| [`@pantoken/plugin-visual-debug`](/api/plugins/pantoken/visual-debug/src/)            | An struchtúr `-with-visual-debug` chun leagan amach a dhíghlaoú (layout-debugging). |
| [`@pantoken/plugin-simple-icons`](/api/plugins/pantoken/simple-icons/src/)            | Íocóin branda ó simple-icons.                                                       |
| [`@pantoken/plugin-logos`](/api/plugins/pantoken/logos/src/)                          | Lógónna táirgí Instructure mar SVGanna, data URIs, agus ticéid íomhá.               |
| [`@pantoken/plugin-prune-custom-props`](/api/plugins/postcss/prune-custom-props/src/) | Breiseán PostCSS a thiteann airíonna sainmhínithe neamhúsáidte.                     |

## Uirlisí

Tógáil, doiciméid, agus bonneagar samplach don monorepo féin. Tá an chuid is mó inmheánach, ach tá na codanna féin-choimeádta, mar sin déanaimid cur síos orthu anseo agus seolfar cuid acu chuig npm ar a gcéin.

| Pacáiste                                           | Cad a dhéanann sé                                                                                                                                                                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@pantoken/aggregate`](/api/tools/aggregate/src/) | Gineann an t-armáil pacáiste comhtháite `pantoken` agus `exports` óna spleáchais.                                                                                                                                                                               |
| `@pantoken/validate-generated`                     | An geata drifte: sheiceálann sé gach stíleáil ginte go réitíonn sí i gcoinne IR na dticéad.                                                                                                                                                                     |
| [`@pantoken/demo`](/api/tools/demo/src/)           | Rithéir léiriúcháin bheo féin-óstaithe: réitíonn sonra specs `@demo` go iframe agus déanann sé HTML/CSS/JS bhunúsach a rindreáil ar an gcineáil chéanna, téamaite le ticéid.                                                                                    |
| `@cssdoc/core` (ardáin seachtrach)                 | Eisitheoir doiciméadúcháin CSS ginearálta (TSDoc, do CSS): dhéanann sé tráchtanna doiciméadaithe agus an AST CSS a pharsáil isteach i samhail a astaítear mar Thagairt API CSS don doiciméad. Tá cónaí ina fhothréimhse féin; tomhas é trí spleáchas nascáilte. |

Is script rith-amach é `@pantoken/validate-generated` (glaoite ag `pnpm run ready`), mar sin níl leathanach API aige; tá na cinn eile ann.

## AI

Sochraidí socrú AI atá dírithe ar an gcustaiméir. Tá siad seo do thionscadail a úsáideann pantoken, ní do fhorbairt pantoken féin.

- [`@pantoken/ai`](/api/ai/pantoken-ai/src/) suiteálann `AGENTS.md`, `llms.txt`, agus rialacha cúntóra/eagarthóra (Cursor, Copilot, Windsurf, Claude Code) i stórpáipéar tomhaltóra.

## Breiseáin forbartha (Dev plugins)

Breiseáin a scríobhaimid do na huirlisí a thógann muid, grúpáilte de réir óstach. Tá siad neamhspleách agus foilsithe.

| Pacáiste                                                                                 | Cuireadh isteach i                                                                                 |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@pantoken/typedoc-plugin-demo`](/api/plugins/typedoc/demo/src/)                        | TypeDoc: casann sé stíle tag-block `@demo <provider>:<ref>` ina phaisín dDemo atá ionchlannaithe.  |
| [`@pantoken/vite-workspace-orchestrator`](/api/plugins/vite/workspace-orchestrator/src/) | Vite: atógann sé pacáistí upstream an oibre-spás (agus a spleáchais) nuair a athraíonn a bhfoinse. |
