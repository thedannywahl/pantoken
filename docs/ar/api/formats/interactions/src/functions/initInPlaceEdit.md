[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initInPlaceEdit

# Function: initInPlaceEdit()

> **initInPlaceEdit**(`host`, `dispatchOn`): `void`

توصيل حقل قابل للتحرير للنقر للتحرير سلوك الالتزام/الاستعادة.
أدخل الالتزامات، Escape يعيد تعيينها؛ يلتزم الضبابية أيضاً إذا تغيرت القيمة.
يطلق bubbling `change` CustomEvent مع `detail.value` عند الالتزام.

CSS: host = عنصر .instui-in-place-edit (الذي يكون قابل للتحرير)
WC: host = shadow .instui-in-place-edit span

## Parameters

### host

`HTMLElement`

### dispatchOn

`HTMLElement`

## Returns

`void`
