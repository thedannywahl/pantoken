[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# מחלקה: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## דוגמאות

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

## בוני עצמים

### בונה

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

#### פרמטרים

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### מחזיר

`PantokenWebpackPlugin`

## שיטות

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">ניסיוני</span>

#### פרמטרים

##### compiler

`CompilerLike`

#### מחזיר

`void`
