[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / registerLocalized

# Function: registerLocalized()

> **registerLocalized**(`bundle`, `target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Գրանցեք `@pantoken/web-components` հատուկ տարրերը լոկալ-հատուկ տողերով և ուղղությամբ:

Ընդունում է ամբողջապես լուծված [LocaleBundle](#) կամ հում BCP47 թեգի տող: Երբ տողը փոխանցվում է,
[makeStrings](#)-ը պահանջում է շաբաթվա օրերի անունները `Intl.DateTimeFormat`-ի միջոցով, և բոլոր մյուս տողերը
վերադառնում են Անգլերեն. փոխանցեք փաթեթ լիակատար թարգմանման համար:

## Parameters

### bundle

`string` \| [`LocaleBundle`](#)

[LocaleBundle](#) օբյեկտ, կամ BCP47 թեգ (`"hu"`, `"ar"`, …):

### target?

`ElementRegistry`

Registry, որում սահմանել (լռելյայն՝ `globalThis.customElements`):

### options?

Փոխանցվում է `register()`-ին (օ.ա. `prefix`, `only`):

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
