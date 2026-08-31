[pantoken](../../../index.md) / components

# components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/components` — InstUI-ի նման CSS բաղադրիչ գրադարան, կառուցված `--instui-*` թոքենից:

Հերթեկցված ոճերի թերթերը:

- **Հիմք** ([baseCss](functions/baseCss.md)) — ընտրովի գլոբալ փաստաթղթի լռակյալներ թոքենից (box-sizing, body վերականգնում, էջի մակերես, հիմնական տեքստի գույն/տառատեսակ, `color-scheme`): Այն նաև կրում է ֆոկուսի-ուրվագծի օղակը, այնպես որ յուրաքանչյուր ուղղած ստանում է հասանելի `:focus-visible` ուրվագծ տուփից դուրս: Բեռնել այն, երբ pantoken-ը սեփական է էջի:
- **Թուղթ** ([proseCss](functions/proseCss.md)) — կերտված markdown/թուղթ HTML ոճեր (աղյուսակներ, վերնագրեր, հղումներ, ցանկեր, կոդ) սահմանված բովանդակության արմատին, այնպես որ փաստաթղթերի էջ կամ բովանդակության շրջան նման է InstUI-ի առանց DOM-ը բաղադրիչների հետ փոխանակելու: Սա այն է, որ կայքի մշակիչները հերթեկցում են որպես իրենց `components.css`:
- **Բաղադրիչներ** ([buttonCss](variables/buttonCss.md), [alertCss](variables/alertCss.md), [badgeCss](variables/badgeCss.md), ագրեգատված [componentsCss](functions/componentsCss.md)) — դասի վրա հիմնված բաղադրիչի ոճեր, որոնք դուք կիրառում եք ձեր սեփական մարկապ (`<button class="instui-button">`), InstUI տեսքի համար բաղադրիչի շրջանակից դուրս: `--instui-elevation-*` ստվերի սանդղակ ([elevationCss](functions/elevationCss.md)) առաջատար է այս թերթից, քանի որ բավական բաղադրիչներ լողում են, որ ստվերներն ներբեռնված դիզայն հատկանիշ են, այլ ոչ հավելյալ:
- **Հեռավորություններ** ([viewCss](variables/viewCss.md), [spacingUtilitiesCss](variables/spacingUtilitiesCss.md), [gapCss](variables/gapCss.md), [layoutUtilitiesCss](variables/layoutUtilitiesCss.md), գումարած թեւ ընտրված իմաստային գույն/թոքեն հավաքածու) — ընտրովի շերտ խաչվածքային դասերի: Ընդհանուր թոքեն→դաս արձակներ (`colorUtilitiesCss`, `tokenUtilitiesCss`) բնակվում են `@pantoken/utils`; այս փաթեթը մատակարարում է նրանց թեւ ընտրված _իմաստային_ անունները, մինչդեռ `@pantoken/plugin-primitives` մատակարարում է հում գունապնակ:
- **Տառատեսակներ** (ընտրովի `fonts.css`) — `@font-face` կանոններ Instructure ապրանդային տառատեսակների համար: Հիմք _կիրառում է_ տառատեսակ; `fonts.css` _բեռնում է_ woff2s-ներ, այնպես որ տեքստը թույլատրելիորեն շեղվում է առանց այն:

Ամեն ինչ զուտ CSS է, որ ստացվել է թոքեն IR-ից, այնպես որ այն հետևում է InstUI-ի թոքենների միջով առանց InstUI React փաթեթների վրա կախվածության: Իրական, ինտերակտիվ բաղադրիչների համար օգտագործեք `@pantoken/react-markdown` (բովանդակություն) կամ `@instructure/ui-*` (ծրագրեր):

Այս մոդուլը խյուսել է՝ յուրաքանչյուր փաստաթղթավորված ռեկորդ բնակվում է իր սեփական ֆայլում `components/`/`utilities/`/`rules/`/`declarations/`-ի ներքո, հեղինակավորված `lib/` compose API-ի հետ: Գրանցամատյանները (`COMPONENTS`/`UTILITIES`/`RULES`/`DECLARATIONS`) շարժում են ագրեգացում + պարիտետի թեստ:

## Interfaces

- [ComponentOptions](interfaces/ComponentOptions.md)
- [ProseOptions](interfaces/ProseOptions.md)
- [IconGlyphsOptions](interfaces/IconGlyphsOptions.md)

## Variables

