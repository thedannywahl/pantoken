[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / inPlaceEdit

# Variable: inPlaceEdit

> `const` **inPlaceEdit**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-in-place-edit&gt;` — حقل قابل للتعديل بالنقر. `value` يظهر كنص؛ عند النقر/التركيز يصبح
قابلاً للتحرير، Enter أو ضبابي يلتزم (وينطلق حدث `change` فقاعة مع `detail.value`)، و
Escape يرجع إلى القيمة السابقة للتحرير. `readonly` تعطيل التحرير. تغيير خارجي لـ `value`
ينعكس في الحقل بينما لا يتم تحريره.

## Example

```html
<instui-in-place-edit value="Course title"></instui-in-place-edit>
```
