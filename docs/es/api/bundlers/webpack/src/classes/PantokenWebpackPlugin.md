[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Clase: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Ejemplos

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

## Constructores

### Constructor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

#### Parámetros

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Devuelve

`PantokenWebpackPlugin`

## Métodos

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

#### Parámetros

##### compiler

`CompilerLike`

#### Devuelve

`void`
