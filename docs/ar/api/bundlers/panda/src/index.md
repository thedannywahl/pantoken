[pantoken](../../../index.md) / panda

# panda

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

`@pantoken/panda` — مسبقة رمز التصميم الخاصة بـ Instructure لـ Panda CSS.

[toPandaPreset](functions/toPandaPreset.md) يحول أي IR؛ [pantokenPreset](variables/pantokenPreset.md) هو الإعداد المسبق الجاهز `rebrand`.
قم بنشره في `panda.config.ts` `presets` الخاص بك، وتتبع شرط `_dark` رموز pantoken
`light-dark()` تلقائياً.

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

إعادة تسمية وإعادة تصدير [pantokenPreset](variables/pantokenPreset.md)
