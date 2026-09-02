[pantoken](../../../index.md) / components

# components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/components` — an InstUI-look CSS component library, built from the `--instui-*` tokens.

The shipped stylesheets:

- **Base** ([baseCss](functions/baseCss.md)) — opt-in global document defaults from the tokens (box-sizing, body
  reset, page surface, base text colour/font, `color-scheme`). It also carries the focus-outline
  ring, so every focusable gets an accessible `:focus-visible` outline out of the box. Load it when
  pantoken owns the page.
- **Prose** ([proseCss](functions/proseCss.md)) — styles rendered markdown/prose HTML (tables, headings, links,
  lists, code) scoped to a content root, so a docs page or content region looks like InstUI
  without swapping the DOM for components. This is what the site renderers ship as their
  `components.css`.
- **Components** ([buttonCss](variables/buttonCss.md), [alertCss](variables/alertCss.md), [badgeCss](variables/badgeCss.md), aggregated by
  [componentsCss](functions/componentsCss.md)) — class-based component styles you apply to your own markup
  (`<button class="instui-button">`), for the InstUI look outside a component framework. The
  `--instui-elevation-*` shadow scale ([elevationCss](functions/elevationCss.md)) leads this sheet, since enough
  components float that shadows are an intrinsic design attribute rather than an add-on.
- **Utilities** ([viewCss](variables/viewCss.md), [spacingUtilitiesCss](variables/spacingUtilitiesCss.md), [gapCss](variables/gapCss.md), [layoutUtilitiesCss](variables/layoutUtilitiesCss.md), plus a
  curated semantic-colour/token set) — an opt-in layer of cross-cutting classes. The generic
  token→class emitters (`colorUtilitiesCss`, `tokenUtilitiesCss`) live in `@pantoken/utils`; this
  package feeds them the curated *semantic* names, while `@pantoken/plugin-primitives` feeds the raw
  palette.
- **Fonts** (opt-in `fonts.css`) — the `@font-face` rules for the Instructure brand fonts. Base
  *applies* the font; `fonts.css` *loads* the woff2s, so text degrades gracefully without it.

Everything is pure CSS derived from the token IR, so it tracks InstUI through the tokens with no
dependency on the InstUI React packages. For the real, interactive components, use
`@pantoken/react-markdown` (content) or `@instructure/ui-*` (apps).

This module is a barrel: each documented record lives in its own file under
`components/`/`utilities/`/`rules/`/`declarations/`, authored with the `lib/` compose API. The
registries (`COMPONENTS`/`UTILITIES`/`RULES`/`DECLARATIONS`) drive aggregation + the parity test.

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
