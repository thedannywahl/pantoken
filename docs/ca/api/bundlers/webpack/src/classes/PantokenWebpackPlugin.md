[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Classe: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Connector de Webpack que emet la full d'estils de pantoken com a actiu de sortida.

## Exemples

**Emeteu pantoken.css des del vostre webpack.config.js**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**Canvieu el nom de l'actiu emès**

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

#### Paràmetres

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Retorna

`PantokenWebpackPlugin`

## Mètodes

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

#### Paràmetres

##### compiler

`CompilerLike`

#### Retorna

`void`
