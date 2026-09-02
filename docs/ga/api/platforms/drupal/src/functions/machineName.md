[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Feidhm: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Paraiméadair

### name

`string`

## Tuairisceáin

`string`

## Sampla

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
