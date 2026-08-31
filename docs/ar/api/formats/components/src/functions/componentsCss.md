[pantoken](../../../../index.md) / [formats/components/src](../index.md) / componentsCss

# Function: componentsCss()

> **componentsCss**(`options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء ورقة الأنماط المجمعة للمكون: قواعد كل مكون بترتيب `COMPONENTS` concat.
يتم إلحاق توأم الحجم والاسم المستعار لكل مكون (داخل كتلته الخاصة) بحيث يتم توثيق كل اسم مستعار على صفحته الخاصة — يتم اكتشاف الأسماء المستعارة من بيانات `@alias {@link -x}` أو
`@deprecated {@link -x}` لكل سجل (انظر `withAliases`)، وليس من قائمة مركزية محفوظة يدويًا. يتم تعريف مقياس الظل `--instui-elevation-*`
الذي تشير إليه المكونات في ورقة الرموز (`@pantoken/css`)، لذا لم يعد مضمنًا هنا.

## Parameters

### options?

[`ComponentOptions`](../interfaces/ComponentOptions.md) = `{}`

[ComponentOptions](../interfaces/ComponentOptions.md).

## Returns

`string`

سلسلة CSS.
