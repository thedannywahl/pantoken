[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / tooltip

# Variable: tooltip

> `const` **tooltip**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-tooltip&gt;` — يلف محفزاً مدرجاً ويعرض فقاعة `.tip` (من سمة `tip`)
عند الوضع فوقه/التركيز. يعيّن `placement` إلى `-placement-&lt;value&gt;` (مثل `bottom`، `end`); تحكم `show-delay` و
`hide-delay` (ms، الافتراضي 0) بالكشف/الإخفاء، ويقفل Escape عليها. JS يملك التوقيت:
قفل `.-show`-gated `!important` يحايد الكشف التلقائي الخالص من CSS `:hover`/`:focus-within`
بحيث يتم تطبيق التأخير بالفعل.

## Example

```html
<instui-tooltip tip="Placement bottom" placement="bottom" show-delay="200">
  <button class="instui-button -color-secondary">Hover me</button>
</instui-tooltip>
```
