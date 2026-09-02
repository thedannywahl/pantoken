[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

`@pantoken/panda` — Instructure design-token preset Panda CSS-ի համար:

[toPandaPreset](functions/toPandaPreset.md)-ը փոխակերպում է ցանկացած IR; [pantokenPreset](variables/pantokenPreset.md)-ը պատրաստի `rebrand` նախածանց է:
Ներգրավել այն ձեր `panda.config.ts` `presets`-ի մեջ, և `_dark` պայմանը հետևում է pantoken-ի
`light-dark()` tokens-ներին ավտոմատ:

## Օրինակ

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## Ինտերֆեյսներ

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## Տիպային հոմանիշներ

- [PandaCategory](type-aliases/PandaCategory.md)

## Փոփոխականներ

- [pantokenPreset](variables/pantokenPreset.md)

## Ֆունկցիաներ

- [toPandaPreset](functions/toPandaPreset.md)

## Հղումներ

### default

Վերանվանում և վերահանճարում [pantokenPreset](variables/pantokenPreset.md)
