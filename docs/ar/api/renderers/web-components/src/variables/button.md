[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / button

# Variable: button

> `const` **button**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-button&gt;` — `&lt;button&gt;` بأسلوب الرمز. ترسم السمة `variant` إلى معدِّل `-color-&lt;variant&gt;`
(`secondary`، `tertiary`، `success`، `danger`، `ai`، ...)؛ تضيف `margin` مسافة حول المضيف (كلمات رئيسية من InstUI مثل `small` / `medium large`); محتوى الفتحة هو التسمية.

وهو أيضاً معطِّل أصلي: `popovertarget` (مع `popovertargetaction` اختياري) يتبدل أي
`[popover]` خفيف DOM مثل `&lt;instui-context-view&gt;`، `&lt;instui-popover&gt;`، أو `&lt;instui-tray&gt;`، و
`command`/`commandfor` يقود المكونات القائمة على الأوامر (`&lt;instui-modal&gt;` مع `--show`/`--close`،
إلخ.). يتم إعادة توجيه المعرِّف إلى الزر الداخلي عبر معطِّل IDL، لذا يتم حله عبر حدود الظل وقد يشير إلى الأمام إلى عنصر معلَّن لاحقاً في الوثيقة.

## Example

```html
<instui-button variant="primary" margin="small">Save changes</instui-button>
<instui-button variant="danger" margin="small">Delete</instui-button>
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
