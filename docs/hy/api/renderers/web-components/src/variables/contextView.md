[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / contextView

# Variable: contextView

> `const` **contextView**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-context-view&gt;` — կանչ մակերեսը շաղ-կետով: Հյուսնիկն ինքն հայրենի `[popover]` է (վերին շերտ + թեթևակի-ջնջել), ուստի թեթևակի-DOM `popovertarget`/`command` կոճակն կարող է այն անջատել id-ով: Տեղադրեք այն իր ձգձգային մոտ CSS կոշկ դիրքավորմամբ, որտեղ աջակցվում է; այլապես այն կենտրոնավորվում է վերին շերտում: Բովանդակությունը լռելյալ բաղադրիչի մեջ գնում է:

## Example

```html
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
