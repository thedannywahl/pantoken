[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / icon

# Variable: icon

> `const` **icon**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-icon&gt;` — ներգծային SVG խորհրդանիշ pantoken պատկերային հավաքածուից։ `name` հատկանիշը ընտրում է
խորհրդանիշը, `size` (ցանկացած CSS երկարություն, կանխադրված `1em`) չափազնակում այն, `color` (ցանկացած CSS գույն) ստվերում այն, և
`margin` ավելացնում է դրա շուրջ հեռավորություն (InstUI հիմնաբառեր ինչպես `small`)։ Գործարկում է SVG-ն իր սեփական թեթև
DOM-ի մեջ, չափով/գույնով հյուսվածքի միջոցով՝ հյուսվածքի վրա, այնպես որ այն ժառանգում է `currentColor`-ը տեքստի նման։

## Example

```html
<instui-icon name="arrow-left" margin="small"></instui-icon>
<instui-icon name="star" size="1.5rem" color="gold" margin="small"></instui-icon>
```
