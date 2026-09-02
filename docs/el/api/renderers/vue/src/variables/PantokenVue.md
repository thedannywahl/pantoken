[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# Μεταβλητή: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">Πειραματικό</span>

The pantoken Vue plugin: `app.use(PantokenVue)` or `app.use(PantokenVue, { locale: "hu" })`.

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### Παράμετροι

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### Επιστρέφει

`void`

## Παράδειγμα

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
