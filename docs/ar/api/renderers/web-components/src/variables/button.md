[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / button

# متغير: button

> `const` **button**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-button&gt;` — نمط رمز `&lt;button&gt;`. سمة `variant` تُطابق المُعدِّل `-color-&lt;variant&gt;`
(`secondary`, `tertiary`, `success`, `danger`, `ai`, …); `margin` يضيف تباعدًا حول
المضيف (كلمات مفتاحية في InstUI مثل `small` / `medium large`); المحتوى المزوَّد في الشق هو التسمية.

وهو أيضًا مُشغِّل أصلي: `popovertarget` (مع `popovertargetaction` اختياري) يبدّل أي
light-DOM `[popover]` مثل `&lt;instui-context-view&gt;`, `&lt;instui-popover&gt;`, أو `&lt;instui-tray&gt;`، و
`command`/`commandfor` تُشغِّل المكونات القائمة على الأوامر (`&lt;instui-modal&gt;` مع `--show`/`--close`,
إلخ). يتم تمرير id إلى الزر الداخلي عبر invoker IDL، لذا فإنه يحل عبر حد الظل وقد يشير إلى عنصر يتم إعلانه لاحقًا في المستند.

## مثال

```html
<instui-button variant="primary" margin="small">Save changes</instui-button>
<instui-button variant="danger" margin="small">Delete</instui-button>
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
