[pantoken](../../../../index.md) / [packages/core/src](../index.md) / toVectorDrawable

# Function: toVectorDrawable()

> **toVectorDrawable**(`svg`, `options?`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Converteix un SVG en línia en una cadena XML VectorDrawable d'Android. Les icones basades en traç (Lucide) emeten
`strokeColor`/`strokeWidth`; les icones basades en farciment (Personalitzat) emeten `fillColor`.

## Parameters

### svg

`string`

Marcat SVG en línia.

### options?

[`VectorDrawableOptions`](../interfaces/VectorDrawableOptions.md) = `{}`

[VectorDrawableOptions](../interfaces/VectorDrawableOptions.md).

## Returns

`string`

El VectorDrawable XML.

## Examples

**Una icona basada en traç (Lucide) emet strokeColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

const xml = toVectorDrawable(
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
    '<path d="M5 12h14"/></svg>',
);
// → <vector …> with android:strokeColor and android:pathData="M5 12h14"
```

**Una icona basada en farciment (Personalitzat) amb un color de tint emet fillColor**

```ts
import { toVectorDrawable } from "@pantoken/core";

toVectorDrawable('<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>', {
  color: "#FF0374B5",
});
// → <vector …> with android:fillColor="#FF0374B5"
```
