[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / buildExampleSrcdoc

# Fonksiyon: buildExampleSrcdoc()

> **buildExampleSrcdoc**(`html`, `options`): `string`

Build the full `<!doctype html>` document string for an isolated live-example preview.

## Parametreler

### html

`string`

The example's raw markup (verbatim from its source fence).

### options

[`ExampleSrcdocOptions`](../interfaces/ExampleSrcdocOptions.md)

[ExampleSrcdocOptions](../interfaces/ExampleSrcdocOptions.md).

## Döndürür

`string`

The document string — pass it through [escapeSrcdoc](escapeSrcdoc.md) before using it as an iframe
`srcdoc` attribute value.

## Örnek

```ts
import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";

const doc = buildExampleSrcdoc("<button class=\"instui-button\">Save</button>", {
  cssUrls: ["/demos-assets/components.css"],
});
const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
```
