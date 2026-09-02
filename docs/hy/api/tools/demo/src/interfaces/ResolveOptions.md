[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / ResolveOptions

# Ինտերֆեյս: ResolveOptions

Դեմո սպեց լուծելու տարբերակներ: Միայն `self` մատակարարը օգտագործում է վազքային/դեմո/css դաշտերը:

## Extended by

- [`DemoMarkdownItOptions`](DemoMarkdownItOptions.md)

## Առանձնահատկություններ

### base?

> `optional` **base?**: `string`

Կայքի բազային ուղին, օր. `/pantoken/` (լռական `/`):

***

### runnerPath?

> `optional` **runnerPath?**: `string`

Վազքային էջի ուղին, հարաբերական `base`-ի (լռական `play/index.html`):

***

### demosPath?

> `optional` **demosPath?**: `string`

Ինքնակերտ դեմո-աղբյուր դիր, հարաբերական `base`-ի (լռական `demos/`):

***

### cssUrls?

> `optional` **cssUrls?**: readonly `string`[]

Ոճային թերթերի URL-ները որ վազքային ներուծում է (իր քրոմի մեջ և ամեն պատկերված արդյունքում): բաղադրիչի
թերթերը, բազմ-թեմա տոկեն թերթը, և պլագին/մակերես թերթերը: Վազքային թեմաները փոխվում են `data-pantoken-theme` հատկանիշ փոխել միջոցով, այնպես որ մեկ տոկեն թերթ ծածկում է ամեն թեմա:
