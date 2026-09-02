[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initCloseButton

# Ֆունկցիա: initCloseButton()

> **initCloseButton**(`btn`): `void`

Կամուրջ փակել կոճակ՝ դրա թիրախը հեռացնելու համար:

Թիրախային լուծում (առաջին համընկերում հաղթում է):
1. `data-close-target="id"` — հեռացնել այն id-ով տարրը
2. `popovertarget` / `commandfor` — բաց թողնել; բնիկ դիտարկիչը քամ
3. քայլել ամենամոտ `&lt;dialog&gt;`, `[popover]` կամ `[data-dismissible]`

Հեռացման ստրատեգիա:
- `&lt;dialog&gt;` → `dialog.close()`
- `[popover]` → `el.hidePopover()`
- `[data-dismissible]` կամ `[open]` → հեռացնել բացական ատր + տանել փուչ `close`

## Պարամետրեր

### btn

`HTMLElement`

## Վերադարձվող արժեք

`void`
