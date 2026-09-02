[pantoken](../../../../index.md) / [formats/css/src](../index.md) / buildCssFile

# Funksjon: buildCssFile()

> **buildCssFile**(`__namedParameters`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Build a CSS file string: typed `@property` registrations (top-level, theme-agnostic) followed by
one or more scoped declaration sections (whose selector the consuming build may rewrite).

## Parametrar

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

## Returnerer

`string`

## Døme

**Register one typed property and emit a scoped declaration**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: ["/* my tokens */"],
  scope: ":root",
  properties: [{ name: "--instui-color-brand", syntax: "<color>", value: "#0374b5" }],
  sections: [{ pairs: [["--instui-color-text-base", "var(--instui-color-brand)"]] }],
});
```

**Wrap a section in a CSS cascade layer**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: [],
  scope: ":root",
  sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "1rem"]] }],
});
```
