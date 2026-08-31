[pantoken](../../../index.md) / web-components

# web-components

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`@pantoken/web-components` — عناصر مخصصة مستقلة عن الإطار لواجهة Instructure UI.

[register](functions/register.md) (يتم استدعاؤه تلقائيًا في المتصفح) يحدد مجموعة عناصر `<instui-*>` الكاملة في
أي سجل عناصر مخصص. يرسل كل عنصر CSS `@pantoken/components` المطابق إلى
جذره العميق؛ الرموز هي خصائص مخصصة موروثة تخترق حدود الظل — قم بتحميل
`@pantoken/css` لتوفيرها.

لسلاسل واجهة المستخدم المترجمة (تسميات ملاحة التقويم، عنصر نائب للإدخال، نص الرجوع) قم بتمرير
`locale`, `strings`, أو `dir` خيارات إلى [register](functions/register.md). استخدم `@pantoken/i18n` للمجموعة الكاملة
المتوافقة مع Canvas من 44 إقليم (3 RTL) والمساعد الذي يلف
`registerLocalized`[register](functions/register.md).

الوحدة آمنة للعقدة: تُعرّف فئات العناصر داخل [register](functions/register.md)، وهي عملية بلا تأثير عندما لا يكون هناك
DOM، لذا فإن الاستيراد أثناء SSR أو البناء لا يلمس `HTMLElement`.

## Interfaces

- [CommandEventish](interfaces/CommandEventish.md)
- [ElementRegistry](interfaces/ElementRegistry.md)
- [RegisterContext](interfaces/RegisterContext.md)
- [ElementDefinition](interfaces/ElementDefinition.md)
- [RegisterContextOptions](interfaces/RegisterContextOptions.md)
- [WebComponentStrings](interfaces/WebComponentStrings.md)

## Variables

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

## Functions

- [register](functions/register.md)
- [iconSvg](functions/iconSvg.md)
- [noopIconSvg](functions/noopIconSvg.md)
- [buildRegisterContext](functions/buildRegisterContext.md)
- [resolveFirstDay](functions/resolveFirstDay.md)
- [makeStrings](functions/makeStrings.md)
