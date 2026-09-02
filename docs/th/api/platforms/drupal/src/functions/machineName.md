[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# ฟังก์ชัน: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## พารามิเตอร์

### name

`string`

## คืนค่า

`string`

## ตัวอย่าง

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
