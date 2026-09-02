[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Razred: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Primeri

**Emit pantoken.css from your webpack.config.js**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**Rename the emitted asset**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
};
```

## Konstruktorji

### Konstruktor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

#### Parametri

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Vrne

`PantokenWebpackPlugin`

## Metode

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentalno</span>

#### Parametri

##### compiler

`CompilerLike`

#### Vrne

`void`
