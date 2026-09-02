[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# Variable: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">Experimental</span>

El connector pantoken Vue: `app.use(PantokenVue)` o `app.use(PantokenVue, { locale: "hu" })`.

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### Paràmetres

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### Retorna

`void`

## Exemple

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
