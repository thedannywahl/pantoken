[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / buildExampleSrcdoc

# Ֆունկցիա: buildExampleSrcdoc()

> **buildExampleSrcdoc**(`html`, `options`): `string`

Կառուցել ամբողջական `<!doctype html>` փաստաթղթային տողն մեկուսացված ուղիղ-օրինակ նախադրսի համար:

## Պարամետրեր

### html

`string`

Օրինակի հում նշանակումը (բառացի իր աղբյուր պատից):

### options

[`ExampleSrcdocOptions`](../interfaces/ExampleSrcdocOptions.md)

[ExampleSrcdocOptions](../interfaces/ExampleSrcdocOptions.md).

## Վերադարձվող արժեք

`string`

Փաստաթղթային տողը — անցկացրեք այն [escapeSrcdoc](escapeSrcdoc.md) միջով օգտագործելուց առաջ որպես iframe
`srcdoc` հատկանիշի արժեքը:

## Օրինակ

```ts
import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";

const doc = buildExampleSrcdoc("<button class=\"instui-button\">Save</button>", {
  cssUrls: ["/demos-assets/components.css"],
});
const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
```
