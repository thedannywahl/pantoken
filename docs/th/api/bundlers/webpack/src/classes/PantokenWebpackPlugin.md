[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# คลาส: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## ตัวอย่าง

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

## คอนสตรัคเตอร์

### ตัวสร้าง

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

#### พารามิเตอร์

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### คืนค่า

`PantokenWebpackPlugin`

## เมธอด

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">ทดลอง</span>

#### พารามิเตอร์

##### compiler

`CompilerLike`

#### คืนค่า

`void`
