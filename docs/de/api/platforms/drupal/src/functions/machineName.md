[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Funktion: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parameter

### name

`string`

## Rückgabe

`string`

## Beispiel

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
