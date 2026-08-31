[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Function: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Ցուցադրման անունը փոխակերպել Drupal մեքենայական անվան (`lower_snake`)։

## Parameters

### name

`string`

## Returns

`string`

## Example

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
