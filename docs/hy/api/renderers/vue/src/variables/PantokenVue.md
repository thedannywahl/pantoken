[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# Variable: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

Pantoken Vue լցվածքը՝ `app.use(PantokenVue)` կամ `app.use(PantokenVue, { locale: "hu" })`:

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### Parameters

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### Returns

`void`

## Example

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
