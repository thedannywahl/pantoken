[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# Κλάση: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

Webpack plugin that emits the pantoken stylesheet as an output asset.

## Παραδείγματα

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

## Κατασκευαστές

### Κατασκευαστής

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

#### Παράμετροι

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### Επιστρέφει

`PantokenWebpackPlugin`

## Μέθοδοι

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

#### Παράμετροι

##### compiler

`CompilerLike`

#### Επιστρέφει

`void`
