[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# Fonction: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Register the pantoken custom elements (call once during app bootstrap).

## Renvoie

`void`

## Exemple

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
