[pantoken](../../../../index.md) / [formats/css/src](../index.md) / buildCssFile

# Funktion: buildCssFile()

> **buildCssFile**(`__namedParameters`): `string`

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Byg en CSS-filstreng: typet `@property` registreringer (øverste niveau, tema-agnostisk) efterfulgt af
en eller flere scopet erklæringssektioner (hvis selektor forbruger-byggen kan omskrive).

## Parametre

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

## Eksempler

**Registrer en typet egenskab og emit en scopet erklæring**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: ["/* my tokens */"],
  scope: ":root",
  properties: [{ name: "--instui-color-brand", syntax: "<color>", value: "#0374b5" }],
  sections: [{ pairs: [["--instui-color-text-base", "var(--instui-color-brand)"]] }],
});
```

**Indpak en sektion i et CSS-kaskadelags**

```ts
import { buildCssFile } from "@pantoken/css";

buildCssFile({
  comments: [],
  scope: ":root",
  sections: [{ layer: "pantoken", pairs: [["--instui-spacing-space-md", "1rem"]] }],
});
```
