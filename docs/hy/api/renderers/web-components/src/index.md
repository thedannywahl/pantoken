[pantoken](../../../index.md) / web-components

# web-components

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`@pantoken/web-components` — շրջանակից անկախ կաղապար տարրեր Instructure UI-ի համար:

[register](functions/register.md) (ավտոմատ կերպով կանչվում է բրաուզերում) սահմանում է `<instui-*>` տարրերի լրակազմ ցանկացած custom-element registry-ի մեջ։ Յուրաքանչյուր տարր ներկայացնում է համապատասխան `@pantoken/components` CSS-ը իր shadow root-ի մեջ; token-ները ժառանգված custom property-ներ են, որոնք ներթափանցում են shadow boundary-ին — բեռնել `@pantoken/css` տրամադրելու համար։

Տեղայնացված UI տողերի համար (calendar nav պիտակներ, date-input placeholder, drilldown Back տեքստ) փոխանցել `locale`, `strings`, կամ `dir` տարբերակներ [register](functions/register.md)-ին։ Օգտագործել `@pantoken/i18n` Canvas-համապատասխան 44 տեղային լակի ամբողջ հավաքածուի համար (3 RTL) և [register](functions/register.md)-ի շուրջ `registerLocalized` օգնական։

Մոդուլը Node-անվտանգ է. տարրերի դասերը սահմանված են [register](functions/register.md)-ի ներսում, որը առանց գործողության է, երբ DOM չկա, ուստի SSR կամ build-ի ընթացքում ներմուծումը երբեք չի շոշափում `HTMLElement`-ը։

## Ինտերֆեյսներ

- [CommandEventish](interfaces/CommandEventish.md)
- [ElementRegistry](interfaces/ElementRegistry.md)
- [RegisterContext](interfaces/RegisterContext.md)
- [ElementDefinition](interfaces/ElementDefinition.md)
- [RegisterContextOptions](interfaces/RegisterContextOptions.md)
- [WebComponentStrings](interfaces/WebComponentStrings.md)

## Փոփոխականներ

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

## Ֆունկցիաներ

- [register](functions/register.md)
- [iconSvg](functions/iconSvg.md)
- [noopIconSvg](functions/noopIconSvg.md)
- [buildRegisterContext](functions/buildRegisterContext.md)
- [resolveFirstDay](functions/resolveFirstDay.md)
- [makeStrings](functions/makeStrings.md)
