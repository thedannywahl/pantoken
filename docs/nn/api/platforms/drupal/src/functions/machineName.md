[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Funksjon: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parametrar

### name

`string`

## Returnerer

`string`

## Døme

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
