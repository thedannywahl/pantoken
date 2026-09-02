[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# 类: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## 示例

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

## 构造函数

### 构造函数

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

#### 参数

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### 返回值

`PantokenWebpackPlugin`

## 方法

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">实验性</span>

#### 参数

##### compiler

`CompilerLike`

#### 返回值

`void`
