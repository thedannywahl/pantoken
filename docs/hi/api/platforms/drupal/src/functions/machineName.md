[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# फंक्शन: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## पैरामीटर

### name

`string`

## वापसी

`string`

## उदाहरण

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
