[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initTooltip

# Function: initTooltip()

> **initTooltip**(`wrapper`, `tip`, `options?`): [`TooltipHandle`](../interfaces/TooltipHandle.md)

توصيل إظهار/إخفاء التمرير/التركيز مع التأخير على غلاف تلميح الأداة وفقاعته.
يرجع دالة تنظيف للاستخدام في disconnectedCallback لمكون ويب.

CSS: wrapper = عنصر .instui-tooltip، tip = طفله .tip
WC: wrapper = shadow .instui-tooltip، tip = shadow .tip

## Parameters

### wrapper

`HTMLElement`

### tip

`HTMLElement`

### options?

[`TooltipOptions`](../interfaces/TooltipOptions.md)

## Returns

[`TooltipHandle`](../interfaces/TooltipHandle.md)
