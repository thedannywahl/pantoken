[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# वैरिएबल: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">अल्फा</span>

`&lt;instui-drawer-layout&gt;` — a side tray plus main content area. The `open` attribute reveals the
tray; `placement` (`start`|`end`) picks the side. Drivable from light DOM via Invoker Commands:
`<button command="--toggle|--open|--close" commandfor="drawer-id">`. Content goes in the default
slot; the tray in `slot="tray"`. The interactions behavior auto-toggles overlay mode based on the
`--pantoken-bp-md` threshold.

## एक्सेसिबिलिटी

The content pane carries `role="region"`, matching InstUI's DrawerLayout; label it with `aria-label`/`aria-labelledby` when the surrounding context doesn't already name it.

## उदाहरण

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
