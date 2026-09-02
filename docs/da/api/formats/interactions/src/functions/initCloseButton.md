[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initCloseButton

# Funktion: initCloseButton()

> **initCloseButton**(`btn`): `void`

Forbind en lukkeknap med at lukke dens mål.

Målauflösning (første match vinder):
1. `data-close-target="id"` — luk elementet med det id
2. `popovertarget` / `commandfor` — skip; native browser håndterer det
3. gå op til den nærmeste `&lt;dialog&gt;`, `[popover]` eller `[data-dismissible]`

Luk-strategi:
- `&lt;dialog&gt;` → `dialog.close()`
- `[popover]` → `el.hidePopover()`
- `[data-dismissible]` eller `[open]` → fjern åben attribut + affyr bobblende `close`

## Parametre

### btn

`HTMLElement`

## Returnerer

`void`
