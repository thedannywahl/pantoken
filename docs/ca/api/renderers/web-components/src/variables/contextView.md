[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / contextView

# Variable: contextView

> `const` **contextView**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-context-view&gt;` — una superfície de callout amb una cometa. L'host en si és un `[popover]` natiu (capa superior + descart lleuger), de manera que un botó `popovertarget`/`command` de DOM clar pot commutar-lo per id. Posicioneu-lo a prop del seu activador amb posicionament d'ancora CSS on es suporti; en cas contrari, se centra a la capa superior. El contingut va a la ranura per defecte.

## Example

```html
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
