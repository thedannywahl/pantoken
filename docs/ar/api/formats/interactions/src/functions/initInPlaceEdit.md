[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initInPlaceEdit

# دالة: initInPlaceEdit()

> **initInPlaceEdit**(`host`, `dispatchOn`): `void`

قم بتوصيل حقل قابل للتحرير (contenteditable) لسلوك النقر للتحرير (commit/revert).
زر Enter يقوم بالالتزام، و Escape يقوم بالتراجع؛ الفقدان للتركيز (blur) يلتزم أيضاً إذا تغيرت القيمة.
يطلق حدث `change` من نوع CustomEvent قابل للتفشي مع `detail.value` عند الالتزام.

  CSS:  host = .instui-in-place-edit العنصر (والذي هو contenteditable)
  WC:   host = shadow .instui-in-place-edit span

## المعلمات

### host

`HTMLElement`

### dispatchOn

`HTMLElement`

## القيم المرجعة

`void`
