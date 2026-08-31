[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / registerLocalized

# Function: registerLocalized()

> **registerLocalized**(`bundle`, `target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Registra elements personalitzats `@pantoken/web-components` amb strings específics de la localitat i direcció.

Accepta un [LocaleBundle](#) completament resolt o una cadena d'etiqueta BCP47 bruta. Quan es passa una cadena,
[makeStrings](#) deriva noms de dies de la setmana via `Intl.DateTimeFormat` i totes les altres cadenes
esdevenien a l'anglès; passa un paquet per a traduccions completes.

## Parameters

### bundle

`string` \| [`LocaleBundle`](#)

Un objecte [LocaleBundle](#), o una etiqueta BCP47 (`"hu"`, `"ar"`, …).

### target?

`ElementRegistry`

El registre per a definir (per defecte a `globalThis.customElements`).

### options?

Passa a través de `register()` (p. ex. `prefix`, `only`).

#### prefix?

`string` \| `null`

#### only?

readonly `string`[]

## Returns

`void`

## Example

```ts
import { registerLocalized, hu } from "@pantoken/i18n";

registerLocalized(hu);
registerLocalized("ar"); // direction inferred from CANVAS_LOCALES
registerLocalized("x-custom", customElements, { prefix: "x" });
```
