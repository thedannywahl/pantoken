[pantoken](../../../../index.md) / [renderers/react-markdown/src](../index.md) / isColorValue

# फंक्शन: isColorValue()

> **isColorValue**(`value`): `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">बीटा</span>

True when a string is a standalone CSS color value (hex or a color function).

## पैरामीटर

### value

`string`

## वापसी

`boolean`

## उदाहरण

```ts
import { isColorValue } from "@pantoken/react-markdown";

isColorValue("#03893D"); // true
isColorValue("oklch(0.7 0.1 200)"); // true
isColorValue("hello"); // false
```
