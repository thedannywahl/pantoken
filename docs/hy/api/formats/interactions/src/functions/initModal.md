[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initModal

# Function: initModal()

> **initModal**(`host`, `dialog`, `onCommand`): `void`

Կամուրջ CSS `<dialog class="instui-modal">` կամ վեբ բաղադրիչի shadow
`<dialog>` դեպի `open` հատկանիշ արձանագրություն և `--show/--close/--toggle`
հրամ երթուղիներ: Երկու օգտագործում փոխանցում են միևնույն ինտերֆեյսը:

- CSS: `host === dialog` (երկխոսությունն ինքն կրում է id և բացական ատր)
- WC: `host` = custom element, `dialog` = its shadow `&lt;dialog&gt;`

## Parameters

### host

`HTMLElement`

### dialog

`HTMLDialogElement`

### onCommand

[`OnCommand`](../type-aliases/OnCommand.md)

## Returns

`void`
