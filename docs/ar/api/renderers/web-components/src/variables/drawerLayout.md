[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# Variable: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-drawer-layout&gt;` — درج جانبي بالإضافة إلى منطقة محتوى رئيسية. سمة `open` تكشف
الدرج؛ `placement` (`start`|`end`) يختار الجانب. قابلة للتشغيل من light DOM عبر أوامر Invoker:
`<button command="--toggle|--open|--close" commandfor="drawer-id">`. يذهب المحتوى إلى الفتحة الافتراضية؛
الدرج في `slot="tray"`. سلوك التفاعلات يبدّل تلقائياً وضع overlay بناءً على
حد `--pantoken-bp-md`.

## Accessibility

جزء المحتوى يحمل `role="region"`، مطابقاً DrawerLayout الخاص بـ InstUI؛ قم بتسميته باستخدام `aria-label`/`aria-labelledby` عندما لا يكون السياق المحيط قد سماه بالفعل.

## Example

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
