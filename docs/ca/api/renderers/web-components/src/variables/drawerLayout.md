[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / drawerLayout

# Variable: drawerLayout

> `const` **drawerLayout**: [`ElementDefinition`](../interfaces/ElementDefinition.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Alfa</span>

`&lt;instui-drawer-layout&gt;` — una safata lateral més una zona de contingut principal. L'atribut `open` revela la safata; `placement` (`start`|`end`) escull el costat. Controlable des del DOM lleuger mitjançant ordres d'Invocador: `<button command="--toggle|--open|--close" commandfor="drawer-id">`. El contingut va a la ranura per defecte; la safata a `slot="tray"`. El comportament de les interaccions commuta automàticament el mode de superposició basat en el llindar `--pantoken-bp-md`.

## Accessibilitat

El panell de contingut porta `role="region"`, coincidint amb DrawerLayout d'InstUI; etiqueta-ho amb `aria-label`/`aria-labelledby` quan el context circumdant no ho ha anomenat ja.

## Exemple

```html
<button command="--toggle" commandfor="drawer">Toggle panel</button>
<instui-drawer-layout id="drawer" open placement="start">
  <nav slot="tray">…</nav>
  <article>Main content</article>
</instui-drawer-layout>
```
