[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Hàm: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Tham số

### name

`string`

## Trả về

`string`

## Ví dụ

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
