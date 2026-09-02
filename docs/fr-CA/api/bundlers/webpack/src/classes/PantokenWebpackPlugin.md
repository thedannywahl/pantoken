[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Classe: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Exemples

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

## Constructeurs

### Constructeur

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

#### Paramètres

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Retourne

`PantokenWebpackPlugin`

## Méthodes

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Expérimental</span>

#### Paramètres

##### compiler

`CompilerLike`

#### Retourne

`void`
