[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / renderDemoFigure

# دالة: renderDemoFigure()

> **renderDemoFigure**(`resolved`): `string`

قم بتصيير HTML لوحة العينة (demo) لعينة محلولة: iframe عاري، معزول، يُحمّل كسولاً ومؤطر كمثال حي
(بدون عناصر واجهة مضيف — المشغّل بداخل الـ iframe يحمل شريط أدوات تبويباته الخاص). زيّنه بـ
`@pantoken/demo/demo.css`.

## المعلمات

### resolved

[`ResolvedDemo`](../interfaces/ResolvedDemo.md)

مثال لـ [ResolvedDemo](../interfaces/ResolvedDemo.md).

## القيم المرجعة

`string`

سلسلة HTML الخاصة باللوحة.
