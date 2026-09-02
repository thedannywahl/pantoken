[pantoken](../../../../../index.md) / [plugins/postcss/props-minify/src](../index.md) / MangleCustomPropsOptions

# Ինտերֆեյս: MangleCustomPropsOptions

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

[mangleCustomProps](../variables/mangleCustomProps.md)-ի ընտրանքները:

## Առանձնահատկություններ

### prefix?

> `optional` **prefix?**: `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Միայն այս տողից սկսվող հատուկ հատկության անունները մանգլե են:

#### Ստանդարտ արժեք

`"--instui-"`

***

### method?

> `optional` **method?**: [`MangleMethod`](../type-aliases/MangleMethod.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Կարճ փոխարինման անունների առաջացման համար օգտագործվող ալգորիթմը:

- `"base26"` — `--a`, `--b`, …, `--z`, `--aa`, `--ab`, … (լռելյալ; ամենակարճը մեծ բազմությունների համար)
- `"base36"` — `--0`, `--1`, …, `--9`, `--a`, …, `--z`, `--10`, … (այբբենական-թվային)
- `"numeric"` — `--0`, `--1`, `--2`, …

#### Ստանդարտ արժեք

`"base26"`

***

### propertyMap?

> `optional` **propertyMap?**: `boolean`

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Երբ `true`-ը, ավելացնում է `mangle-map` մուտքը PostCSS `result.messages`-ի վրա մշակումից հետո:
Հաղորդագրությունը ունի `{ type: "mangle-map", plugin: "pantoken-mangle-custom-props", map: Map<string, string> }` ձեւ:

#### Ստանդարտ արժեք

`false`

***

### sharedManifest?

> `optional` **sharedManifest?**: `Map`\<`string`, `string`\>

<span class="instui-pill -color-warning pantoken-doc-tag">Բետա</span>

Փոփոխական `Map`՝ կիսված մի քանի PostCSS անցումների միջև:

Յուրաքանչյուր անցումում պլագինը կարդում է գոյություն ունեցող մուտքերը (նրանց կարճ անունները վերադարձնում է) և գրում նոր մուտքեր (շարունակում հաշվիչը `sharedManifest.size`-ից): Փոխանցեք նույն `Map` օրինակը `mangleCustomProps` կամ `applyMinify` յուրաքանչյուր կանչի, որը մշակում է CSS ֆայլերը, որոնք միասին կբեռնվեն դիտարկիչում — սա երաշխավորում է, որ բոլոր ֆայլերն օգտագործում են նույնական անվանման քարտեզ:

Սկզբում մշակեք մեկնիշի թերթը, որպեսզի դրա անունները սերմնվեն ցուցակում, մինչ բաղադրիչի թերթերը ավելացնեն իրենց (սովորաբար համընկնող) հղումները:
