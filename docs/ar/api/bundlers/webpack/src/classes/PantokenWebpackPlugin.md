[pantoken](../../../../index.md) / [bundlers/webpack/src](../index.md) / PantokenWebpackPlugin

# فئة: PantokenWebpackPlugin

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

إضافة Webpack تصدر ملف أنماط pantoken كأصل ناتج.

## أمثلة

**أصدر pantoken.css من webpack.config.js الخاص بك**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin()],
};
```

**أعد تسمية الأصل المُصدَّر**

```js
import { PantokenWebpackPlugin } from "@pantoken/webpack";

export default {
  plugins: [new PantokenWebpackPlugin({ filename: "tokens.css" })],
};
```

## البنّائون

### منشئ

> **new PantokenWebpackPlugin**(`options?`): `PantokenWebpackPlugin`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

#### المعلمات

##### options?

[`PantokenWebpackOptions`](../interfaces/PantokenWebpackOptions.md) = `{}`

#### القيم المرجعة

`PantokenWebpackPlugin`

## الطرق

### apply()

> **apply**(`compiler`): `void`

<span class="instui-pill -color-danger pantoken-doc-tag">تجريبي</span>

#### المعلمات

##### compiler

`CompilerLike`

#### القيم المرجعة

`void`
