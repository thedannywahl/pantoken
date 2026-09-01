[pantoken](../../../index.md) / components

# components

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

`@pantoken/components` — مكتبة مكونات CSS بمظهر InstUI، مبنية من الرموز `--instui-*`.

أوراق الأنماط الموردة:

- **الأساس** ([baseCss](functions/baseCss.md)) — إعدادات افتراضية مستندة إلى الرموز يمكن تفعيلها على مستوى المستند (box-sizing، إعادة تعيين body، سطح الصفحة، لون/خط النص الأساسي، `color-scheme`). كما تتضمّن حلقة مخطط التركيز، لذا يحصل كل عنصر قابل للتركيز على مخطط `:focus-visible` مُتاح افتراضيًا. حمّله عندما تكون pantoken مالك الصفحة.
- **المقال** ([proseCss](functions/proseCss.md)) — أنماط لmarkdown/HTML المنسق (جداول، عناوين، روابط، قوائم، كود) مُقيّدة بجذر المحتوى، بحيث تبدو صفحة التوثيق أو منطقة المحتوى بمظهر InstUI دون استبدال DOM بالمكونات. هذا ما توردة عارضات الموقع كـ `components.css`.
- **المكونات** ([buttonCss](variables/buttonCss.md), [alertCss](variables/alertCss.md), [badgeCss](variables/badgeCss.md)، مجمعة بواسطة [componentsCss](functions/componentsCss.md)) — أنماط مكونات مبنية على الكلاسات تطبّقها على تعليماتك الخاصة (`<button class="instui-button">`)، لمظهر InstUI خارج إطار المكونات. مقياس الظل `--instui-elevation-*` ([elevationCss](functions/elevationCss.md)) يقود هذه الورقة، لأن عدداً كافياً من المكونات يطفو فتكون الظلال سمة تصميمية جوهرية بدلاً من إضافة لاحقة.
- **الأدوات المساعدة** ([viewCss](variables/viewCss.md), [spacingUtilitiesCss](variables/spacingUtilitiesCss.md), [gapCss](variables/gapCss.md), [layoutUtilitiesCss](variables/layoutUtilitiesCss.md)، بالإضافة إلى مجموعة ألوان/رموز معنيوية مُنقّحة) — طبقة اختيارية من الكلاسات الشاملة. مولدات الرمز→الكلاس العامة (`colorUtilitiesCss`, `tokenUtilitiesCss`) موجودة في `@pantoken/utils`; هذه الحزمة تزودها بالأسماء *المعنيوية* المنقّحة، بينما تُزوّد `@pantoken/plugin-primitives` باللوحة الخام.
- **الخطوط** (اختياري `fonts.css`) — قواعد `@font-face` لخطوط علامة Instructure. يقوم Base *بتطبيق* الخط؛ و`fonts.css` *يحمّل* ملفات woff2، لذا يتدهور النص بلطف إذا لم تكن متاحة.

كل شيء هو CSS نقي مشتق من IR الرموز، لذا يتتبع InstUI عبر الرموز دون اعتماد على حزم React الخاصة بـ InstUI. للمكونات التفاعلية الحقيقية، استخدم `@pantoken/react-markdown` (المحتوى) أو `@instructure/ui-*` (التطبيقات).

هذه الوحدة عبارة عن برميل: كل سجل موثّق يعيش في ملفه الخاص تحت `components/`/`utilities/`/`rules/`/`declarations/`، مؤلف باستخدام واجهة تجميع `lib/`. تسهم السجلات (`COMPONENTS`/`UTILITIES`/`RULES`/`DECLARATIONS`) في التجميع + اختبار التكافؤ.

## واجهات

- [ComponentOptions](interfaces/ComponentOptions.md)
- [ProseOptions](interfaces/ProseOptions.md)
- [IconGlyphsOptions](interfaces/IconGlyphsOptions.md)

## المتغيرات

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

## الدوال

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
