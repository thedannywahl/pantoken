[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / NESTED\_DEPS

# Variable: NESTED\_DEPS

> `const` **NESTED\_DEPS**: `Readonly`\<`Record`\<`string`, readonly `string`[]\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

العناصر التي تحتوي على ترميز ظلي يعرض عنصراً آخر، لذا فإن تسجيل واحد يتطلب تبعياته أيضاً: `&lt;instui-date-time-input&gt;` يعرض `&lt;instui-date-input&gt;`، والذي يعرض `&lt;instui-calendar&gt;`.
يتوسع مرشح `only` الخاص بـ [register](../functions/register.md) من خلال هذا (بشكل متعدي) بحيث تعمل مجموعة فرعية محددة بعناية أيضاً. مفتاح حسب الاسم الأساسي؛ القيم هي التبعيات المباشرة.
