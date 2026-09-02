[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / machineName

# 函式: machineName()

> **machineName**(`name`): `string`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Convert a display name to a Drupal machine name (`lower_snake`).

## 參數

### name

`string`

## 回傳

`string`

## 範例

```ts
import { machineName } from "@pantoken/drupal";

machineName("Instructure"); // "instructure"
machineName("My Canvas Theme"); // "my_canvas_theme"
```
