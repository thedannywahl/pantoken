[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initModal

# Funksjon: initModal()

> **initModal**(`host`, `dialog`, `onCommand`): `void`

Wire a CSS `<dialog class="instui-modal">` or a web component's shadow
`<dialog>` to the `open` attribute protocol and `--show/--close/--toggle`
command routing. Both usages pass the same interface:

- CSS: `host === dialog` (the dialog itself carries the id and open attr)
- WC: `host` = custom element, `dialog` = its shadow `&lt;dialog&gt;`

## Parametrar

### host

`HTMLElement`

### dialog

`HTMLDialogElement`

### onCommand

[`OnCommand`](../type-aliases/OnCommand.md)

## Returnerer

`void`
