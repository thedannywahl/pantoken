[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / NESTED\_DEPS

# متغير: NESTED\_DEPS

> `const` **NESTED\_DEPS**: `Readonly`\<`Record`\<`string`, readonly `string`[]\>\>

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

العناصر التي يقوم وسم الظل الخاص بها بعرض عنصر آخر، لذلك يتطلب تسجيل عنصرٍ ما تبعياته أيضًا: `&lt;instui-date-time-input&gt;` يعرض `&lt;instui-date-input&gt;`، والذي يعرض `&lt;instui-calendar&gt;`.
مرشح `only` في [register](../functions/register.md) يتوسع عبر هذا (بشكل انتقالي) لذا فإن مجموعة مختارة بعناية لا تزال
تعمل. مفهرسة باسم القاعدة؛ القيم هي تبعيات مباشرة.
