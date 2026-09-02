[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# क्लास: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## उदाहरण

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

## कंस्ट्रक्टर्स

### कंस्ट्रक्टर

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

#### पैरामीटर

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### वापसी

`PantokenWebpackPlugin`

## मिथड्स

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">प्रयोगात्मक</span>

#### पैरामीटर

##### compiler

`CompilerLike`

#### वापसी

`void`
