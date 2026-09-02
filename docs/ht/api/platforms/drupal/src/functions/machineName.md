[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Fonksyon: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Paramèt

### name

`string`

## Retounen

`string`

## Egzanp

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
