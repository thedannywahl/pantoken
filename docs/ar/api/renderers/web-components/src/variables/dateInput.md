[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateInput

# Variable: dateInput

> `const` **dateInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-date-input&gt;` — حقل نص بالإضافة إلى قائمة منسدلة تقويم. المشغل يبدّل `[popover]`
من خلال أمر Invoker المدمج `toggle-popover` (بديل النقر يغطي المتصفحات بدون
API)؛ اختيار يوم في `&lt;instui-calendar&gt;` المتداخل يملأ الحقل (تاريخ ISO `yyyy-mm-dd`)، ويغلق
النافذة المنبثقة، ويصدر حدث `change` مركب فقاعة (`detail.value`). كتابة `yyyy-mm-dd` صحيح (أو
مسحه) والالتزام بـ `change` للإدخال يعمل أيضاً. `value` هو تاريخ ISO، `label` هو
الاسم المتاح (الافتراضي `Date`)، و `placeholder` هو التلميح (الافتراضي `yyyy-mm-dd`).

## Example

```html
<instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
```
