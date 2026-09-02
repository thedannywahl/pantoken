[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initTooltip

# دالة: initTooltip()

> **initTooltip**(`wrapper`, `tip`, `options?`): [`TooltipHandle`](../interfaces/TooltipHandle.md)

ربط سلوك العرض/الإخفاء عند التحويم أو التركيز مع تأخير على غلاف التلميح ونقطة الفقاعة الخاصة به.
يعيد دالة تنظيف لاستخدامها في disconnectedCallback لمكوّن الويب.

  CSS:  wrapper = عنصر .instui-tooltip، tip = عنصر .tip التابع له
  WC:   wrapper = عنصر .instui-tooltip داخل الظل، tip = عنصر .tip داخل الظل

## المعلمات

### wrapper

`HTMLElement`

### tip

`HTMLElement`

### options?

[`TooltipOptions`](../interfaces/TooltipOptions.md)

## القيم المرجعة

[`TooltipHandle`](../interfaces/TooltipHandle.md)
