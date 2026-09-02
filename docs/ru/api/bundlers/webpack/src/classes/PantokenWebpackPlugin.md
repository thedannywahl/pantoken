[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Класс: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Примеры

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

## Конструкторы

### Конструктор

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

#### Параметры

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Возвращаемое значение

`PantokenWebpackPlugin`

## Методы

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

#### Параметры

##### compiler

`CompilerLike`

#### Возвращаемое значение

`void`
