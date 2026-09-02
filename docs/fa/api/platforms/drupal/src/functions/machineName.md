[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# تابع: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## پارامترها

### name

`string`

## مقدار بازگشتی

`string`

## نمونه

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
