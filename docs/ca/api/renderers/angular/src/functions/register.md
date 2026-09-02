[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / register

# Funció: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Registri els elements personalitzats de pantoken. No-op quan no hi ha DOM (SSR / construcció), de manera que aquest mòdul
és segur d'importar a qualsevol lloc.

## Paràmetres

### target?

`ElementRegistry`

El registre per a definir (per defecte a `globalThis.customElements`).

### options?

`RegisterContextOptions` & `object`

`prefix` estableix el prefix de l'etiqueta, reflectint la capa CSS: passeu una cadena no buida com ara
  `x` per a `&lt;x-icon&gt;`. Un prefix sempre s'aplica (un nom d'element personalitzat ha de contenir un guió), de manera que un
  prefix omès, buit o nul retorna al valor per defecte `instui` (`&lt;instui-icon&gt;`). `only` limita
  el registre a un subconjunt dels noms base de `ELEMENTS` — les seves dependències de renderització imbricades es treuen automàticament,
  de manera que `{ only: ["date-time-input"] }` també defineix `date-input` i `calendar`. Omitir
  `only` per a registrar cada element (per defecte).

## Retorna

`void`

## Exemple

```ts
import { register } from "@pantoken/web-components";
import "@pantoken/css"; // defines the --instui-* custom properties the elements read

register(); // <instui-button>, <instui-icon>, …
register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
register(customElements, { only: ["button", "alert"] }); // just those two
register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
```
