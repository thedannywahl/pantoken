[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# Function: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sniffer CSS `@property` `syntax` som et konkret token skal registreres under. Tokens Studio
`type` kortlægger ikke 1:1 til CSS-syntaks, så værdien inspiceres. Returnerer `"*"` (universal) for
alt der ikke er et enkelt, computermæssigt uafhængigt typificeret token.

## Parameters

### value

`string`

En konkret værdi (ingen `var()` / `light-dark()`).

## Returns

`string`

Syntaksbeskrivelsen `@property`.

## Examples

**Typificerede single-token-værdier**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("#03893D"); // → "<color>"
cssSyntaxForValue("2px"); // → "<length>"
cssSyntaxForValue("50%"); // → "<percentage>"
cssSyntaxForValue("400"); // → "<integer>"
```

**Skrifttyperelaterede enheder og komplekse værdier falder tilbage til universal**

```ts
import { cssSyntaxForValue } from "@pantoken/core";

cssSyntaxForValue("1rem"); // → "*" (rem isn't computationally independent)
cssSyntaxForValue("Lato, Helvetica, sans-serif"); // → "*"
cssSyntaxForValue("currentColor"); // → "*"
```
