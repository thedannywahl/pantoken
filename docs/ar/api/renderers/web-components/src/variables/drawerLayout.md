[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# متغير: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">ألفا</span>

`&lt;instui-drawer-layout&gt;` — حاوية جانبية بالإضافة إلى منطقة المحتوى الرئيسية. السمة `open` تكشف الدرج؛ `placement` (`start`|`end`) تختار الجانب. يمكن التحكم بها من الـ light DOM عبر أوامر Invoker:
`<button command="--toggle|--open|--close" commandfor="drawer-id">`. يوضع المحتوى في الحاوية الافتراضية
slot؛ والدرج في `slot="tray"`. سلوك التفاعلات يبدل وضع التراكب تلقائيًا بناءً على عتبة
`--pantoken-bp-md`.

## سهولة الوصول

لوحة المحتوى تحمل `role="region"`، مما يطابق DrawerLayout الخاص بـ InstUI؛ وسمّها بـ `aria-label`/`aria-labelledby` عندما لا يكون السياق المحيط قد سمّاها بالفعل.

## مثال

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
