[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Դաս: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Webpack plugin, որը արտանետում է pantoken stylesheet-ը որպես output asset:

## Օրինակներ

**Արտանետել pantoken.css ձեր webpack.config.js-ից**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**Վերանվանել արտանետված asset-ը**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
};
```

## Կոնստրուկտորներ

### Կոնստրուկտոր

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

#### Պարամետրեր

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Վերադարձվող արժեք

`PantokenWebpackPlugin`

## Մեթոդներ

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

#### Պարամետրեր

##### compiler

`CompilerLike`

#### Վերադարձվող արժեք

`void`
