[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# फंक्शन: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## पैरामीटर

### value

`string`

## वापसी

`boolean`

## उदाहरण

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
