[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klasi: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Dæmi

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

## Smiðar

### Smíðari

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

#### Færibreytur

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Skilar

`PantokenWebpackPlugin`

## Aðferðir

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Tilrauna</span>

#### Færibreytur

##### compiler

`CompilerLike`

#### Skilar

`void`
