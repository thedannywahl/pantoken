[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initInPlaceEdit

# Function: initInPlaceEdit()

> **initInPlaceEdit**(`host`, `dispatchOn`): `void`

Forbind et contenteditable-felt til click-to-edit commit/revert-adfærd.
Enter udfører commit, Escape fortryder; blur udfører også commit, hvis værdien ændrede.
Affyrer en bobblende `change` CustomEvent med `detail.value` ved commit.

CSS: vært = .instui-in-place-edit-element (som ER contenteditable)
WC: vært = skygge .instui-in-place-edit span

## Parameters

### host

`HTMLElement`

### dispatchOn

`HTMLElement`

## Returns

`void`
