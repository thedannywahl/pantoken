[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# Variabel: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

`&lt;instui-drawer-layout&gt;` — en sidelinje plus hovedindholdsområde. Attributten `open` afslører
linjen; `placement` (`start`|`end`) vælger siden. Kan styres fra lys DOM via Invoker-kommandoer:
`<button command="--toggle|--open|--close" commandfor="drawer-id">`. Indhold går i standardslotten;
linjen i `slot="tray"`. Interaktionerne skifter automatisk overlay-tilstand baseret på
`--pantoken-bp-md` tærsklen.

## Tilgængelighed

Indholdsruden bærer `role="region"`, der matcher InstUI's DrawerLayout; mærk den med `aria-label`/`aria-labelledby` når den omkringliggende kontekst ikke allerede navngiver den.

## Eksempel

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
