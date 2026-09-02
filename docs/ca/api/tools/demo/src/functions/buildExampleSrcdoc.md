[pantoken](../../../../index.md) / [tools/demo/src](../index.md) / buildExampleSrcdoc

# Funció: buildExampleSrcdoc()

> **buildExampleSrcdoc**(`html`, `options`): `string`

Construir la cadena de document completa `<!doctype html>` per a una vista prèvia d'exemple en directe aïllada.

## Paràmetres

### html

`string`

El codi font brut de l'exemple (literal de la seva tanca font).

### options

[`ExampleSrcdocOptions`](../interfaces/ExampleSrcdocOptions.md)

[ExampleSrcdocOptions](../interfaces/ExampleSrcdocOptions.md).

## Retorna

`string`

La cadena de document — passa-la per [escapeSrcdoc](escapeSrcdoc.md) abans d'usar-la com a valor d'atribut iframe
`srcdoc`.

## Exemple

```ts
import { buildExampleSrcdoc, escapeSrcdoc } from "@pantoken/demo";

const doc = buildExampleSrcdoc("<button class=\"instui-button\">Save</button>", {
  cssUrls: ["/demos-assets/components.css"],
});
const iframe = `<iframe class="pantoken-demo__frame css-example" sandbox="allow-scripts" srcdoc="${escapeSrcdoc(doc)}"></iframe>`;
```
