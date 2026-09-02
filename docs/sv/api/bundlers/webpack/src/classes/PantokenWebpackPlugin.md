[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klass: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Exempel

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

## Konstruktorer

### Konstruktor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

#### Parametrar

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Returnerar

`PantokenWebpackPlugin`

## Metoder

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

#### Parametrar

##### compiler

`CompilerLike`

#### Returnerar

`void`
