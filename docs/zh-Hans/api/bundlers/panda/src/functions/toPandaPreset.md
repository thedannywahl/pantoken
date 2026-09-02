[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# 函数: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Build a Panda preset from a token IR.

## 参数

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

## 返回值

[`PandaPreset`](../interfaces/PandaPreset.md)

A preset object for Panda's `definePreset`.

## 示例

**Build a preset from a custom IR**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
