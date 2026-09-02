[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klassa: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Exempla

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

## Constructors

### Constructor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

#### Parametera

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Gullii / Gávdnat

`PantokenWebpackPlugin`

## Metodat

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentála</span>

#### Parametera

##### compiler

`CompilerLike`

#### Gullii / Gávdnat

`void`
