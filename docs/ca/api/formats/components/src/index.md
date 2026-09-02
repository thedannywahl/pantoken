[pantoken](../../../index.md) / components

# components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/components` — una biblioteca de components CSS amb aparença InstUI, construïda a partir dels tokens `--instui-*`.

Els full d'estils expedits:

- **Base** ([baseCss](functions/baseCss.md)) — valors per defecte globals de documents de participació opcional dels tokens (box-sizing, reinici del cos,
  superfície de pàgina, color/font de text base, `color-scheme`). També porta l'anella de contorn de focus, per tant cada element enfocable obté un contorn accessible `:focus-visible` immediat. Carrega-la quan
  pantoken és propietari de la pàgina.
- **Prosa** ([proseCss](functions/proseCss.md)) — estils HTML de markdown/prosa representada (taules, títols, enllaços,
  llistes, codi) abastats a una arrel de contingut, de manera que una pàgina de docs o una regió de contingut es veu com InstUI
  sense canviar el DOM per a components. Això és el que els representants del lloc exporten com a seu
  `components.css`.
- **Components** ([buttonCss](variables/buttonCss.md), [alertCss](variables/alertCss.md), [badgeCss](variables/badgeCss.md), agregats per
  [componentsCss](functions/componentsCss.md)) — estils de components basats en classes que apliques al teu propi marcat
  (`<button class="instui-button">`), per a l'aparença InstUI fora d'un marc de components. L'
  escala d'ombra `--instui-elevation-*` ([elevationCss](functions/elevationCss.md)) encapçala aquest full, ja que prou
  components floten que les ombres són un atribut de disseny intrínsec en lloc d'un complement.
- **Utilitats** ([viewCss](variables/viewCss.md), [spacingUtilitiesCss](variables/spacingUtilitiesCss.md), [gapCss](variables/gapCss.md), [layoutUtilitiesCss](variables/layoutUtilitiesCss.md), més un
  conjunt de color semàntic/token revisat) — una capa de participació opcional de classes transversals. Els emissors genèrics
  de token→classe (`colorUtilitiesCss`, `tokenUtilitiesCss`) viuen a `@pantoken/utils`; aquest
  paquet els proporciona els noms *semàntics* revisats, mentre que `@pantoken/plugin-primitives` alimenta la
  paleta bruta.
- **Fonts** (participació opcional `fonts.css`) — les regles `@font-face` pels tipus de lletra de marca d'Instructure. Base
  *aplica* la font; `fonts.css` *carrega* els woff2s, per tant el text es degrada elegantment sense ella.

Tot és CSS pur derivat de la RI del token, per tant segueix InstUI a través dels tokens sense
dependència dels paquets React d'InstUI. Per als components reals i interactius, utilitza
`@pantoken/react-markdown` (contingut) o `@instructure/ui-*` (aplicacions).

Aquest mòdul és un barril: cada registre documentat viu en el seu propi fitxer sota
`components/`/`utilities/`/`rules/`/`declarations/`, creat amb la `lib/` API de composició. Els
registres (`COMPONENTS`/`UTILITIES`/`RULES`/`DECLARATIONS`) impulsen l'agregació + la prova de paritat.

## Interfícies

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

## Funcions

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
