[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# Function: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Sandt når en streng er en selvstændig CSS-farveværdi (hex eller en farvefunktion).

## Parameters

### value

`string`

## Returns

`boolean`

## Example

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
