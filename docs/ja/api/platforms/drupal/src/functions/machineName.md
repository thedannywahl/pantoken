[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# 関数: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## パラメーター

### name

`string`

## 戻り値

`string`

## 例

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
