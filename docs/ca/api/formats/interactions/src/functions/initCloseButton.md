[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initCloseButton

# Function: initCloseButton()

> **initCloseButton**(`btn`): `void`

Connectar un botó de tancament per descartar el seu objectiu.

Resolució de l'objectiu (guanya la primera coincidència):

1. `data-close-target="id"` — descartar l'element amb aquest id
2. `popovertarget` / `commandfor` — saltar; el navegador natiu ho gestiona
3. pujar fins al més proper `&lt;dialog&gt;`, `[popover]`, o `[data-dismissible]`

Estratègia de descart:

- `&lt;dialog&gt;` → `dialog.close()`
- `[popover]` → `el.hidePopover()`
- `[data-dismissible]` o `[open]` → eliminar atribut obert + disparar `close` emergent

## Parameters

### btn

`HTMLElement`

## Returns

`void`
