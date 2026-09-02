[pantoken](../../../../../index.md) / [plugins/postcss/flatten-property/src](../index.md) / flattenProperty

# Փոփոխական: flattenProperty

> `const` **flattenProperty**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Ստեղծել flatten-`@property` PostCSS խմբակը:

Քայլել բոլոր `@property` at-կանոնների միջով ոճերի թերթում, հանել յուրաքանչյուր `initial-value` նկարագիր, հեռացնել
at-կանոնը, և նախածանցել մեկ `injectSelector { --name: value; … }` կանոն, որ պարունակում է բոլոր
հանված հայտարարությունները: Դատարկ կանոնները և `@layer` բլոկներ, որոնք հեռացման հետևում մնացել են, գցվում են:

## Type Declaration

## Պարամետրեր

### options?

[`FlattenPropertyOptions`](../interfaces/FlattenPropertyOptions.md)

[FlattenPropertyOptions](../interfaces/FlattenPropertyOptions.md).

## Վերադարձվող արժեք

[`Plugin`](https://postcss.org/api/#plugin)

PostCSS [Plugin](https://postcss.org/api/#plugin):

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Օրինակներ

**Կանխադրված ներարկում :root-ի մեջ**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty()]).process(css, { from: undefined }).css;
```

**Ներարկել :scope-ի մեջ (շամ blocks-ի ներսում օգտագործման համար)**

```ts
import postcss from "postcss";
import { flattenProperty } from "@pantoken/plugin-flatten-property";

const out = postcss([flattenProperty({ injectSelector: ":scope" })]).process(css, { from: undefined }).css;
```

```ts
Preserve
```
