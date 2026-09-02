[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / DemoMarkdownItOptions

# Ինտերֆեյս: DemoMarkdownItOptions

[demoMarkdownIt](../functions/demoMarkdownIt.md) տարբերակներ: [resolveDemo](../functions/resolveDemo.md) դաշտերը և ընտրովի ուղիղ-օրինակ ամբողջացում:

## Ընդլայնում է

- [`ResolveOptions`](ResolveOptions.md)

## Առանձնահատկություններ

### base?

> `optional` **base?**: `string`

Կայքի բազային ուղին, օր. `/pantoken/` (լռական `/`):

#### Ժառանգվում է

[`ResolveOptions`](ResolveOptions.md).[`base`](ResolveOptions.md#base)

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Վազքային էջի ուղին, հարաբերական `base`-ի (լռական `play/index.html`):

#### Ժառանգվում է

[`ResolveOptions`](ResolveOptions.md).[`runnerPath`](ResolveOptions.md#runnerpath)

***

### demosPath?

> `optional` **demosPath?**: `string`

Ինքնակերտ դեմո-աղբյուր դիր, հարաբերական `base`-ի (լռական `demos/`):

#### Ժառանգվում է

[`ResolveOptions`](ResolveOptions.md).[`demosPath`](ResolveOptions.md#demospath)

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Ոճային թերթերի URL-ները որ վազքային ներուծում է (իր քրոմի մեջ և ամեն պատկերված արդյունքում): բաղադրիչի
թերթերը, բազմ-թեմա տոկեն թերթը, և պլագին/մակերես թերթերը: Վազքային թեմաները փոխվում են `data-pantoken-theme` հատկանիշ փոխել միջոցով, այնպես որ մեկ տոկեն թերթ ծածկում է ամեն թեմա:

#### Ժառանգվում է

[`ResolveOptions`](ResolveOptions.md).[`cssUrls`](ResolveOptions.md#cssurls)

***

### liveExample?

> `optional` **liveExample?**: [`LiveExampleOptions`](LiveExampleOptions.md)

Երբ միացված է, ավելացնում է ուղիղ նախադրս յուրաքանչյուր `html` պատից հետո համապատասխան էջերում — նույն նշանակումը,
պատկերվածը ուղիղ, իր աղբյուրի ներքեւ: Վերածածկ օրինակներ (`&lt;dialog&gt;`, `[popover]`) բաց են թողնվում: նրանք
գաղտնի են մինչեւ բացվեն, այնպես որ `## Demo` iframe վարում է նրանց նախադրս փոխարեն:

***

### localePrefix?

> `optional` **localePrefix?**: (`relativePath`) => `string`

Route a `demo:self:&lt;name&gt;` fence to a locale-specific self-hosted demo directory, from the current
page's markdown-it `env.relativePath` (e.g. `"hu/"` for pages under `hu/`, `""` for the root
locale). Prepended to `demosPath` so the localized clone of a demo (translated prose, same markup)
loads instead of the English source. Omit for a single-locale site.

#### Պարամետրեր

##### relativePath

`string`

#### Վերադարձվող արժեք

`string`
