[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

`@pantoken/panda` — إعداد مُسبق لرموز التصميم Instructure لـ Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) يحول أي IR؛ [pantokenPreset](variables/pantokenPreset.md) هو الإعداد المُسبق الجاهز `rebrand`.
انشره في `panda.config.ts` `presets` الخاص بك، وتقوم حالة `_dark` بتتبع رموز `light-dark()` الخاصة بـ pantoken تلقائيًا.

## مثال

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## واجهات

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## أسماء أنواع مستعارة

- [PandaCategory](type-aliases/PandaCategory.md)

## المتغيرات

- [pantokenPreset](variables/pantokenPreset.md)

## الدوال

- [toPandaPreset](functions/toPandaPreset.md)

## المراجع

### default

يعيد تسمية ويُعيد تصدير [pantokenPreset](variables/pantokenPreset.md)
