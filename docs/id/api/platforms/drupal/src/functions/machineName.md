[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Fungsi: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parameter

### name

`string`

## Mengembalikan

`string`

## Contoh

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
