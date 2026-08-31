[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drilldown

# Variable: drilldown

> `const` **drilldown**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`<instui-drilldown>` — a stateful, multi-level menu over the menu styles. Each level is a light-DOM
`[data-page="id"]` whose inner `.item`s are cloned into a shadow `.instui-menu`; an item with
`data-goto="id"` descends to that page and a synthesized Back row (or any `[data-back]` item)
returns. The light DOM is the data source only — with no `<slot>` it never renders, so shadow CSS
fully styles each panel. The `active` attribute reflects the current page and can be set to
navigate; a bubbling `navigate` event (`detail.page`) fires on every move. Drivable from light DOM
via Invoker Commands: `<button command="--goto" commandfor="dd-id" data-page="…">` descends and
`<button command="--back" commandfor="dd-id">` returns.

## Example

```html
<instui-drilldown active="root">
  <div data-page="root">
    <div class="item" data-goto="settings">Settings</div>
  </div>
  <div data-page="settings">
    <div class="item">Profile</div>
  </div>
</instui-drilldown>
```
