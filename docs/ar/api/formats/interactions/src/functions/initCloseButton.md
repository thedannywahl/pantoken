[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initCloseButton

# دالة: initCloseButton()

> **initCloseButton**(`btn`): `void`

وصل زر إغلاق لإخفاء هدفه.

تحديد الهدف (أول تطابق يفوز):
1. `data-close-target="id"` — إخفاء العنصر ذي هذا المعرف
2. `popovertarget` / `commandfor` — تخطٍّ؛ المتصفح الأصلي يتعامل معه
3. الصعود إلى أقرب `&lt;dialog&gt;` أو `[popover]` أو `[data-dismissible]`

استراتيجية الإغلاق:
- `&lt;dialog&gt;` → `dialog.close()`
- `[popover]` → `el.hidePopover()`
- `[data-dismissible]` أو `[open]` → إزالة السمة open + إطلاق حدث `close` الذي ينتشر (bubbling)

## المعلمات

### btn

`HTMLElement`

## القيم المرجعة

`void`
