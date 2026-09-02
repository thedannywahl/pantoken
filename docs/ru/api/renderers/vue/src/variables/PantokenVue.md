[pantoken](../../../../index.md) / [renderers/vue/src](../index.md) / PantokenVue

# Переменная: PantokenVue

> `const` **PantokenVue**: `object`

<span class="instui-pill -color-danger pantoken-doc-tag">Экспериментально</span>

The pantoken Vue plugin: `app.use(PantokenVue)` or `app.use(PantokenVue, { locale: "hu" })`.

## Type Declaration

### install()

> **install**(`app`, `options?`): `void`

#### Параметры

##### app

`VueAppLike`

##### options?

###### locale?

`string` \| [`LocaleBundle`](#)

#### Возвращаемое значение

`void`

## Пример

```ts
import { createApp } from "vue";
import { PantokenVue } from "@pantoken/vue";
import "@pantoken/css";

createApp(App).use(PantokenVue).mount("#app");
createApp(App).use(PantokenVue, { locale: "hu" }).mount("#app"); // localized
```
