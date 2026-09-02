[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Dosbarth: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Enghreifftiau

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

## Constructwyr

### Constructwr

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

#### Paramedrau

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Yn dychwelyd

`PantokenWebpackPlugin`

## Dulliau

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

#### Paramedrau

##### compiler

`CompilerLike`

#### Yn dychwelyd

`void`
