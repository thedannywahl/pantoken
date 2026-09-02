[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / inPlaceEdit

# متغير: inPlaceEdit

> `const` **inPlaceEdit**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-in-place-edit&gt;` — حقل قابل للنقر للتحرير. `value` يظهر كنص؛ عند النقر/التركيز يصبح
قابلًا للتحرير، الضغط على Enter أو فقدان التركيز يحفظ التغييرات (ويطلق حدثًا متدافعًا `change` مع `detail.value`)، و
Escape يعيد القيمة إلى ما كانت عليه قبل التحرير. `readonly` يعطل التحرير. تغيّر خارجي في `value`
ينعكس في الحقل طالما أنه لا يُحرر.

## مثال

```html
<instui-in-place-edit value="Course title"></instui-in-place-edit>
```
