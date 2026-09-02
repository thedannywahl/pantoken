[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Ֆունկցիա: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ցուցադրման անունը փոխակերպել Drupal մեքենայական անվան (`lower_snake`)։

## Պարամետրեր

### name

`string`

## Վերադարձվող արժեք

`string`

## Օրինակ

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
