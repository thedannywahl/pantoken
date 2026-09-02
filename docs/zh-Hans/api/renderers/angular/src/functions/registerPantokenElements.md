[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# 函数: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Register the pantoken custom elements (call once during app bootstrap).

## 返回值

`void`

## 示例

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
