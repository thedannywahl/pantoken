[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / contextView

# Değişken: contextView

> `const` **contextView**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-context-view&gt;` — a callout surface with a caret. The host itself is a native `[popover]`
(top layer + light-dismiss), so a light-DOM `popovertarget`/`command` button can toggle it by id.
Position it near its trigger with CSS anchor positioning where supported; otherwise it centres in
the top layer. Content goes in the default slot.

## Örnek

```html
<instui-button popovertarget="cv">Details</instui-button>
<instui-context-view id="cv">More about this item.</instui-context-view>
```
