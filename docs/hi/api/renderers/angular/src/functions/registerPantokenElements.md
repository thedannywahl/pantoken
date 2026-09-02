[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# फंक्शन: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Register the pantoken custom elements (call once during app bootstrap).

## वापसी

`void`

## उदाहरण

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
