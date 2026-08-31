[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / register

# Function: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Գրանցել pantoken custom elements-ները: No-op, երբ DOM չկա (SSR / build), ուստի այս module-ը
անվտանգ է ներմուծել ցանկացած տեղ:

## Parameters

### target?

`ElementRegistry`

Registry, որում սահմանել (լռելյայն՝ `globalThis.customElements`):

### options?

`RegisterContextOptions` & `object`

`prefix` tag prefix-ը սահմանում է՝ արտացոլելով CSS layer-ը. ոչ դատարկ string, ինչպես
`x`, անցկացրեք `&lt;x-icon&gt;`-ի համար: Prefix միշտ կիրառվում է (custom-element անունը պետք է պարունակի հիֆեն), ուստի բաց
թողած, դատարկ կամ nullish prefix-ը վերադառնում է `instui`-ի լռելյայնին (`&lt;instui-icon&gt;`): `only` սահմանափակում
գրանցումը `ELEMENTS` base անունների subset-ի վրա — դրա nested render կախվածությունները ինքնաբերար ներառված են,
ուստի `{ only: ["date-time-input"] }`-ը նաև սահմանում է `date-input`-ը և `calendar`-ը: Բաց թողեք
`only`-ը բոլոր elements-ը գրանցել (լռելյայն):

## Returns

`void`

## Example

```ts
import { register } from "@pantoken/web-components";
import "@pantoken/css"; // defines the --instui-* custom properties the elements read

register(); // <instui-button>, <instui-icon>, …
register(customElements, { prefix: "x" }); // <x-button>, <x-icon>, …
register(customElements, { only: ["button", "alert"] }); // just those two
register(customElements, { locale: "hu", strings: { back: "Vissza" } }); // localized
```
