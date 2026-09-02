[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Funktion: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Konverter et visnavn til et Drupal-maskinenavn (`lower_snake`).

## Parametre

### name

`string`

## Returnerer

`string`

## Eksempel

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
