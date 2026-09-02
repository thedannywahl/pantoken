[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / truncate

# Փոփոխական: truncate

> `const` **truncate**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Ալֆա</span>

`&lt;instui-truncate&gt;` — ամրացնում տեղավորված տեքստ ֆիքսված տողերի համար էլիպսիսի հետ: `lines`
ընդունում է դրական ամբողջ թիվ կամ `auto`: Թիվ սահմանում է `--lines` հատուկ հատկությունը ուղղակիորեն:
`auto` հաշվում է գծի հաշվարկ հյուսքի հասանելի բարձրությունից և կիրառում որ որ կերպ `--lines`:
Հեռացնել `lines` միայնակ գծի կտրուկի համար:

## Օրինակ

```html
<instui-truncate lines="2">A long description that will be clamped to two lines…</instui-truncate>
```
