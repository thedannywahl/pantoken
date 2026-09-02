[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Klasse: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Døme

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

## Konstruktørar

### Konstruktør

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

#### Parametrar

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Returnerer

`PantokenWebpackPlugin`

## Metodar

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Eksperimentell</span>

#### Parametrar

##### compiler

`CompilerLike`

#### Returnerer

`void`
