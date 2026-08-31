[pantoken](../../../../index.md) / [formats/css/src](../index.md) / buildCssFile

# Function: buildCssFile()

> **buildCssFile**(`__namedParameters`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Construeix una cadena de fitxer CSS: registres de `@property` tipificats (nivell superior, agnòstics de tema) seguits per una o més seccions de declaració d'àmbit (el selector que la construcció que consum pot reescriure).

## Parameters

### \_\_namedParameters

#### comments

`string`[]

#### scope

`string`

#### properties?

`PropertyRule`[] = `[]`

#### sections

[`CssSection`](../interfaces/CssSection.md)[]

#### inherits?

`boolean` = `true`

## Returns

`string`

## Examples

**Registra una propietat tipificada i emet una declaració d'àmbit**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: ["/* my tokens */"],
  scope: ":root",
  properties: [{ name: "--instui-color-brand", syntax: "<color>", value: "#0374b5" }],
  sections: [{ pairs: [["--instui-color-text-base", "var(--instui-color-brand)"]] }],
});
```

**Embolcalla una secció en una capa de cascada CSS**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: [],
  scope: ":root",
  sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "1rem"]] }],
});
```
