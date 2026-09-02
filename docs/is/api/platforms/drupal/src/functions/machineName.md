[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Fall: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Færibreytur

### name

`string`

## Skilar

`string`

## Dæmi

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
