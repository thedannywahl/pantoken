[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# 클래스: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## 예제들

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

## 생성자

### 생성자

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

#### 매개변수

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### 반환값

`PantokenWebpackPlugin`

## 메서드

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">실험적</span>

#### 매개변수

##### compiler

`CompilerLike`

#### 반환값

`void`
