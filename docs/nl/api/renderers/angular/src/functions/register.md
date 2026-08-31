[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / register

# Function: register()

> **register**(`target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Register the pantoken custom elements. No-op when there is no DOM (SSR / build), so this module
is safe to import anywhere.

## Parameters

### target?

`ElementRegistry`

The registry to define into (defaults to `globalThis.customElements`).

### options?

`RegisterContextOptions` & `object`

`prefix` sets the tag prefix, mirroring the CSS layer: pass a non-empty string like
`x` for `<x-icon>`. A prefix is always applied (a custom-element name must contain a hyphen), so an
omitted, empty, or nullish prefix falls back to the default `instui` (`<instui-icon>`). `only` limits
registration to a subset of the `ELEMENTS` base names — its nested render dependencies are pulled in
automatically, so `{ only: ["date-time-input"] }` also defines `date-input` and `calendar`. Omit
`only` to register every element (the default).

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
