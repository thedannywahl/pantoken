[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / dateInput

# वैरिएबल: dateInput

> `const` **dateInput**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

`&lt;instui-date-input&gt;` — a text field plus a calendar dropdown. The trigger toggles a `[popover]`
through the built-in `toggle-popover` Invoker Command (a click fallback covers browsers without the
API); picking a day in the nested `&lt;instui-calendar&gt;` fills the field (ISO `yyyy-mm-dd`), closes the
popover, and emits a composed, bubbling `change` (`detail.value`). Typing a valid `yyyy-mm-dd` (or
clearing it) and committing on the input's `change` works too. `value` is the ISO date, `label` the
accessible name (default `Date`), and `placeholder` the hint (default `yyyy-mm-dd`).

## उदाहरण

```html
<instui-date-input value="2026-07-08" label="Due date"></instui-date-input>
```
