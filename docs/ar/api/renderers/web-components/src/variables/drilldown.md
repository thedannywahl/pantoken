[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drilldown

# Variable: drilldown

> `const` **drilldown**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-drilldown&gt;` — قائمة ذات حالة متعددة المستويات فوق أنماط القائمة. كل مستوى هو `[data-page="id"]` خفيف DOM
الذي يتم استنساخ `.item`s الداخلية فيه إلى shadow `.instui-menu`؛ عنصر بـ
`data-goto="id"` ينزل إلى تلك الصفحة وصف Back المركبة (أو أي عنصر `[data-back]`)
يعود. light DOM هو مصدر البيانات فقط — بدون `&lt;slot&gt;` لا يتم عرضه أبداً، لذلك shadow CSS
تنمط بالكامل كل لوحة. سمة `active` تعكس الصفحة الحالية ويمكن تعيينها للملاحة؛ حدث `navigate` فقاعة (`detail.page`) ينطلق في كل تحرك. قابلة للتشغيل من light DOM
عبر أوامر Invoker: `<button command="--goto" commandfor="dd-id" data-page="…">` ينزل و
`<button command="--back" commandfor="dd-id">` يعود.

## Example

```html
<instui-drilldown active="root">
  <div data-page="root">
    <div class="item" data-goto="settings">Settings</div>
  </div>
  <div data-page="settings">
    <div class="item">Profile</div>
  </div>
</instui-drilldown>
```
