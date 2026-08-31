[pantoken](../../../../index.md) / [formats/components/src](../index.md) / baseCss

# Function: baseCss()

> **baseCss**(): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

بناء ورقة أنماط الإلغاء/الإعادة المختيارة: الافتراضيات العامة للمستند من الرموز (حجم الصندوق، إعادة تعيين الجسم، سطح الصفحة، لون/خط النص الأساسي، `color-scheme`، الارتباط الأساسي)، متبوعة بقواعد حلقة التركيز
(افتراضي على مستوى المستند يستهدف focusables العارية). فقط قواعد الحلقة _rules_ تعيش هنا — خصائص `--instui-focus-outline-*` المخصصة التي تقرأها
تشحن في ورقة الرموز (`@pantoken/css`)، لذا لا يعود `base.css` يعيد تعريفها. حمّله مرة واحدة، قبل أوراق المكونات والنثر، عندما
يمتلك pantoken الصفحة.

## Returns

`string`

سلسلة CSS.
