[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Funkcja: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parametry

### name

`string`

## Zwraca

`string`

## Przykład

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
