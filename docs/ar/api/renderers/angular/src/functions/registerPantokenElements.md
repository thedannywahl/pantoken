[pantoken](../../../../index.md) / [renderers/angular/src](../index.md) / registerPantokenElements

# دالة: registerPantokenElements()

> **registerPantokenElements**(): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

سجّل عناصر pantoken المخصصة (استدعِها مرة واحدة أثناء تهيئة التطبيق).

## القيم المرجعة

`void`

## مثال

```ts
import { registerPantokenElements } from "@pantoken/angular";
import "@pantoken/css";

registerPantokenElements(); // during app bootstrap
// Add CUSTOM_ELEMENTS_SCHEMA to the component/module that uses <instui-icon>.
```
