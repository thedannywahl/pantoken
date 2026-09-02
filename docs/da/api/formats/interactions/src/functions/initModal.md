[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initModal

# Funktion: initModal()

> **initModal**(`host`, `dialog`, `onCommand`): `void`

Forbind en CSS `<dialog class="instui-modal">` eller en webkomponents skygge `<dialog>` til protokollen for `open` attribut og `--show/--close/--toggle` kommandoruting. Begge anvendelser passerer samme grænseflade:

- CSS: `host === dialog` (dialogen selv bærer id'et og åben attribut)
- WC: `host` = brugerdefineret element, `dialog` = dets skygge `&lt;dialog&gt;`

## Parametre

### host

`HTMLElement`

### dialog

`HTMLDialogElement`

### onCommand

[`OnCommand`](../type-aliases/OnCommand.md)

## Returnerer

`void`
