[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# Function: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Register the pantoken custom elements (call once during app bootstrap).

## Returns

`void`

## Example

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
