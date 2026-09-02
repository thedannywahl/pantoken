[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Fušla: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parametera

### name

`string`

## Gullii / Gávdnat

`string`

## Exempel

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
