[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# クラス: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## 例

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

## コンストラクター

### コンストラクター

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

#### パラメーター

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### 戻り値

`PantokenWebpackPlugin`

## メソッド

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">実験的</span>

#### パラメーター

##### compiler

`CompilerLike`

#### 戻り値

`void`
