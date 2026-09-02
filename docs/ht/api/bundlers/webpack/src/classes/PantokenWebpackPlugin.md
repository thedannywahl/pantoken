[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klas: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Egzanp

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

## Konstriktè

### Konstriktè

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

#### Paramèt

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Retounen

`PantokenWebpackPlugin`

## Metòd

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimantal</span>

#### Paramèt

##### compiler

`CompilerLike`

#### Retounen

`void`
