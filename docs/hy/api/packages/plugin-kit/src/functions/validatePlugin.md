[pantoken](../../../../index.md) / [packages/plugin-kit/src](../index.md) / validatePlugin

# Function: validatePlugin()

> **validatePlugin**(`plugin`): `void`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Հաստատել, որ վարիչն ունի վերլուծական կառուցվածք. ոչ դատարկ անուն, բոլոր կեռերը ֆունկցիաներ են, և ոչ մի կեռի բանալի չի գտնվում ճանաչված փուլի հավաքածուից դուրս:

[definePlugin](definePlugin.md)-ի կողմից կանչվում է ինքնաբերաբար: Արտահանել այն, որպեսզի ձեռքով հեղինակված վարիչներ կարողանան ստուգվել փուլի վազորդին փոխանցելուց առաջ:

## Parameters

### plugin

[`PantokenPlugin`](../../../core/src/interfaces/PantokenPlugin.md)

## Returns

`void`

## Throws

Երբ վարիչն ձախողվում է կառուցվածքային ստուգման:

## Example

**Ստուգել ձեռքով հեղինակված վարիչ**

```ts
import { validatePlugin } from "@pantoken/plugin-kit";

validatePlugin({ name: "brand", css: () => ({}) }); // ok
validatePlugin({ name: "", css: () => ({}) }); // throws
```
