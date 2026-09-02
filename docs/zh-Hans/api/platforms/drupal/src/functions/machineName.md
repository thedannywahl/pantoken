[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# 函数: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## 参数

### name

`string`

## 返回值

`string`

## 示例

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
