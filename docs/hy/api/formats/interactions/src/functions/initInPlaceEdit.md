[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initInPlaceEdit

# Ֆունկցիա: initInPlaceEdit()

> **initInPlaceEdit**(`host`, `dispatchOn`): `void`

Կամուրջ contenteditable դաշտ՝ կլիկ-խմբագիր հաստատում/հետականչ վարքագիծի համար:
Հաստատել հաստատում, Escape հետականչ; բաղալուծումն ինքնին հաստատում, եթե արժեքը փոխվել:
Հրամ փուչ `change` CustomEvent `detail.value`-ի հետ հաստատման ժամանակ:

  CSS:  host = .instui-in-place-edit element (which IS contenteditable)
  WC:   host = shadow .instui-in-place-edit span

## Պարամետրեր

### host

`HTMLElement`

### dispatchOn

`HTMLElement`

## Վերադարձվող արժեք

`void`
