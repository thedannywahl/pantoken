[pantoken](../../../../index.md) / [packages/core/src](../index.md) / cssSyntaxForValue

# 함수: cssSyntaxForValue()

> **cssSyntaxForValue**(`value`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">베타</span>

Sniff the CSS `@property` `syntax` a concrete token should register under. Tokens Studio
`type`s don't map 1:1 to CSS syntax, so the value is inspected. Returns `"*"` (universal) for
anything that isn't a single, computationally-independent typed token.

## 매개변수

### value

`string`

A concrete value (no `var()` / `light-dark()`).

## 반환값

`string`

The `@property` syntax descriptor.

## 예제들

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
