[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# 類別: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## 範例

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

## 建構子

### 建構子

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

#### 參數

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### 回傳

`PantokenWebpackPlugin`

## 方法

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">實驗性</span>

#### 參數

##### compiler

`CompilerLike`

#### 回傳

`void`
