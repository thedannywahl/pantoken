[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toVectorDrawable

# Function: toVectorDrawable()

> **toVectorDrawable**(`svg`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Konverter en inline SVG til en Android VectorDrawable XML-streng. Slag-baserede ikoner (Lucide) udsender
`strokeColor`/`strokeWidth`; fyldbaserede ikoner (Brugerdefinerede) udsender `fillColor`.

## Parameters

### svg

`string`

Inline SVG-markup.

### options?

[`VectorDrawableOptions`](../interfaces/VectorDrawableOptions.md) = `{}`

[VectorDrawableOptions](../interfaces/VectorDrawableOptions.md).

## Returns

`string`

VectorDrawable XML'en.

## Examples

**Et slag-baseret (Lucide) ikon udsender strokeColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

const xml = toVectorDrawable(
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/></svg>',
);
// → <vector …> with android:strokeColor and android:pathData="M5 12h14"
```

**Et fyldbaseret (Brugerdefineret) ikon med en tintfarve udsender fillColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
  color: "#FF0374B5",
});
// → <vector …> with android:fillColor="#FF0374B5"
```
