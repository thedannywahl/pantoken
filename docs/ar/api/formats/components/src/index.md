[pantoken](../../../index.md) / components

# components

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/components` — مكتبة مكونات CSS بمظهر InstUI، مبنية من رموز `--instui-*`.

أوراق الأنماط المرسلة:

- **الأساس** ([baseCss](functions/baseCss.md)) — إعدادات افتراضية اختيارية للمستند العام من الرموز (box-sizing، إعادة تعيين body، سطح الصفحة، لون النص الأساسي/الخط، `color-scheme`). كما أنها تحمل حلقة المخطط التفصيلي للتركيز، لذا يحصل كل عنصر قابل للتركيز على مخطط تفصيلي `:focus-visible` يمكن الوصول إليه مباشرة. قم بتحميله عندما يمتلك pantoken الصفحة.
- **النثر** ([proseCss](functions/proseCss.md)) — أنماط HTML markdown/نثر معروضة (جداول، عناوين، روابط، قوائم، كود) محدودة بجذر المحتوى، بحيث تبدو صفحة المستندات أو منطقة المحتوى مثل InstUI بدون استبدال DOM بمكونات. هذا ما يشحنه منتجو المواقع باسم `components.css`.
- **المكونات** ([buttonCss](variables/buttonCss.md), [alertCss](variables/alertCss.md), [badgeCss](variables/badgeCss.md)، يتم تجميعها بواسطة [componentsCss](functions/componentsCss.md)) — أنماط مكونات قائمة على الفئة تطبقها على الترميز الخاص بك (`<button class="instui-button">`)، للحصول على مظهر InstUI خارج إطار عمل المكونات. مقياس الظل `--instui-elevation-*` ([elevationCss](functions/elevationCss.md)) يقود هذه الورقة، حيث يطفو عدد كافٍ من المكونات بحيث تكون الظلال سمة تصميم جوهرية بدلاً من إضافة إضافية.
- **الأدوات** ([viewCss](variables/viewCss.md), [spacingUtilitiesCss](variables/spacingUtilitiesCss.md), [gapCss](variables/gapCss.md), [layoutUtilitiesCss](variables/layoutUtilitiesCss.md)، بالإضافة إلى مجموعة ألوان دلالية/رموز منتقاة) — طبقة اختيارية من الفئات المتقاطعة. يعيش معدلات token→class العام (`colorUtilitiesCss`, `tokenUtilitiesCss`) في `@pantoken/utils`؛ تغذي هذه الحزمة الأسماء _الدلالية_ المنتقاة، بينما تغذي `@pantoken/plugin-primitives` لوحة الألوان الخام.
- **الخطوط** (اختيارية `fonts.css`) — قواعد `@font-face` لخطوط العلامة التجارية Instructure. الأساس _يطبق_ الخط؛ `fonts.css` _يحمل_ woff2s، لذا يتدهور النص بأناقة بدونها.

كل شيء عبارة عن CSS خالص مشتق من رموز IR، لذا فهو يتتبع InstUI من خلال الرموز بدون اعتماد على حزم InstUI React. للمكونات الحقيقية والتفاعلية، استخدم `@pantoken/react-markdown` (المحتوى) أو `@instructure/ui-*` (التطبيقات).

هذه الوحدة عبارة عن برميل: كل سجل موثق يعيش في ملفه الخاص تحت `components/`/`utilities/`/`rules/`/`declarations/`، تمت كتابته باستخدام `lib/` compose API. السجلات (`COMPONENTS`/`UTILITIES`/`RULES`/`DECLARATIONS`) تقود التجميع + اختبار التكافؤ.

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
