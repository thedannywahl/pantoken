[pantoken](../../../../index.md) / [renderers/tinymce/src](../index.md) / CssDocEntry

# Ինտերֆեյս: CssDocEntry

Մեկ փաստաթղթավորված CSS գրառում: դրա բազային դաս գումարած ամեն ինչ, որ ստացված CSS-ից + doc հաղորդակցություն:

## Առանձնահատկություններ

### name

> **name**: `string`

Գրառման անունը `@component`/`@utility`/`@rule`/`@declaration`/`@name`-ից, օր. `button`:

***

### kind

> **kind**: `CssRecordKind`

Ի՞նչ տեսակի CSS մակերեսը փաստաթղթավորում է այս (լռելյայն `component`):

***

### className

> **className**: `string`

Բազային CSS ընտրակ — դաս (`.button`), հատկություն (`[data-layout="x"]`), ID (`#foo`),
կամ shadow-DOM pseudo (`:host`) — եզրակացրած առաջին մերկ-դաս կանոնից կամ հստակ սահմանված
`@selector`-ի միջոցով: Միշտ ոչ դատարկ (վերադարձ `.${name}`-ին, երբ հետևածածում ձախողվում է):

***

### summary?

> `optional` **summary?**: `string`

Մեկ տողի ամփոփում `@summary`-ից:

***

### remarks?

> `optional` **remarks?**: `string`

Ընդլայնված տեքստ `@remarks`-ից:

***

### privateRemarks?

> `optional` **privateRemarks?**: `string`

Միայն ներքին տեքստ `@privateRemarks`-ից (արտահանիչները կարող են դա բաց թողնել հանրային արդյունքից):

***

### releaseStage?

> `optional` **releaseStage?**: `CssReleaseStage`

Հանգրվածքային փուլ modifier դրոշ tag-ից (`@alpha`/`@beta`/`@experimental`/`@internal`/`@public`):

***

### since?

> `optional` **since?**: `string`

Ներդրված տարբերակ, `@since`-ից:

***

### group?

> `optional` **group?**: `string`

Փաստաթղթավորման խումբ/կատեգորիա, `@group`/`@category`-ից:

***

### accessibility?

> `optional` **accessibility?**: `string`

Մատչելիության ուղեցույց, `@a11y`/`@accessibility`-ից:

***

### global?

> `optional` **global?**: `boolean`

Սահմանել, երբ այս գրառումը կրում է `@global` tag — դրա փոփոխատկեր (և per-modifier `@global` դրոշ)
կիրառվում են ցանկացած component/layout/rule/declaration-ի համար, ոչ միայն այս գրառման բազային դասի համար: Օգտագործվում է
ստուգման և սպառման ստուգումների ժամանակ՝ փոփոխատ համընկնումները համընդհանուր լուծելու համար:

***

### modifiers

> **modifiers**: `CssModifier`[]

AST-ամբօ փոփոխատկերներ, ծանուցված `@modifier` տեքստով, որտեղ հեղինակած:

***

### parts

> **parts**: `CssPart`[]

AST-ամբօ ենթ-վեկ մասեր (դաս-հիմնված), ծանուցված `@part` տեքստով, որտեղ հեղինակած:

***

### shadowParts

> **shadowParts**: `CssPart`[]

Shadow-DOM բացահայտ մասեր (`::part(name)`), `@csspart`-ից կամ `::part()` ընտրակից:

***

### pseudoElements

> **pseudoElements**: `CssPseudoElement`[]

Բնական pseudo-վեկ-ներ, որ component-ը ոճավորում է (`::before`, `::marker`, …), `@pseudo`-ից կամ ընտրակից:

***

### states

> **states**: `CssState`[]

Վիճակներ, որոնց component-ը պատասխանում է, `@cssstate`-ից, `:state()`-ից, pseudo-դասերից կամ state դասերից:

***

### slots

> **slots**: `CssSlot`[]

Անվանված ստորդրումներ, որ component shell-ը բացահայտում է, `@slot`-ից:

***

### elements?

> `optional` **elements?**: `CssElementConstraints`

Թույլատրված HTML վեկեր `@element`-ից (լռելյայն + ընտական անվանված պրոֆիլներ):

***

### todos

> **todos**: `string`[]