- [alertCss](variables/alertCss.md)
- [avatarCss](variables/avatarCss.md)
- [badgeCss](variables/badgeCss.md)
- [billboardCss](variables/billboardCss.md)
- [breadcrumbCss](variables/breadcrumbCss.md)
- [breadcrumbLinkCss](variables/breadcrumbLinkCss.md)
- [buttonCss](variables/buttonCss.md)
- [bylineCss](variables/bylineCss.md)
- [calendarCss](variables/calendarCss.md)
- [calendarDayCss](variables/calendarDayCss.md)
- [checkboxCss](variables/checkboxCss.md)
- [closeButtonCss](variables/closeButtonCss.md)
- [contextViewCss](variables/contextViewCss.md)
- [drawerLayoutCss](variables/drawerLayoutCss.md)
- [drawerLayoutContentCss](variables/drawerLayoutContentCss.md)
- [drawerLayoutTrayCss](variables/drawerLayoutTrayCss.md)
- [fileDropCss](variables/fileDropCss.md)
- [formFieldGroupCss](variables/formFieldGroupCss.md)
- [formFieldMessagesCss](variables/formFieldMessagesCss.md)
- [formFieldCss](variables/formFieldCss.md)
- [headingCss](variables/headingCss.md)
- [imgCss](variables/imgCss.md)
- [inPlaceEditCss](variables/inPlaceEditCss.md)
- [inputGroupCss](variables/inputGroupCss.md)
- [linkCss](variables/linkCss.md)
- [listCss](variables/listCss.md)
- [listItemCss](variables/listItemCss.md)
- [maskCss](variables/maskCss.md)
- [menuCss](variables/menuCss.md)
- [menuGroupCss](variables/menuGroupCss.md)
- [menuItemCss](variables/menuItemCss.md)
- [menuSeparatorCss](variables/menuSeparatorCss.md)
- [metricCss](variables/metricCss.md)
- [modalCss](variables/modalCss.md)
- [modalBodyCss](variables/modalBodyCss.md)
- [modalFooterCss](variables/modalFooterCss.md)
- [modalHeaderCss](variables/modalHeaderCss.md)
- [numberInputCss](variables/numberInputCss.md)
- [paginationCss](variables/paginationCss.md)
- [paginationPageCss](variables/paginationPageCss.md)
- [pillCss](variables/pillCss.md)
- [popoverCss](variables/popoverCss.md)
- [progressCircleCss](variables/progressCircleCss.md)
- [progressCss](variables/progressCss.md)
- [radioInputGroupCss](variables/radioInputGroupCss.md)
- [radioCss](variables/radioCss.md)
- [rangeInputCss](variables/rangeInputCss.md)
- [ratingCss](variables/ratingCss.md)
- [sideNavBarCss](variables/sideNavBarCss.md)
- [sideNavBarItemCss](variables/sideNavBarItemCss.md)
- [simpleSelectCss](variables/simpleSelectCss.md)
- [spinnerCss](variables/spinnerCss.md)
- [tableCss](variables/tableCss.md)
- [tableBodyCss](variables/tableBodyCss.md)
- [tableCellCss](variables/tableCellCss.md)
- [tableColHeaderCss](variables/tableColHeaderCss.md)
- [tableHeadCss](variables/tableHeadCss.md)
- [tableRowHeaderCss](variables/tableRowHeaderCss.md)
- [tableRowCss](variables/tableRowCss.md)
- [tabsCss](variables/tabsCss.md)
- [tabsPanelCss](variables/tabsPanelCss.md)
- [tabsTabCss](variables/tabsTabCss.md)
- [tagCss](variables/tagCss.md)
- [textAreaCss](variables/textAreaCss.md)
- [textInputCss](variables/textInputCss.md)
- [textCss](variables/textCss.md)
- [toggleDetailsCss](variables/toggleDetailsCss.md)
- [toggleGroupCss](variables/toggleGroupCss.md)
- [tooltipCss](variables/tooltipCss.md)
- [trayCss](variables/trayCss.md)
- [treeBrowserCss](variables/treeBrowserCss.md)
- [viewCss](variables/viewCss.md)
- [DEFAULT\_PREFIX](variables/DEFAULT_PREFIX.md)
- [cursorUtilitiesCss](variables/cursorUtilitiesCss.md)
- [gapCss](variables/gapCss.md)
- [iconCss](variables/iconCss.md)
- [layoutUtilitiesCss](variables/layoutUtilitiesCss.md)
- [maskUtilityCss](variables/maskUtilityCss.md)
- [overflowUtilitiesCss](variables/overflowUtilitiesCss.md)
- [positionUtilitiesCss](variables/positionUtilitiesCss.md)
- [responsiveUtilitiesCss](variables/responsiveUtilitiesCss.md)
- [screenReaderContentCss](variables/screenReaderContentCss.md)
- [spacingUtilitiesCss](variables/spacingUtilitiesCss.md)
- [stackingUtilityCss](variables/stackingUtilityCss.md)
- [transitionCss](variables/transitionCss.md)
- [truncateCss](variables/truncateCss.md)
- [visualDebugCss](variables/visualDebugCss.md)
- [ELEVATION\_NAMES](variables/ELEVATION_NAMES.md)
- [FOCUSABLE\_SELECTOR](variables/FOCUSABLE_SELECTOR.md)

## Functions

- [selectCss](functions/selectCss.md)
- [elevationCss](functions/elevationCss.md)
- [focusOutlineCss](functions/focusOutlineCss.md)
- [baseCss](functions/baseCss.md)
- [componentsCss](functions/componentsCss.md)
- [proseCss](functions/proseCss.md)
- [iconGlyphsCss](functions/iconGlyphsCss.md)
- [elevationDeclarations](functions/elevationDeclarations.md)
- [focusOutlineDeclarations](functions/focusOutlineDeclarations.md)
- [focusOutlineRules](functions/focusOutlineRules.md)
