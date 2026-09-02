[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toVectorDrawable

# Funksjon: toVectorDrawable()

> **toVectorDrawable**(`svg`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Convert an inline SVG to an Android VectorDrawable XML string. Stroke-based icons (Lucide) emit
`strokeColor`/`strokeWidth`; fill-based icons (Custom) emit `fillColor`.

## Parametere

### svg

`string`

Inline SVG markup.

### options?

[`VectorDrawableOptions`](../interfaces/VectorDrawableOptions.md) = `{}`

[VectorDrawableOptions](../interfaces/VectorDrawableOptions.md).

## Returnerer

`string`

The VectorDrawable XML.

## Eksempler

**A stroke-based (Lucide) icon emits strokeColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

const xml = toVectorDrawable(
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/></svg>',
);
// → <vector …> with android:strokeColor and android:pathData="M5 12h14"
```

**A fill-based (Custom) icon with a tint colour emits fillColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
  color: "#FF0374B5",
});
// → <vector …> with android:fillColor="#FF0374B5"
```
