[pantoken](../../../../../index.md) / [plugins/vite/workspace-orchestrator/src](../index.md) / UpstreamNode

# Ինտերֆեյս: UpstreamNode

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Մեկ վերևի workspace փաթեթ հետևել և վերակառուցել:

## Առանձնահատկություններ

### name

> **name**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Log հաղորդագրությունների ցուցադրական անուն:

***

### dir

> **dir**: `string`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Փաթեթի root directory (build հրամանի cwd):

***

### watchPaths

> **watchPaths**: `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ուղիներ (ֆայլեր կամ directories) հետևել — directories-ներ հետևում են ռեկուրսիվ:

***

### build

> **build**: readonly \[`string`, `string`\]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Build հրաման՝ առաջին տարրը կատարողական ֆայլ է, մնացածը արգումենտներ են:

***

### dependents

> **dependents**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Այս մեկից հետո վերակառուցել այլ վերևի հանգույցների անունները:

***

### include?

> `optional` **include?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Glob patterns ներառել ֆայլերի համար: Երբ դրված է, միայն առնվազն մեկ pattern-ի հետ համընկնող ֆայլերի փոփոխությունները վերակառուցում են գործարկում: Բոլորը ներառելու համար բաց թողեք:

***

### ignore?

> `optional` **ignore?**: readonly `string`[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Glob patterns անտեսել ֆայլերի համար: Համընկնող ֆայլերի փոփոխությունները լուռ կերպով բաց թողնվում են: Ոչինչ անտեսել չլինելու համար բաց թողեք:
