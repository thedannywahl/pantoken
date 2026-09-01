[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / initProgressCircle

# دالة: initProgressCircle()

> **initProgressCircle**(`target`, `options?`): [`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)

إطلاق مُعدِّل mount-animation الخاص بـ ProgressCircle بعد مدة التأخير المكوّنة له.

مدة التأخير هي خيار صريح بوحدة المِلّي ثانية أو خاصية مخصّصة محتسبة للهدف بدون وحدة
`--animation-delay`. القيم المفقودة أو السالبة أو غير المنتهية تصبح صفرًا. كل من
المُعدِّل المعروف والاسم المستعار القديم الناتج عن خطأ مطبعي مقبولان ومُزالان.

## المعلمات

### target

`HTMLElement`

### options?

[`ProgressCircleOptions`](../interfaces/ProgressCircleOptions.md) = `{}`

## القيم المرجعة

[`ProgressCircleHandle`](../interfaces/ProgressCircleHandle.md)
