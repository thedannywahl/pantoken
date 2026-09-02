[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# Funksjon: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

True when a string is a standalone CSS color value (hex or a color function).

## Parametere

### value

`string`

## Returnerer

`boolean`

## Eksempel

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