Ներքին to-do նշումներ, `@todo` tag-ներից և `/* @todo … */` ինտեգրել հաղորդակցությունից: Մշակման նշումներ,
ոչ հանրային API — արտահանիչները կարող են դրանք բաց թողնել (ինչպես [CssDocEntry.privateRemarks](#privateremarks)):

***

### cssPropertiesConsumed

> **cssPropertiesConsumed**: `CssTokenConsumed`[]

Դիզայն token-ներ, որ այս component-ը սպառում է. յուրաքանչյուր `--*` կերպական հատկություն, որ հղում ստեղծում է `var(...)`-ի միջոցով
դրա կանոնների վերմուծ, յուրաքանչյուրը ծանուցված `@tokens` տեքստով, որտեղ հեղինակած (և ներառյալ ցանկացած `@tokens`-հայտարար
token, որ բառացի չի հայտնաբերվել `var()`-ի միջոցով):

***

### cssPropertiesDeclared

> **cssPropertiesDeclared**: `CssPropertyDeclared`[]

Կերպական հատկություններ, որ այս component-ը հայտարար է (`@property`) կամ փաստաթղթավորում է (`@cssproperty`):

***

### functions

> **functions**: `CssFunction`[]

CSS կերպական ֆունկցիաներ (`@function`), որ այս component-ը սահմանում է:

***

### animations

> **animations**: `CssAnimation`[]

Շարժումներ (`@keyframes`), որ այս component-ը բացահայտում է:

***

### layers

> **layers**: `CssLayer`[]

Կասկադային շերտեր (`@layer`), որոնցում այս component-ը մասնակցում է:

***

### conditions

> **conditions**: `CssCondition`[]

Պայմանական-աջակցություն բլոկներ (`@container`/`@supports`/`@media`), որոնց տակ կանոնները նստում են:

***

### examples

> **examples**: `string`[]

`@example` բլոկներ, բառ-բառ:

***

### structure?

> `optional` **structure?**: `StructureNode`[]

Հեղինակած `@structure` վեկ ծառ (վերին-մակարդակ հանգույցներ), երբ առկա է: Երբ `@structure` մարմինը
օգտագործում է `@variant` բլոկներ (տես [structureVariants](#structurevariants)), սա պահում է միայն առաջին տարբերակի հանգույցներ,
եղետ-համատեղ հետ ցանկացած ծածկագիր, որը չի թարմացվել `structureVariants` կարդալու համար:

***

### structureVariants?

> `optional` **structureVariants?**: `StructureVariant`[]

Այլընտրական DOM ձևերը այս component-ի համար, երբ հեղինակած `@structure` մարմինը պարունակում է մեկ կամ
ավելի վերին-մակարդակ `@variant` բլոկներ — բացակա մեկ, ոչ-տարբերակ կառուցվածքի տիպական դեպքի համար:

***

### structureDescription?

> `optional` **structureDescription?**: `string`

Ընտական տեքստ նկարագրում, որ առաջ է բերում `@structure` մարմինը, երբ հեղինակած:

***

### demo?

> `optional` **demo?**: `string`

`@demo &lt;spec&gt;` (օ.՝ `self:button`), երբ հեղինակած:

***

### deprecated?

> `optional` **deprecated?**: `string`

Component-մակարդակի կրկնավիճակ փոխարինման տեքստ, երբ հեղինակած (`@deprecated` tag-ի փաստարկը):

***

### see

> **see**: `string`[]

`@see &lt;ref&gt;` խաչ-հղումներ:

***

### usage?

> `optional` **usage?**: `string`

Օգտագործման տեքստ `@usage`-ից — ինչպես ներառել stylesheet-ը / օգտագործել component-ը:

***

### annotations

> **annotations**: `CssAnnotation`[]

Տեղական ծանուցում ցանկի շարքերը `@annotations`-ից, հեղինակ կարգով:

***

### refs

> **refs**: `number`[]

Տեղական ծանուցում հղումներ `@ref`-ից, հեղինակ կարգով:

***

### decorators

> **decorators**: `CssDecorator`[]

Գրառում-մակարդակի օբյեկտ-մոդել դեկորատորներ:

***

### compat

> **compat**: `string`[]

Բրաուզեր-աջակցություն / ֆունկցիա-համատեղ նշումներ `@compat`-ից:

***

### related

> **related**: `CssRelated`[]

Հարակցված բաղադրիչներ `@related`-ից:

***

### memberOf?

> `optional` **memberOf?**: `CssMemberOf`

Հայտարարված ընտանիքային անդամակցություն `@memberOf`-ից — այս գրառումը մեկ այլ անվանված գրառման անդամ է,
ընտրովի `private` (պետք է հայտնվել միայն այդ մայրից ներսում): Բացակայում է, երբ չի հեղինակվել:

***

### members?

> `optional` **members?**: `string`[]

Անդամ գրառման անունները `@members`-ից — հակադարձ ուղղությունը, հայտարարված հորը վրա:

***

### memberDeclarations?

> `optional` **memberDeclarations?**: `CssMemberDeclaration`[]

Կառուցված հայր-կողմի անդամ հայտարարումներ կրկնվող `@member` թեգերից:

***

### source?

> `optional` **source?**: `CssSource`

Որտեղ հեղինակվել է գրառումը, երբ դիրքի տեղեկատվությունը հասանելի է (աղբյուրի հղումների համար):

***

### customBlocks?

> `optional` **customBlocks?**: `Record`\<`string`, `string`[]\>

Գրանցված կաղապար (բլոկ) թեգերի բովանդակությունը, բանալին՝ թեգի անունից առանց դրա `@`: Լցված միայն
կազմաձևման միջոցով ավելացված թեգերի համար; չգրանցված անծանոթ թեգերը անտեսվում են: Բացակայում է, երբ ոչ մեկը չի գտնվել:
