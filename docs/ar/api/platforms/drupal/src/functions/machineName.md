[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# دالة: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

تحويل اسم العرض إلى اسم آلة دروبال (`lower_snake`).

## المعلمات

### name

`string`

## القيم المرجعة

`string`

## مثال

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
