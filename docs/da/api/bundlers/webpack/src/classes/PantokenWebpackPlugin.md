[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Class: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Webpack plugin som udsender pantoken stylesheettet som et output asset.

## Examples

**Udsen pantoken.css fra din webpack.config.js**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**Omdøb det udsendte asset**

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
