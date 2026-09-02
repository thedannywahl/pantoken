[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# 関数: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Register the pantoken custom elements (call once during app bootstrap).

## 戻り値

`void`

## 例

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
