[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# 함수: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## 매개변수

### name

`string`

## 반환값

`string`

## 예제

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
