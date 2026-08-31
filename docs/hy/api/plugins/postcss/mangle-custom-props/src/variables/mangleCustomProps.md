[pantoken](../../../../../index.md) / [plugins/postcss/mangle-custom-props/src](../index.md) / mangleCustomProps

# Variable: mangleCustomProps

> `const` **mangleCustomProps**: \{(`options?`): [`Plugin`](https://postcss.org/api/#plugin); `postcss`: `true`; \}

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ստեղծեք mangle-custom-properties PostCSS պլագինը:

Հավաքում է բոլոր հատուկ հատկության անունները, որոնք համապատասխանում են `prefix`-ի հայտարարական հատկություններից, `var()` հղումներից և `@property` պարամետրերից: Դասավորում է դրանք այբբենական կարգով կայուն, որոշակի քարտեզագրման համար, այնուհետև նշանակում կարճ անունները ընտրված `method`-ի միջոցով: Փոխարինում է յուրաքանչյուր առաջացումը ամբողջ стилsheet-ի ընթացքում:

## Type Declaration

## Parameters

### options?

[`MangleCustomPropsOptions`](../interfaces/MangleCustomPropsOptions.md)

[MangleCustomPropsOptions](../interfaces/MangleCustomPropsOptions.md).

## Returns

[`Plugin`](https://postcss.org/api/#plugin)

PostCSS [Plugin](https://postcss.org/api/#plugin):

### postcss

> **postcss**: `true`

Պահանջվող PostCSS plugin նշիչ:

## Examples

**Մանգլեր լռելյալ ընտրանքներով (--instui-\*, base26)**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const out = postcss([mangleCustomProps()]).process(css, { from: undefined }).css;
```

**Կիսել քարտեզը երկու միասին բեռնված ֆայլերի միջև**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const manifest = new Map<string, string>();
const tokenCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(tokens, {
  from: undefined,
}).css;
const componentCss = postcss([mangleCustomProps({ sharedManifest: manifest })]).process(
  components,
  { from: undefined },
).css;
// both files use the same --instui-* → --a mapping
```

**Օգտագործել base36 անունները և արտանետել քարտեզը result.messages-ի միջոցով**

```ts
import postcss from "postcss";
import { mangleCustomProps } from "@pantoken/plugin-mangle-custom-props";

const result = postcss([mangleCustomProps({ method: "base36", propertyMap: true })]).process(css, {
  from: undefined,
});
const msg = result.messages.find((m) => m.type === "mangle-map");
```
