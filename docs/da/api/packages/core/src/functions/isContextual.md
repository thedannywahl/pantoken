[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# Function: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sand når en værdi ikke kan være en typificeret `@property` initial-værdi (`var()` / `light-dark()`).

## Parameters

### value

`string`

## Returns

`boolean`

## Example

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)"); // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff"); // → false
```
