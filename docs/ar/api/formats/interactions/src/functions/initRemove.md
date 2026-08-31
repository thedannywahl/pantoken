[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initRemove

# Function: initRemove()

> **initRemove**(`target`, `options?`): [`RemoveHandle`](../interfaces/RemoveHandle.md)

إزالة هدف بعد انتهاء المهلة الزمنية. قبل الإزالة، يطلق حدث `dismiss` قابل للإلغاء وفقاعي.
منع هذا الحدث يبقي الهدف مثبتًا.

المهلة الزمنية هي خيار ميلي ثانية صريح أو خاصية CSS مخصصة محسوبة بلا وحدات للهدف `--timeout`.
لا تقوم القيم المفقودة وغير المحدودة وغير الموجبة بتسليح مؤقت زمني. يستخدم التلاشي فئات أداة
`@pantoken/components` `transition` (`.instui-transition` + `-fade-*`)، ثم ينتظر
`transitionend` (مع بديل)؛ `transition: "none"` يزيل على الفور.

## Parameters

### target

`HTMLElement`

### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

## Returns

[`RemoveHandle`](../interfaces/RemoveHandle.md)
