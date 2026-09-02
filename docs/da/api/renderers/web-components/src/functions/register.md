[pantoken](../../../../index.md) / [renderers/web-components/src](../index.md) / register

# Funktion: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Alpha</span>

Registrer pantoken-brugerdefinerede elementer. No-op når der ikke er DOM (SSR / build), så dette modul
er sikkert at importere hvor som helst.

## Parametre

### target?

[`ElementRegistry`](../interfaces/ElementRegistry.md) \| `undefined`

Registreringen der skal defineres i (standard `globalThis.customElements`).

### options?

[`RegisterContextOptions`](../interfaces/RegisterContextOptions.md) & `object` = `{}`

`prefix` indstiller tag-præfikset, som afspejler CSS-laget: send en ikke-tom streng som
  `x` for `&lt;x-icon&gt;`. Et præfiks anvendes altid (et brugerdefineret elementnavn skal indeholde en bindestreg), så et
  udeladt, tomt eller null-præfiks falder tilbage til standard `instui` (`&lt;instui-icon&gt;`). `only` begrænser
  registreringen til en delmængde af `ELEMENTS` basisnavne — dets indlejrede renderingsafhængigheder trækkes ind
  automatisk, så `{ only: ["date-time-input"] }` definerer også `date-input` og `calendar`. Udelad
  `only` for at registrere alle elementer (standard).

## Returnerer

`void`

## Eksempel

```ts
import { register } from "@pantoken/web-components";
import "@pantoken/css"; // defines the --instui-* custom properties the elements read

register(); // <instui-button>, <instui-icon>, …
register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
register(customElements, { only: ["button", "alert"] }); // just those two
register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
```
