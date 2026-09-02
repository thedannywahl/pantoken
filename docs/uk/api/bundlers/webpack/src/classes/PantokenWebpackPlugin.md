[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Клас: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Приклади

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

## Конструктори

### Конструктор

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

#### Параметри

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Повертає

`PantokenWebpackPlugin`

## Методи

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Експериментальний</span>

#### Параметри

##### compiler

`CompilerLike`

#### Повертає

`void`
