[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Swyddogaeth: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Paramedrau

### name

`string`

## Yn dychwelyd

`string`

## Enghraifft

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
