[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / pages

# Variable: pages

> `const` **pages**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-pages&gt;` — ցույց է տալիս մեկ տեղավորված `[data-page]` պանել միաժամանակ, փոխանակելով View Transitions API-ի հետ, երբ հասանելի է (պարզ անջատիչ հակառակ դեպքում): `push(id)`/`back()` պահում են պատմության շտաբել; `active` ատրիբուտը արտացոլում է ընթացիկ էջը և կարող է սահմանվել նավիգացիայի համար, և փուչիկ `change` իրադարձություն (`detail.page`) հրդեհում է յուրաքանչյուր փոխանակության համար: Վարվում է թեթև DOM-ից Invoker Commands-ի միջոցով:
`<button command="--push" commandfor="pages-id" data-page="…">` և
`<button command="--back" commandfor="pages-id">`:

## Example

```html
<instui-pages active="one">
  <section data-page="one">
    First <button command="--push" commandfor="p" data-page="two">Next</button>
  </section>
  <section data-page="two">Second <button command="--back" commandfor="p">Back</button></section>
</instui-pages>
```
