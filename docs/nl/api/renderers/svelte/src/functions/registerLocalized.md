[pantoken](../../../../index.md) / [renderers/svelte/src](../index.md) / registerLocalized

# Function: registerLocalized()

> **registerLocalized**(`bundle`, `target?`, `options?`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Register `@pantoken/web-components` custom elements with locale-specific strings and direction.

Accepts a fully resolved [LocaleBundle](#) _or_ a raw BCP47 tag string. When a string is
passed, [makeStrings](#) derives weekday names via `Intl.DateTimeFormat` and all other strings
fall back to English; pass a bundle for full translations.

## Parameters

### bundle

`string` \| [`LocaleBundle`](#)

A [LocaleBundle](#) object, or a BCP47 tag (`"hu"`, `"ar"`, …).

### target?

`ElementRegistry`

The registry to define into (defaults to `globalThis.customElements`).

### options?

Passed through to `register()` (e.g. `prefix`, `only`).

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
