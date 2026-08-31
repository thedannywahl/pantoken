[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# Function: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Registri els elements personalitzats de pantoken (crideu una vegada durant l'inici de l'aplicació).

## Returns

`void`

## Example

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
