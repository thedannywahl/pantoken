[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Rang: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Samplaí

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

## Tógálaithe

### Tógálaí

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

#### Paraiméadair

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Tuairisceáin

`PantokenWebpackPlugin`

## Modhanna

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Turgnamhach</span>

#### Paraiméadair

##### compiler

`CompilerLike`

#### Tuairisceáin

`void`
