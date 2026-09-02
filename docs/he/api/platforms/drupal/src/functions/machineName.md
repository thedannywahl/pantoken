[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# פונקציה: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## פרמטרים

### name

`string`

## מחזיר

`string`

## דוגמה

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
