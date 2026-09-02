[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initInPlaceEdit

# Funció: initInPlaceEdit()

> **initInPlaceEdit**(`host`, `dispatchOn`): `void`

Connectar un camp editable per a comportament de commit/revert de fer clic per editar.
Entrar fa commit, Escape reverteix; desenfocar també fa commit si el valor ha canviat.
Dispara un CustomEvent `change` emergent amb `detail.value` en commit.

  CSS:  host = element .instui-in-place-edit (que SÍ que és contenteditable)
  WC:   host = shadow span .instui-in-place-edit

## Paràmetres

### host

`HTMLElement`

### dispatchOn

`HTMLElement`

## Retorna

`void`
