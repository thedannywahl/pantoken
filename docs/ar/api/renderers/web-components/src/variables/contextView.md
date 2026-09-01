[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / contextView

# متغير: contextView

> `const` **contextView**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-context-view&gt;` — سطح نداء مع سهم. المضيف نفسه هو `[popover]` أصلي
(الطبقة العلوية + إغلاق خفيف)، لذلك يمكن لزر `popovertarget`/`command` في DOM الخفيف تبديله باستخدام المعرف.
ضعه بالقرب من المشغّل باستخدام تموضع مرساة CSS حيثما كان مدعومًا؛ وإلا فإنه يتمركز في
الطبقة العلوية. يوضع المحتوى في الفتحة الافتراضية.

## مثال

```html
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
