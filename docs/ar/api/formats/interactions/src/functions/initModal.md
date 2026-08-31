[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initModal

# Function: initModal()

> **initModal**(`host`, `dialog`, `onCommand`): `void`

توصيل `<dialog class="instui-modal">` من CSS أو shadow `<dialog>` من مكون الويب إلى بروتوكول
خاصية `open` وتوجيه أمر `--show/--close/--toggle`. كلا الاستخدامات تمرر نفس الواجهة:

- CSS: `host === dialog` (الحوار نفسه يحمل معرف وخاصية open)
- WC: `host` = عنصر مخصص، `dialog` = shadow `&lt;dialog&gt;` خاصته

## Parameters

### host

`HTMLElement`

### dialog

`HTMLDialogElement`

### onCommand

[`OnCommand`](../type-aliases/OnCommand.md)

## Returns

`void`
