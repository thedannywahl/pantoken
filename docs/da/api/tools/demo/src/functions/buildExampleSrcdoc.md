[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / buildExampleSrcdoc

# Funktion: buildExampleSrcdoc()

> **buildExampleSrcdoc**(`html`, `options`): `string`

Byg den fulde `<!doctype html>` dokumentstreng til en isoleret live-eksempel forhåndsvisning.

## Parametre

### html

`string`

Eksemplets rå markup (ord for ord fra dets kildefold).

### options

[`ExampleSrcdocOptions`](../interfaces/ExampleSrcdocOptions.md)

[ExampleSrcdocOptions](../interfaces/ExampleSrcdocOptions.md).

## Returnerer

`string`

Dokumentstrengen — send den gennem [escapeSrcdoc](escapeSrcdoc.md) før du bruger den som en iframe
`srcdoc` attributværdi.

## Eksempel

```ts
import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";

const doc = buildExampleSrcdoc("<button class=\"instui-button\">Save</button>", {
  cssUrls: ["/demos-assets/components.css"],
});
const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
```
