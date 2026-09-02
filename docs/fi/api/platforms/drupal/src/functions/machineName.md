[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Funktio: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parametrit

### name

`string`

## Palauttaa

`string`

## Esimerkki

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
