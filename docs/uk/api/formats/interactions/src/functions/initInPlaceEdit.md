[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initInPlaceEdit

# Функція: initInPlaceEdit()

> **initInPlaceEdit**(`host`, `dispatchOn`): `void`

Wire a contenteditable field for click-to-edit commit/revert behaviour.
Enter commits, Escape reverts; blur also commits if the value changed.
Fires a bubbling `change` CustomEvent with `detail.value` on commit.

  CSS:  host = .instui-in-place-edit element (which IS contenteditable)
  WC:   host = shadow .instui-in-place-edit span

## Параметри

### host

`HTMLElement`

### dispatchOn

`HTMLElement`

## Повертає

`void`
