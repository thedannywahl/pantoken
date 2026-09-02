[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Functie: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimenteel</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parameters

### name

`string`

## Retourneert

`string`

## Voorbeeld

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
