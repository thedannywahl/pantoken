[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Fonksiyon: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Parametreler

### name

`string`

## Döndürür

`string`

## Örnek

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
