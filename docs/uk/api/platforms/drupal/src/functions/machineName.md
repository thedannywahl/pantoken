[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Функція: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Параметри

### name

`string`

## Повертає

`string`

## Приклад

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
