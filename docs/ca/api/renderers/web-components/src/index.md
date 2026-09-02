[pantoken](../../../index.md) / web-components

# web-components

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`@pantoken/web-components` — elements personalitzats agnòstics del marc per a la interfície d'usuari d'Instructure.

[register](functions/register.md) (auto-invocat al navegador) defineix el conjunt complet d'elements `<instui-*>` en qualsevol registre d'elements personalitzats. Cada element renderitza el `@pantoken/components` CSS coincident en la seva arrel d'ombra; els tokens són propietats personalitzades heretades que travessen el límit de l'ombra — carregeu `@pantoken/css` per a subministrar-los.

Per a cadenes de la interfície d'usuari localitzades (etiquetes de navegació del calendari, marcador de posició d'entrada de data, text de retorn de perforació) passeu les opcions `locale`, `strings` o `dir` a [register](functions/register.md). Utilitzeu `@pantoken/i18n` per al conjunt complet de paquet amb paritat de Canvas de 44 configuracions regionals (3 RTL) i l'ajudant de sagrament `registerLocalized` de [register](functions/register.md).

El mòdul és segur per a Node: les classes d'elements es defineixen dins [register](functions/register.md), una no-op quan no hi ha DOM, de manera que importar durant SSR o una construcció mai no toca `HTMLElement`.

## Interfícies

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

## Funcions

- [register](functions/register.md)
- [iconSvg](functions/iconSvg.md)
- [noopIconSvg](functions/noopIconSvg.md)
- [buildRegisterContext](functions/buildRegisterContext.md)
- [resolveFirstDay](functions/resolveFirstDay.md)
- [makeStrings](functions/makeStrings.md)
