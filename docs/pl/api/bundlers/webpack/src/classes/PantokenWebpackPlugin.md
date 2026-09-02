[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klasa: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Przykłady

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

## Konstruktory

### Konstruktor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

#### Parametry

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Zwraca

`PantokenWebpackPlugin`

## Metody

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperymentalne</span>

#### Parametry

##### compiler

`CompilerLike`

#### Zwraca

`void`
