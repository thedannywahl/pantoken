[pantoken](../../../../index.md) / [platforms/drupal/src](../index.md) / toDrupalTheme

# Ֆունկցիա: toDrupalTheme()

> **toDrupalTheme**(`options?`): [`DrupalFile`](../interfaces/DrupalFile.md)[]

<span class="instui-pill -color-danger pantoken-doc-tag">Փորձարկումային</span>

Ստեղծել ֆայլերը Drupal ենթա-թեմայի համար, որը բեռնում է Instructure տոկենները։

## Պարամետրեր

### options?

[`ToDrupalThemeOptions`](../interfaces/ToDrupalThemeOptions.md) = `{}`

[ToDrupalThemeOptions](../interfaces/ToDrupalThemeOptions.md).

## Վերադարձվող արժեք

[`DrupalFile`](../interfaces/DrupalFile.md)[]

Թեմայի ֆայլերը, թեմայի տեղեկատուի նկատմամբ հարաբերական ուղիներ:

## Օրինակներ

**Կառուցել և գրել անկախ ենթա-թեմա**

```ts
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure" });
// [ instructure.info.yml, instructure.libraries.yml, css/tokens.css, css/pantoken-prose.css ]
for (const { path, content } of files) {
  const dest = join("./themes/custom/instructure", path);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
}
```

Կառուցել ենթաթեմա հիմքային թեմայի վրա

```ts
import { toDrupalTheme } from "@pantoken/drupal";

const files = toDrupalTheme({ name: "Instructure", baseTheme: "olivero" });
```
