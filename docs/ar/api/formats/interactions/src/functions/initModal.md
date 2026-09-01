[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initModal

# دالة: initModal()

> **initModal**(`host`, `dialog`, `onCommand`): `void`

قم بتوصيل `<dialog class="instui-modal">` في CSS أو ظل مكوّن الويب
`<dialog>` إلى بروتوكول السمة `open` وتوجيه الأوامر `--show/--close/--toggle`.
كلا الاستخدامين يمرران نفس الواجهة:

- CSS: `host === dialog` (يحمل الحوار نفسه المعرّف ووسمة open)
- WC: `host` = عنصر مخصّص, `dialog` = ظلّه `&lt;dialog&gt;`

## المعلمات

### host

`HTMLElement`

### dialog

`HTMLDialogElement`

### onCommand

[`OnCommand`](../type-aliases/OnCommand.md)

## القيم المرجعة

`void`
