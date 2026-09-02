[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# Function: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sniff the CSS `@property` `syntax` a concrete token should register under. Tokens Studio
`type`s don't map 1:1 to CSS syntax, so the value is inspected. Returns `"*"` (universal) for
anything that isn't a single, computationally-independent typed token.

## Parameters

### value

`string`

A concrete value (no `var()` / `light-dark()`).

## Returns

`string`

The `@property` syntax descriptor.

## Examples

**Typed single-token values**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("#03893D"); // → "<color>"
cssSyntaxForValue("2px");     // → "<length>"
cssSyntaxForValue("50%");     // → "<percentage>"
cssSyntaxForValue("400");     // → "<integer>"
```

**Font-relative units and complex values fall back to universal**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("1rem");                     // → "*" (rem isn't computationally independent)
cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
cssSyntaxForValue("currentColor");             // → "*"
```
