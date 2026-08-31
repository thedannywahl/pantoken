[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/panda` — Instructure design-token preset Panda CSS-ի համար:

[toPandaPreset](functions/toPandaPreset.md)-ը փոխակերպում է ցանկացած IR; [pantokenPreset](variables/pantokenPreset.md)-ը պատրաստի `rebrand` նախածանց է:
Ներգրավել այն ձեր `panda.config.ts` `presets`-ի մեջ, և `_dark` պայմանը հետևում է pantoken-ի
`light-dark()` tokens-ներին ավտոմատ:

## Example

**panda.config.ts**

```ts
import { defineConfig } from "@pandacss/dev";
import { pantokenPreset } from "@pantoken/panda";
export default defineConfig({ presets: [pantokenPreset] });
// then: css({ color: "token(colors.color-text-base)" })
```

## Interfaces

- [PandaToken](interfaces/PandaToken.md)
- [PandaSemanticToken](interfaces/PandaSemanticToken.md)
- [PandaPreset](interfaces/PandaPreset.md)

## Type Aliases

- [PandaCategory](type-aliases/PandaCategory.md)

## Variables

- [pantokenPreset](variables/pantokenPreset.md)

## Functions

- [toPandaPreset](functions/toPandaPreset.md)

## References

### default

Վերանվանում և վերահանճարում [pantokenPreset](variables/pantokenPreset.md)
