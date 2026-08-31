[pantoken](../../../../../index.md) / [plugins/pantoken/simple-icons/src](../index.md) / simpleIcons

# Function: simpleIcons()

> **simpleIcons**(`options?`): [`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

<span class="instui-pill -color-warning pantoken-doc-tag">Beta</span>

Ստեղծել Simple Icons պլագինը:

## Parameters

### options?

[`SimpleIconsOptions`](../interfaces/SimpleIconsOptions.md) = `{}`

[SimpleIconsOptions](../interfaces/SimpleIconsOptions.md): Հանձնել `registry` ծանուցական ներմուծումից խուսափելու համար (օր.
տոկեն-փուլի օգտագործման ժամանակ, որտեղ կեռերը համաժամասեռ են):

## Returns

[`PantokenPlugin`](../../../../../packages/core/src/interfaces/PantokenPlugin.md)

[PantokenPlugin](../../../../../packages/core/src/interfaces/PantokenPlugin.md) `tokens` և `rehype` կեռերով:

## Examples

**Արտանետել ապրանքային գլիֆները որպես \<image\> տոկեններ**

```ts
import { buildTokens } from "@pantoken/core";
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

buildTokens({
  theme: "rebrand",
  plugins: [simpleIcons({ registry, slugs: ["github", "react"] })],
});
// adds --instui-icon-github, --instui-icon-react as <image> tokens
```

**Լուծել :brand: կոդերը հայտնի ժամանակ (rehype շերտ)**

```ts
import { simpleIcons } from "@pantoken/plugin-simple-icons";
import * as registry from "simple-icons";

const { resolve } = simpleIcons({ registry }).rehype!({ resolve: () => undefined });
resolve("github"); // { name, path, svg, viewBox, source: "simple-icons" }
```
