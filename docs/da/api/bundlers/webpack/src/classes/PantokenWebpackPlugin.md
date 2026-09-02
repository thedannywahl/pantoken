[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klasse: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

Webpack plugin som udsender pantoken stylesheettet som et output asset.

## Eksempler

**Udsen pantoken.css fra din webpack.config.js**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**Omdøb det udsendte asset**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
};
```

## Konstruktører

### Konstruktør

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

#### Parametre

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Returnerer

`PantokenWebpackPlugin`

## Metoder

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentel</span>

#### Parametre

##### compiler

`CompilerLike`

#### Returnerer

`void`
