[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# متغیر: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">تجربی</span>

The pantoken Vue plugin: `app.use(PantokenVue)` or `app.use(PantokenVue, { locale: "hu" })`.

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### پارامترها

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### مقدار بازگشتی

`void`

## نمونه

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
