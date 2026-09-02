[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Classe: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Esempi

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

## Costruttori

### Costruttore

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

#### Parametri

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Restituisce

`PantokenWebpackPlugin`

## Metodi

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Sperimentale</span>

#### Parametri

##### compiler

`CompilerLike`

#### Restituisce

`void`
