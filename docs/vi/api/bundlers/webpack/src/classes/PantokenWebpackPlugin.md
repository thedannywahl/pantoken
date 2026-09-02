[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Lớp: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Các ví dụ

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

## Hàm khởi tạo

### Hàm khởi tạo

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

#### Tham số

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Trả về

`PantokenWebpackPlugin`

## Phương thức

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Thử nghiệm</span>

#### Tham số

##### compiler

`CompilerLike`

#### Trả về

`void`
