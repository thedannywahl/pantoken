[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Kelas: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Contoh

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

## Konstruktor

### Konstruktor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

#### Parameter

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Mengembalikan

`PantokenWebpackPlugin`

## Metode

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimental</span>

#### Parameter

##### compiler

`CompilerLike`

#### Mengembalikan

`void`
