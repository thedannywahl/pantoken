[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / modal

# Փոփոխական: modal

> `const` **modal**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-modal&gt;` — իրական `&lt;dialog&gt;`, այնպես որ այն ստանում է կենտրոնացման ընդգծում, Escape-ից-փակել, և
`::backdrop` անվճար։ `open` հատկանիշը գործարկում է `showModal()`/`close()`; բնիկ հրաժարում
(Escape կամ backdrop սեղմում) արտացոլվում է հետ հատկանիշին և վերախաղարկվում է որպես փուչ `close`
իրադարձություն։ Վարվում է թեղ DOM-ից Invoker Commands-ի միջոցով. 
`<button command="--show|--close|--toggle" commandfor="modal-id">`-ը միացնում է այն id-ով։ Բովանդակությունը փոխանցվում է
կանխադրված slot-ի մեջ։

## Օրինակ

```html
<button command="--show" commandfor="confirm">Delete…</button>
<instui-modal id="confirm">
  <h2>Delete this item?</h2>
  <button command="--close" commandfor="confirm">Cancel</button>
</instui-modal>
```
