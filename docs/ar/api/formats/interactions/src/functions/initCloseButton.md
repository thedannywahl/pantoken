[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initCloseButton

# Function: initCloseButton()

> **initCloseButton**(`btn`): `void`

توصيل زر الإغلاق لرفض هدفه.

دقة الهدف (أول تطابق يفوز):

1. `data-close-target="id"` — رفض العنصر بهذا المعرف
2. `popovertarget` / `commandfor` — تخطي؛ يتعامل معه المتصفح الأصلي
3. الصعود إلى أقرب `&lt;dialog&gt;`، `[popover]`، أو `[data-dismissible]`

استراتيجية الرفض:

- `&lt;dialog&gt;` → `dialog.close()`
- `[popover]` → `el.hidePopover()`
- `[data-dismissible]` أو `[open]` → إزالة خاصية open + إطلاق bubbling `close`

## Parameters

### btn

`HTMLElement`

## Returns

`void`
