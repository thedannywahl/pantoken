[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Funció: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Converteix un nom de visualització a un nom de màquina de Drupal (`lower_snake`).

## Paràmetres

### name

`string`

## Retorna

`string`

## Exemple

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
