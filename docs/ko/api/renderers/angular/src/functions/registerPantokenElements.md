[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# 함수: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Register the pantoken custom elements (call once during app bootstrap).

## 반환값

`void`

## 예제

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
