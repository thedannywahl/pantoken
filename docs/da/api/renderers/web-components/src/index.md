[pantoken](../../../index.md) / web-components

# web-components

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`@pantoken/web-components` — rammeværkuafhængige brugerdefinerede elementer til Instructure UI.

[register](functions/register.md) (auto-kaldt i browseren) definerer det fulde `<instui-*>` element-sæt i ethvert custom-element registry. Hvert element gengiver de tilsvarende `@pantoken/components` CSS i sin shadow root; tokens er nedarvede brugerdefinerede egenskaber, der krydser shadow-grænsen — indlæs `@pantoken/css` for at levere dem.

For lokaliserede UI-strenge (kalendernavigationsetiketter, datoindtastningsplaceholder, drilldown Tilbage-tekst) skal du sende `locale`, `strings` eller `dir` indstillinger til [register](functions/register.md). Brug `@pantoken/i18n` til det fulde Canvas-parity bundle-sæt med 44 lokaliteter (3 RTL) og hjælperen `registerLocalized` som omslutter [register](functions/register.md).

Modulet er Node-sikkert: element-klasser er defineret inde i [register](functions/register.md), en no-op når der ikke er DOM, så import under SSR eller build berører aldrig `HTMLElement`.

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
