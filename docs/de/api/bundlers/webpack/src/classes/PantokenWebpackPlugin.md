[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klasse: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Beispiele

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

## Konstruktoren

### Konstruktor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

#### Parameter

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Rückgabe

`PantokenWebpackPlugin`

## Methoden

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimentell</span>

#### Parameter

##### compiler

`CompilerLike`

#### Rückgabe

`void`
