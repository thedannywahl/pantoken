[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initRemove

# Function: initRemove()

> **initRemove**(`target`, `options?`): [`RemoveHandle`](../interfaces/RemoveHandle.md)

Հեռացրեք թիրախը ժամանակի ընդմեջ: Հեռացնելուց առաջ, կրակում է չեղարկվող, փուչ `dismiss` իրադարձություն:
Ադ իրադարձության կանխելը պահում է թիրախը տեղադրված:

Ժամանակի ընդմեջը բացահայտ միլիվայրկյանային տարբերակ է կամ թիրախի հաշվարկված, միավորից զուրկ `--timeout` CSS
հատկություն: Բացակայող, ոչ վերջավոր և ոչ դրական արժեքները չեն զենքավորում ժամաչափ: Աղավնոցը օգտագործում է
`@pantoken/components` `transition` կոմունալ ծառայության դասերը (`.instui-transition` + `-fade-*`), ապա սպասում
`transitionend`-ին (պահուստային հետ); `transition: "none"` հեռացնում է անմիջապես:

## Parameters

### target

`HTMLElement`

### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

## Returns

[`RemoveHandle`](../interfaces/RemoveHandle.md)
