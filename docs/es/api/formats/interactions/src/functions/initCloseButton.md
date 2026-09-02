[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initCloseButton

# Función: initCloseButton()

> **initCloseButton**(`btn`): `void`

Wire a close button to dismiss its target.

Target resolution (first match wins):
1. `data-close-target="id"` — dismiss the element with that id
2. `popovertarget` / `commandfor` — skip; native browser handles it
3. walk up to the nearest `&lt;dialog&gt;`, `[popover]`, or `[data-dismissible]`

Dismiss strategy:
- `&lt;dialog&gt;` → `dialog.close()`
- `[popover]` → `el.hidePopover()`
- `[data-dismissible]` or `[open]` → remove open attr + fire bubbling `close`

## Parámetros

### btn

`HTMLElement`

## Devuelve

`void`
