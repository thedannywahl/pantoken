[pantoken](../../../../index.md) / [packages/core/src](../index.md) / isContextual

# Feidhm: isContextual()

> **isContextual**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Béite</span>

True when a value cannot be a typed `@property` initial-value (`var()` / `light-dark()`).

## Paraiméadair

### value

`string`

## Tuairisceáin

`boolean`

## Sampla

```ts
import { isContextual } from "@pantoken/core";

isContextual("var(--x)");            // → true
isContextual("light-dark(#fff, #000)"); // → true
isContextual("#fff");                // → false
```
