[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initRemove

# دالة: initRemove()

> **initRemove**(`target`, `options?`): [`RemoveHandle`](../interfaces/RemoveHandle.md)

إزالة الهدف بعد مهلة. قبل الإزالة، يطلق حدث `dismiss` قابلًا للإلغاء وينبثق (bubbling).
منع ذلك الحدث يُبقي الهدف مُركَّبًا.

المهلة عبارة عن خيار صريح بالملي ثانية أو الخاصية المخصصة في CSS المحسوبة للهدف `--timeout` بلا وحدة.
القيم المفقودة أو غير المنتهية أو غير الموجبة لا تُفعِّل مؤقتًا. يستخدم التلاشي أصناف المرافق `@pantoken/components` `transition` (`.instui-transition` + `-fade-*`)، ثم ينتظر `transitionend` (مع بديل احتياطي)؛ `transition: "none"` يزيل على الفور.

## المعلمات

### target

`HTMLElement`

### options?

[`RemoveOptions`](../interfaces/RemoveOptions.md) = `{}`

## القيم المرجعة

[`RemoveHandle`](../interfaces/RemoveHandle.md)
