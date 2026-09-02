[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Luokka: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Esimerkit

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

## Konstruktorit

### Konstruktori

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

#### Parametrit

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Palauttaa

`PantokenWebpackPlugin`

## Metodit

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Kokeellinen</span>

#### Parametrit

##### compiler

`CompilerLike`

#### Palauttaa

`void`
