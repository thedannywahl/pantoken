[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# Функция: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## Параметры

### name

`string`

## Возвращаемое значение

`string`

## Пример

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
