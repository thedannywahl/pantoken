[pantoken](../../../../index.md) / [formats/components/src](../index.md) / componentsCss

# دالة: componentsCss()

> **componentsCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">بيتا</span>

بناء ملف أنماط المكونات المجمّع: قواعد كل مكون بترتيب الربط `COMPONENTS`.
يتم إلحاق اسماء الأحجام والاسماء المزدوجة كألقاب لكل مكون على حدة (ضمن قسمه الخاص) بحيث يكون لكل اسم مستعار صفحة توثيق مستقلة — تُكتشف الأسماء المستعارة من بيانات التعريف `@alias {@link -x}` أو
`@deprecated {@link -x}` لكل سجل (انظر `withAliases`), وليس من قائمة مركزية تُدار يدويًا. مرجع مقياس الظلال `--instui-elevation-*` للمكونات مُعرّف في جدول الرموز
(`@pantoken/css`), لذا لم يعد مُضمّنًا هنا.

## المعلمات

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## القيم المرجعة

`string`

سلسلة CSS.
