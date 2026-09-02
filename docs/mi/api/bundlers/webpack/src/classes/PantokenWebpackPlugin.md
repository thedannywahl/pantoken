[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Kāwai: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Ngā tauira

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

## Ngā Kaitīmata

### Kaitīmata

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

#### Ngā Tawhā

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Whakahokia

`PantokenWebpackPlugin`

## Ngā Tikanga

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Whakamātautau</span>

#### Ngā Tawhā

##### compiler

`CompilerLike`

#### Whakahokia

`void`
