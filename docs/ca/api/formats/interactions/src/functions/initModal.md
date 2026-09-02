[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initModal

# Funció: initModal()

> **initModal**(`host`, `dialog`, `onCommand`): `void`

Connectar un `<dialog class="instui-modal">` CSS o el shadow `<dialog>` d'un component web al protocol d'atribut `open` i l'enrutament de comandos `--show/--close/--toggle`. Tots dos usos passen la mateixa interfície:

- CSS: `host === dialog` (el diàleg en si porta l'id i l'atribut obert)
- WC: `host` = element personalitzat, `dialog` = el seu shadow `&lt;dialog&gt;`

## Paràmetres

### host

`HTMLElement`

### dialog

`HTMLDialogElement`

### onCommand

[`OnCommand`](../type-aliases/OnCommand.md)

## Retorna

`void`
