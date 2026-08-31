[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / registerLocalized

# Function: registerLocalized()

> **registerLocalized**(`bundle`, `target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Registrer `@pantoken/web-components` brugerdefinerede elementer med lokalesproglige strenge og retning.

Accepterer et fuldt løst [LocaleBundle](#) _eller_ en rå BCP47-tag-streng. Når en streng
overgives, udleder [makeStrings](#) ugedagnavne via `Intl.DateTimeFormat`, og alle andre strenge
frafalder til engelsk; overgiv et bundle for fulde oversættelser.

## Parameters

### bundle

`string` \| [`LocaleBundle`](#)

Et [LocaleBundle](#)-objekt eller en BCP47-tag (`"hu"`, `"ar"`, …).

### target?

`ElementRegistry`

Registreringen der skal defineres i (standard `globalThis.customElements`).

### options?

Videregivet til `register()` (f.eks. `prefix`, `only`).

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
