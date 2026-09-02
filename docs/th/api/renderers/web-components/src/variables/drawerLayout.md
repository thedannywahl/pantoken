[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# ตัวแปร: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">อัลฟา</span>

`&lt;instui-drawer-layout&gt;` — a side tray plus main content area. The `open` attribute reveals the
tray; `placement` (`start`|`end`) picks the side. Drivable from light DOM via Invoker Commands:
`<button command="--toggle|--open|--close" commandfor="drawer-id">`. Content goes in the default
slot; the tray in `slot="tray"`. The interactions behavior auto-toggles overlay mode based on the
`--pantoken-bp-md` threshold.

## การเข้าถึง

The content pane carries `role="region"`, matching InstUI's DrawerLayout; label it with `aria-label`/`aria-labelledby` when the surrounding context doesn't already name it.

## ตัวอย่าง

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
