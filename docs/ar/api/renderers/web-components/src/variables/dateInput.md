[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateInput

# متغير: dateInput

> `const` **dateInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-date-input&gt;` — حقل نصي مع قائمة منسدلة للتقويم. الزر يقوم بالتبديل بين `[popover]` عبر أمر Invoker المضمّن `toggle-popover` (يوجد بديل بالنقر للمتصفحات التي لا تدعم الـ API)؛ اختيار يوم في `&lt;instui-calendar&gt;` المتداخِل يملأ الحقل (بصيغة ISO `yyyy-mm-dd`), يغلق النافذة المنبثقة، ويطلق حدثًا مركبًا ومتدفقًا `change` (`detail.value`). أيضاً يمكن كتابة `yyyy-mm-dd` صالح (أو مسحه) والالتزام عبر `change` للحقل. `value` هو تاريخ ISO، `label` هو الاسم القابل للوصول (الافتراضي `Date`), و`placeholder` هي التلميحة (الافتراضية `yyyy-mm-dd`).

## مثال

```html
<instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
```
