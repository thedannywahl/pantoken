[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# تابع: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Build a Panda preset from a token IR.

## پارامترها

### tokens

readonly [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

The IR (e.g. from `@pantoken/tokens`).

## مقدار بازگشتی

[`PandaPreset`](../interfaces/PandaPreset.md)

A preset object for Panda's `definePreset`.

## نمونه

**Build a preset from a custom IR**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
