[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# Փոփոխական: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-drawer-layout&gt;` — կողային դարակ և հիմնական բովանդակության տարածք։ `open` հատկանիշը բացահայտում է
դարակը; `placement` (`start`|`end`) ընտրում է կողմը։ Վարվում է թեթև DOM-ից Invoker Commands-ի միջոցով.
`<button command="--toggle|--open|--close" commandfor="drawer-id">`։ Բովանդակությունը փոխանցվում է կանխադրված
slot-ի մեջ; դարակը `slot="tray"`-ի մեջ։ Փոխազդեցության վարքը ինքնաբերաբար միացնում է ծածկույթի ռեժիմը հիման վրա
`--pantoken-bp-md` շեմ։

## Մուտքականություն

Բովանդակության պահպանը կրում է `role="region"`, համընկնում InstUI-ի DrawerLayout-ի հետ; պիտակավորել այն `aria-label`/`aria-labelledby`-ով, երբ շրջապատական համատեքստը դեռ այն չի անվանել։

## Օրինակ

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
