[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# Newidyn: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">Arbrofol</span>

The pantoken Vue plugin: `app.use(PantokenVue)` or `app.use(PantokenVue, { locale: "hu" })`.

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### Paramedrau

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### Yn dychwelyd

`void`

## Enghraifft

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
