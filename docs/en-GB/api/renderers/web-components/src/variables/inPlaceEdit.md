[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / inPlaceEdit

# Variable: inPlaceEdit

> `const` **inPlaceEdit**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-in-place-edit&gt;` — a click-to-edit field. `value` shows as text; on click/focus it becomes
editable, Enter or blur commits (and fires a bubbling `change` event with `detail.value`), and
Escape reverts to the pre-edit value. `readonly` disables editing. An external `value` change
reflects into the field while it isn't being edited.

## Example

```html
<instui-in-place-edit value="Course title"></instui-in-place-edit>
```
