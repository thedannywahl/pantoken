[pantoken](../../../index.md) / web-components

# web-components

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`@pantoken/web-components` — framework-agnostic custom elements for Instructure UI.

[register](functions/register.md) (auto-invoked in the browser) defines the full `<instui-*>` element set into
any custom-element registry. Each element renders the matching `@pantoken/components` CSS into
its shadow root; tokens are inherited custom properties that pierce the shadow boundary — load
`@pantoken/css` to supply them.

For localized UI strings (calendar nav labels, date-input placeholder, drilldown Back text) pass
`locale`, `strings`, or `dir` options to [register](functions/register.md). Use `@pantoken/i18n` for the full
Canvas-parity bundle set of 44 locales (3 RTL) and the [register](functions/register.md)-wrapping
`registerLocalized` helper.

The module is Node-safe: element classes are defined inside [register](functions/register.md), a no-op when there
is no DOM, so importing during SSR or a build never touches `HTMLElement`.

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
