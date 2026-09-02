[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# Փոփոխական: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Pantoken Vue լցվածքը՝ `app.use(PantokenVue)` կամ `app.use(PantokenVue, { locale: "hu" })`:

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### Պարամետրեր

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### Վերադարձվող արժեք

`void`

## Օրինակ

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
