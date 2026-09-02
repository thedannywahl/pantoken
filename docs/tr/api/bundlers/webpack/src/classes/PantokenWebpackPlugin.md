[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Sınıf: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Örnekler

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

## Yapıcılar

### Yapıcı

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

#### Parametreler

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Döndürür

`PantokenWebpackPlugin`

## Metotlar

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Deneysel</span>

#### Parametreler

##### compiler

`CompilerLike`

#### Döndürür

`void`
