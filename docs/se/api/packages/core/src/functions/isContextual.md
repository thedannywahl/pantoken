[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# Fušla: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Behta</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## Parametera

### value

`string`

## Gullii / Gávdnat

`boolean`

## Exempel

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
