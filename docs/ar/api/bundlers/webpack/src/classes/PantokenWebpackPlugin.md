[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Class: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

مكون إضافي Webpack يصدر ورقة نمط pantoken كأصل إخراج.

## Examples

**صدّر pantoken.css من webpack.config.js الخاص بك**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**أعد تسمية الأصل المُصدَّر**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
};
```

## Constructors

### Constructor

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

#### Parameters

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Returns

`PantokenWebpackPlugin`

## Methods

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

#### Parameters

##### compiler

`CompilerLike`

#### Returns

`void`
