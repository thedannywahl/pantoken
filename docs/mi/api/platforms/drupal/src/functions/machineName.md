[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Mahi: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Ngā Tawhā

### name

`string`

## Whakahokia

`string`

## Tauira

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
