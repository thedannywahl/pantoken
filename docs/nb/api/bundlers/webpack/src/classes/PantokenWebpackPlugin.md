[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klasse: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Eksempler

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

## Konstruktører

### Konstruktør

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

#### Parametere

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Returnerer

`PantokenWebpackPlugin`

## Metoder

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

#### Parametere

##### compiler

`CompilerLike`

#### Returnerer

`void`
