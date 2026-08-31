[pantoken](../../../../index.md) / prune-custom-props

# prune-custom-props

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

`@pantoken/plugin-prune-custom-props` — tree-shake չօգտագործված custom properties-ը կազմված
ստիլային թերթից:

pantoken-ի `@pantoken/css`-ը արտանետում է ամբողջ `--instui-*` token շարքը (≈1,800 icon data-URIs
ներառված): Համարիչ, որը կառուցված այդ շերտի վրա, բայց համակարգի միայն մի կտորը ձայնով նկարել, այլ կերպ
ամբողջ շարքը կոխել — ուստի ցանկացած այդպիսի համարիչ դա ուզում է: `var()`
ղերանցական (ոչ custom-property) հայտարարություններից սկսած, այն անցածորեն պահում է միայն custom
properties-ը որ փաստորեն հասանելի են, և հեռացնում է համապատասխան չօգտագործված `@property` գրանցումները:

Այն ինքնուրույն PostCSS plugin է (գործարկել այն ձեր սեփական PostCSS pipeline-ում): Factory-ը վերադարձներ
սովորական plugin օբյեկտ, այդ պատճառով այս մոդուլը ներմուծելը չի անեցներ runtime կախումներ — `postcss`-ը միայն
տիպ է:

## Example

```ts
import postcss from "postcss";
import { pruneCustomProps } from "@pantoken/plugin-prune-custom-props";
const out = postcss([pruneCustomProps()]).process(css, { from: undefined }).css;
```

## Variables

- [pruneCustomProps](variables/pruneCustomProps.md)

## References

### default

Վերանվանել և վերա-արտահանել [pruneCustomProps](variables/pruneCustomProps.md)
