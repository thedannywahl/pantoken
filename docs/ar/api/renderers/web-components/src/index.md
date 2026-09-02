[pantoken](../../../index.md) / web-components

# web-components

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`@pantoken/web-components` — عناصر مخصصة مستقلة عن الإطار لواجهة مستخدم Instructure.

[register](functions/register.md) (تُستدعى تلقائيًا في المتصفح) تُعرِّف مجموعة العناصر الكاملة `<instui-*>` في
أي سجل عناصر مخصصة. كل عنصر يعرض `@pantoken/components` CSS المطابق داخل
جذر الظل الخاص به؛ الرموز هي خصائص مخصصة موروثة تخترق حد الظل — حمِّل
`@pantoken/css` لتوفيرها.

للسلاسل المحلية لواجهة المستخدم (تسميات تنقّل التقويم، عنصر نائب حقل التاريخ، نص الرجوع في drilldown) مرِّر
خيارات `locale` أو `strings` أو `dir` إلى [register](functions/register.md). استخدم `@pantoken/i18n` لمجموعة الحزم الكاملة المطابقة لـ Canvas المكوّنة من 44 لغة (3 منها RTL) والمساعد
الذي يُغلف [register](functions/register.md) `registerLocalized`.

الوحدة آمنة على Node: تُعرّف فئات العناصر داخل [register](functions/register.md)، وهو إجراء لا يؤثر عندما
لا يوجد DOM، لذلك الاستيراد أثناء SSR أو أثناء البناء لا يمس `HTMLElement`.

## واجهات

- [CommandEventish](interfaces/CommandEventish.md)
- [ElementRegistry](interfaces/ElementRegistry.md)
- [RegisterContext](interfaces/RegisterContext.md)
- [ElementDefinition](interfaces/ElementDefinition.md)
- [RegisterContextOptions](interfaces/RegisterContextOptions.md)
- [WebComponentStrings](interfaces/WebComponentStrings.md)

## المتغيرات

- [alert](variables/alert.md)
- [avatar](variables/avatar.md)
- [badge](variables/badge.md)
- [button](variables/button.md)
- [calendar](variables/calendar.md)
- [contextView](variables/contextView.md)
- [dateInput](variables/dateInput.md)
- [dateTimeInput](variables/dateTimeInput.md)
- [drawerLayout](variables/drawerLayout.md)
- [drilldown](variables/drilldown.md)
- [iconButton](variables/iconButton.md)
- [icon](variables/icon.md)
- [img](variables/img.md)
- [inPlaceEdit](variables/inPlaceEdit.md)
- [DEFINITIONS](variables/DEFINITIONS.md)
- [metric](variables/metric.md)
- [modal](variables/modal.md)
- [pages](variables/pages.md)
- [pill](variables/pill.md)
- [popover](variables/popover.md)
- [progressCircle](variables/progressCircle.md)
- [progress](variables/progress.md)
- [rating](variables/rating.md)
- [sideNavBar](variables/sideNavBar.md)
- [spinner](variables/spinner.md)
- [tag](variables/tag.md)
- [toggleButton](variables/toggleButton.md)
- [tooltip](variables/tooltip.md)
- [tray](variables/tray.md)
- [treeBrowser](variables/treeBrowser.md)
- [truncate](variables/truncate.md)
- [ELEMENTS](variables/ELEMENTS.md)
- [NESTED\_DEPS](variables/NESTED_DEPS.md)
- [ICON\_ELEMENTS](variables/ICON_ELEMENTS.md)
- [DEFAULT\_PREFIX](variables/DEFAULT_PREFIX.md)
- [ENGLISH\_STRINGS](variables/ENGLISH_STRINGS.md)

## الدوال

- [register](functions/register.md)
- [iconSvg](functions/iconSvg.md)
- [noopIconSvg](functions/noopIconSvg.md)
- [buildRegisterContext](functions/buildRegisterContext.md)
- [resolveFirstDay](functions/resolveFirstDay.md)
- [makeStrings](functions/makeStrings.md)
