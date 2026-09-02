[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# کلاس: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## نمونه‌ها

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

## سازنده‌ها

### سازنده

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

#### پارامترها

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### مقدار بازگشتی

`PantokenWebpackPlugin`

## متدها

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

#### پارامترها

##### compiler

`CompilerLike`

#### مقدار بازگشتی

`void`
