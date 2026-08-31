[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / contextView

# Variable: contextView

> `const` **contextView**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-context-view&gt;` — سطح اقتباس مع قسّاس. المضيف نفسه هو `[popover]` أصلي
(الطبقة العلوية + إقالة خفيفة)، لذا يمكن لزر `popovertarget`/`command` خفيف DOM تبديله بالمعرِّف.
ضعه بالقرب من معطِّله باستخدام تحديد مرساة CSS حيث يكون مدعوماً؛ وإلا فإنه يتمركز في
الطبقة العلوية. يذهب المحتوى في الفتحة الافتراضية.

## Example

```html
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
