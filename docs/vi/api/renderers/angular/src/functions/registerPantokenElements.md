[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# Hàm: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Register the pantoken custom elements (call once during app bootstrap).

## Trả về

`void`

## Ví dụ

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
