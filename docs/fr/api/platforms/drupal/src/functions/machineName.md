[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Fonction: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Paramètres

### name

`string`

## Renvoie

`string`

## Exemple

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
