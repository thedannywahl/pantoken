[pantoken](../../../../index.md) / [bundlers/panda/src](../index.md) / toPandaPreset

# دالة: toPandaPreset()

> **toPandaPreset**(`tokens`): [`PandaPreset`](../interfaces/PandaPreset.md)

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

بناء إعداد مسبق لـ Panda من IR للرموز.

## المعلمات

### tokens

للقراءة فقط [`Token`](../../../../packages/core/src/interfaces/Token.md)[]

الـ IR (على سبيل المثال من `@pantoken/tokens`).

## القيم المرجعة

[`PandaPreset`](../interfaces/PandaPreset.md)

كائن إعداد مسبق لـ `definePreset` الخاص بـ Panda.

## مثال

**بناء إعداد مسبق من IR مخصص**

```ts
import { defineConfig } from "@pandacss/dev";
import { toPandaPreset } from "@pantoken/panda";
import { byTheme } from "@pantoken/tokens";

const preset = toPandaPreset(byTheme("rebrand"));
export default defineConfig({ presets: [preset] });
```
