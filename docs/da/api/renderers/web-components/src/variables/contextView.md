[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / contextView

# Variable: contextView

> `const` **contextView**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-context-view&gt;` — en callout-overflade med en caret. Væerten selv er en indfødt `[popover]`
(øverste lag + let-afvisning), så en light-DOM `popovertarget`/`command` knap kan skifte den efter id.
Positioner den tæt på sin trigger med CSS anchor-positionering, hvor det understøttes; ellers centreres det i
det øverste lag. Indhold går i standard-slottet.

## Example

```html
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
