[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Συνάρτηση: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Παράμετροι

### name

`string`

## Επιστρέφει

`string`

## Παράδειγμα

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
